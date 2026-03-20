import { useEffect, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────
interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  trailLen: number        // max trail point count
  speed: number
  opacity: number
  width: number
  color: string
  trail: Array<{ x: number; y: number }>
  dead: boolean
}

interface StaticStar {
  x: number
  y: number
  r: number
  opacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

// ── Meteor palettes (darker for light mode) ─────────────────────
const METEOR_COLORS_DARK = [
  '#f3f4f6',   // gray-100
  '#e5e7eb',   // gray-200
  '#d1d5db',   // gray-300
  '#ffffff',   // white
]

const METEOR_COLORS_LIGHT = [
  '#9ca3af',   // gray-400
  '#6b7280',   // gray-500
  '#4b5563',   // gray-600
  '#374151',   // gray-700
]

// ── Helpers ────────────────────────────────────────────────────
function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function randomMeteorColor(meteorColors: string[]) {
  return meteorColors[Math.floor(Math.random() * meteorColors.length)]
}

// ── Fixed direction: ALL meteors share the same angle → parallel lines ──
// 120° in canvas math: cos(120°)= -0.5 (left), sin(120°)= +0.866 (down)
// → every meteor travels at 30° from vertical (diagonally down-left), in perfect parallel.
const METEOR_ANGLE_RAD = (120 * Math.PI) / 180
const METEOR_DX = Math.cos(METEOR_ANGLE_RAD)  // -0.5
const METEOR_DY = Math.sin(METEOR_ANGLE_RAD)  // +0.866

function spawnMeteor(w: number, meteorColors: string[]): Meteor {
  // Spawn across full width + overflow so left, center, and right all get falling stars (meteors move left).
  const x = rand(-80, w + 240)
  const y = rand(-55, -12)

  // Each meteor gets its OWN speed — same direction (nuro-style slow). 200% slower = 3x slower.
  const speed  = rand(0.5, 0.67)
  // Trail length 2–3x longer with high variance: some short, some very long
  const trailLen = Math.floor(rand(18, 88))

  return {
    x,
    y,
    vx: METEOR_DX * speed,   // same direction as every other meteor
    vy: METEOR_DY * speed,   // always positive → always falls DOWN
    trailLen,
    speed,
    opacity: rand(0.6, 1),
    width: rand(0.5, 1.2),   // thin trail like nuro (h-0.5 ≈ 2px)
    color: randomMeteorColor(meteorColors),
    trail: [],
    dead: false,
  }
}

function isOffScreen(m: Meteor, w: number, h: number) {
  return m.y > h + 150 || m.x < -300 || m.x > w + 300
}

// ── Parse hex → rgb integers ───────────────────────────────────
const hexCache = new Map<string, [number, number, number]>()
function hexToRgb(hex: string): [number, number, number] {
  if (hexCache.has(hex)) return hexCache.get(hex)!
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  hexCache.set(hex, [r, g, b])
  return [r, g, b]
}

// ── Component ──────────────────────────────────────────────────
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let W = 0, H = 0
    let staticStars: StaticStar[] = []
    let meteors: Meteor[] = []
    let time = 0

    let isLight = document.documentElement.getAttribute('data-theme') === 'light'
    let starRgb: [number, number, number] = isLight ? [107, 114, 128] : [255, 255, 255] // gray-500-ish vs white
    let meteorColors: string[] = isLight ? METEOR_COLORS_LIGHT : METEOR_COLORS_DARK

    function applyTheme() {
      isLight = document.documentElement.getAttribute('data-theme') === 'light'
      starRgb = isLight ? [107, 114, 128] : [255, 255, 255]
      meteorColors = isLight ? METEOR_COLORS_LIGHT : METEOR_COLORS_DARK
    }

    // ── Resize ──────────────────────────────────────────
    function resize() {
      const parent = canvas!.parentElement
      W = parent ? parent.clientWidth  : window.innerWidth
      H = parent ? parent.clientHeight : window.innerHeight
      canvas!.width  = W
      canvas!.height = H
      buildStaticStars()
    }

