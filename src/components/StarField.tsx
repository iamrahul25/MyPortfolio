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

// ── Neon color palette ─────────────────────────────────────────
const NEON_COLORS = [
  '#ffffff',   // white
  '#c4b5fd',   // soft violet
  '#7c3aed',   // vivid violet
  '#06b6d4',   // cyan
  '#38d9f5',   // bright cyan
  '#f472b6',   // pink
  '#a78bfa',   // light purple
  '#67e8f9',   // ice blue
  '#e879f9',   // magenta
]

// ── Helpers ────────────────────────────────────────────────────
function rand(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function randomColor() {
  return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
}

// ── Fixed direction: ALL meteors share the same angle → parallel lines ──
// 120° in canvas math: cos(120°)= -0.5 (left), sin(120°)= +0.866 (down)
// → every meteor travels at 30° from vertical (diagonally down-left), in perfect parallel.
const METEOR_ANGLE_RAD = (120 * Math.PI) / 180
const METEOR_DX = Math.cos(METEOR_ANGLE_RAD)  // -0.5
const METEOR_DY = Math.sin(METEOR_ANGLE_RAD)  // +0.866

function spawnMeteor(w: number, _h: number): Meteor {
  // Spawn across the FULL top edge + some off the right side so leftward-moving
  // meteors that start off-right still cross the visible area.
  const x = rand(-60, w + 200)
  const y = rand(-150, -5)     // always above the canvas → falls in

  // Each meteor gets its OWN speed — slow to fast — but the same direction.
  const speed  = rand(1.5, 9)
  const trailLen = Math.floor(rand(20, 60))

  return {
    x,
    y,
    vx: METEOR_DX * speed,   // same direction as every other meteor
    vy: METEOR_DY * speed,   // always positive → always falls DOWN
    trailLen,
    speed,
    opacity: rand(0.5, 1),
    width: rand(0.8, 2.2),
    color: randomColor(),
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
        r: rand(0.3, 1.4),
        opacity: rand(0.08, 0.55),
        twinkleSpeed: rand(0.006, 0.02),
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    // ── Draw static stars ────────────────────────────────
    function drawStaticStars(t: number) {
      for (const s of staticStars) {
        const o = s.opacity * (0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset))
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(255,255,255,${o.toFixed(3)})`
        ctx!.fill()
      }
    }

    // ── Draw one meteor ──────────────────────────────────
    function drawMeteor(m: Meteor) {
      if (m.trail.length < 2) return
      const [r, g, b] = hexToRgb(m.color)
      const n = m.trail.length

      for (let i = 1; i < n; i++) {
        const t     = i / n                          // 0=tail end, 1=head
        const alpha = t * m.opacity
        const lw    = m.width * t

        ctx!.beginPath()
        ctx!.moveTo(m.trail[i - 1].x, m.trail[i - 1].y)
        ctx!.lineTo(m.trail[i].x,     m.trail[i].y)
        ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`
        ctx!.lineWidth   = lw
        ctx!.lineCap     = 'round'
        ctx!.stroke()
      }

      // Glowing head flare
      const head = m.trail[n - 1]
      const flareR = m.width * 6
      const grad = ctx!.createRadialGradient(head.x, head.y, 0, head.x, head.y, flareR)
      grad.addColorStop(0,   `rgba(${r},${g},${b},${(m.opacity * 0.85).toFixed(3)})`)
      grad.addColorStop(0.35,`rgba(${r},${g},${b},${(m.opacity * 0.25).toFixed(3)})`)
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)
      ctx!.beginPath()
      ctx!.arc(head.x, head.y, flareR, 0, Math.PI * 2)
      ctx!.fillStyle = grad
      ctx!.fill()
    }

    // ── Spawn timing ─────────────────────────────────────
    let spawnTimer = 0
    const BASE_INTERVAL = 22   // frames between spawns

    // Seed some meteors at various stages so screen isn't empty at start
    function seedInitialMeteors() {
      for (let i = 0; i < 7; i++) {
        const m = spawnMeteor(W, H)
        // Pre-advance each meteor a random amount so they're mid-trail
        const preSteps = Math.floor(rand(5, 80))
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
        meteors.push(spawnMeteor(W, H))
        // Occasional burst of 2-3 close together
        if (Math.random() < 0.18) {
          setTimeout(() => meteors.push(spawnMeteor(W, H)), 100)
          if (Math.random() < 0.5) {
            setTimeout(() => meteors.push(spawnMeteor(W, H)), 220)
          }
        }
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

    resize()
    seedInitialMeteors()
    rafRef.current = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement ?? document.body)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
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