    // ── Static star field ────────────────────────────────
    function buildStaticStars() {
      const count = Math.floor((W * H) / 5000)
      staticStars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: rand(isLight ? 0.4 : 0.3, isLight ? 1.6 : 1.4),
        opacity: rand(isLight ? 0.12 : 0.08, isLight ? 0.75 : 0.55),
        twinkleSpeed: rand(0.002, 0.0067),
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    // ── Draw static stars ────────────────────────────────
    function drawStaticStars(t: number) {
      for (const s of staticStars) {
        const o = s.opacity * (0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset))
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${starRgb[0]},${starRgb[1]},${starRgb[2]},${o.toFixed(3)})`
        ctx!.fill()
      }
    }

    // ── Draw one meteor (nuro.dev style: gradient trail + small head) ──
    function drawMeteor(m: Meteor) {
      if (m.trail.length < 2) return
      const [r, g, b] = hexToRgb(m.color)
      const n = m.trail.length
      const tail = m.trail[0]
      const head = m.trail[n - 1]

      // Trail: linear gradient from tail (transparent) to head (bright), like nuro's before:from-gray-300 before:to-transparent
      const trailGrad = ctx!.createLinearGradient(tail.x, tail.y, head.x, head.y)
      trailGrad.addColorStop(0, `rgba(${r},${g},${b},0)`)
      trailGrad.addColorStop(0.15, `rgba(${r},${g},${b},${(m.opacity * 0.15).toFixed(3)})`)
      trailGrad.addColorStop(0.6, `rgba(${r},${g},${b},${(m.opacity * 0.6).toFixed(3)})`)
      trailGrad.addColorStop(1, `rgba(${r},${g},${b},${(m.opacity * 0.95).toFixed(3)})`)

      ctx!.beginPath()
      ctx!.moveTo(tail.x, tail.y)
      for (let i = 1; i < n; i++) ctx!.lineTo(m.trail[i].x, m.trail[i].y)
      ctx!.strokeStyle = trailGrad
      ctx!.lineWidth = m.width
      ctx!.lineCap = 'round'
      ctx!.lineJoin = 'round'
      ctx!.stroke()

      // Small head dot (nuro: h-0.5 w-0.5 rounded-full — tiny bright dot)
      const headR = Math.max(0.5, m.width * 0.8)
      ctx!.beginPath()
      ctx!.arc(head.x, head.y, headR, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${r},${g},${b},${m.opacity})`
      ctx!.fill()
    }

    // ── Spawn timing (lower density) ─────────────────────────
    let spawnTimer = 0
    const BASE_INTERVAL = 42   // fewer spawns = lower density

    // Seed meteors across full width so right side isn’t empty at start
    function seedInitialMeteors() {
      for (let i = 0; i < 4; i++) {
        const m = spawnMeteor(W, meteorColors)
        const preSteps = Math.floor(rand(5, 75))
        for (let s = 0; s < preSteps; s++) {
          m.x += m.vx
          m.y += m.vy
          m.trail.push({ x: m.x, y: m.y })
          if (m.trail.length > m.trailLen) m.trail.shift()
        }
        meteors.push(m)
      }
    }

    // ── Main loop ────────────────────────────────────────
    function tick() {
      time++
      ctx!.clearRect(0, 0, W, H)

      drawStaticStars(time)

      // Spawn new meteors
      spawnTimer++
      if (spawnTimer >= BASE_INTERVAL) {
        spawnTimer = 0
        meteors.push(spawnMeteor(W, meteorColors))
        if (Math.random() < 0.1) setTimeout(() => meteors.push(spawnMeteor(W, meteorColors)), 120)
      }

      // Update & render meteors
      for (const m of meteors) {
        if (m.dead) continue
        m.x += m.vx
        m.y += m.vy
        m.trail.push({ x: m.x, y: m.y })
        if (m.trail.length > m.trailLen) m.trail.shift()
        drawMeteor(m)
        if (isOffScreen(m, W, H)) m.dead = true
      }

      // Prune dead
      meteors = meteors.filter(m => !m.dead)

      rafRef.current = requestAnimationFrame(tick)
    }

    applyTheme()
    resize()
    seedInitialMeteors()
    rafRef.current = requestAnimationFrame(tick)

    const mo = new MutationObserver(() => {
      // Rebuild particles with updated colors when theme changes.
      applyTheme()
      buildStaticStars()
      meteors = []
      seedInitialMeteors()
      ctx.clearRect(0, 0, W, H)
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement ?? document.body)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width:  '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
