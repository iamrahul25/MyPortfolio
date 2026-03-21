import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const SMOOTH = 0.2
const TRAIL_MAX = 32
const TRAIL_SAMPLE_DIST = 2.8
const NEON_HUES = [185, 300, 265, 320, 145]

export default function ParticleCursor() {
  const { isDark } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const enabled = () => finePointer.matches && !reducedMotion.matches

    if (!enabled()) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const mouse = { x: -9999, y: -9999, active: false }
    const smooth = { x: -9999, y: -9999 }
    const trail: { x: number; y: number }[] = []
    let raf = 0
    let hueShift = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e: MouseEvent) => {
      if (!mouse.active) {
        smooth.x = e.clientX
        smooth.y = e.clientY
      }
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const onLeave = () => {
      mouse.active = false
    }

    const pushTrail = () => {
      const last = trail[trail.length - 1]
      if (!last || Math.hypot(smooth.x - last.x, smooth.y - last.y) >= TRAIL_SAMPLE_DIST) {
        trail.push({ x: smooth.x, y: smooth.y })
        if (trail.length > TRAIL_MAX) trail.shift()
      }
    }

    const drawRibbon = (dark: boolean, cx: number, cy: number) => {
      if (trail.length < 2) return

      const tail = trail[0]
      const grad = ctx.createLinearGradient(tail.x, tail.y, cx, cy)
      if (dark) {
        const h0 = (NEON_HUES[2] + hueShift) % 360
        const h1 = (NEON_HUES[0] + hueShift) % 360
        grad.addColorStop(0, `hsla(${h0}, 100%, 58%, 0)`)
        grad.addColorStop(0.35, `hsla(${(h0 + h1) / 2}, 100%, 62%, 0.22)`)
        grad.addColorStop(1, `hsla(${h1}, 100%, 72%, 0.72)`)
      } else {
        grad.addColorStop(0, 'rgba(59, 130, 246, 0)')
        grad.addColorStop(0.45, 'rgba(99, 102, 241, 0.2)')
        grad.addColorStop(1, 'rgba(37, 99, 235, 0.5)')
      }

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(trail[0].x, trail[0].y)
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y)
      }
      ctx.lineTo(cx, cy)

      ctx.strokeStyle = grad
      ctx.lineWidth = dark ? 5 : 3.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      if (dark) {
        ctx.shadowBlur = 16
        ctx.shadowColor = `hsla(${(NEON_HUES[0] + hueShift) % 360}, 100%, 60%, 0.55)`
      }
      ctx.stroke()
      ctx.restore()
    }

    const drawOrbitals = (dark: boolean, cx: number, cy: number, t: number) => {
      const configs = [
        { r: 15, speed: 1.35, phase: 0, size: dark ? 3.2 : 2.6 },
        { r: 21, speed: -1.05, phase: 2.1, size: dark ? 2.6 : 2.2 },
        { r: 18, speed: 1.6, phase: 4.2, size: dark ? 2.2 : 1.9 },
      ]

      ctx.save()
      ctx.strokeStyle = dark ? 'rgba(167, 139, 250, 0.35)' : 'rgba(15, 23, 42, 0.12)'
      ctx.lineWidth = 1
      ctx.setLineDash(dark ? [4, 6] : [3, 5])
      ctx.beginPath()
      ctx.arc(cx, cy, 17, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      for (let i = 0; i < configs.length; i++) {
        const c = configs[i]
        const a = t * c.speed + c.phase
        const ox = cx + Math.cos(a) * c.r
        const oy = cy + Math.sin(a) * c.r
        const hue = NEON_HUES[i % NEON_HUES.length]

        if (dark) {
          ctx.shadowBlur = 14
          ctx.shadowColor = `hsla(${hue}, 100%, 65%, 0.75)`
          ctx.fillStyle = `hsla(${(hue + hueShift * 0.5) % 360}, 100%, 74%, 0.9)`
        } else {
          ctx.fillStyle = i === 0 ? 'rgba(37, 99, 235, 0.9)' : 'rgba(79, 70, 229, 0.75)'
        }
        ctx.beginPath()
        ctx.arc(ox, oy, c.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
      ctx.restore()
    }

    const drawCore = (dark: boolean, cx: number, cy: number, t: number) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(t * 0.7)

      if (dark) {
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(34, 211, 238, 0.85)'
        ctx.strokeStyle = 'rgba(244, 114, 182, 0.9)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, -7)
        ctx.lineTo(6, 0)
        ctx.lineTo(0, 7)
        ctx.lineTo(-6, 0)
        ctx.closePath()
        ctx.stroke()
        ctx.fillStyle = 'rgba(240, 249, 255, 0.95)'
        ctx.beginPath()
        ctx.moveTo(0, -3.5)
        ctx.lineTo(3, 0)
        ctx.lineTo(0, 3.5)
        ctx.lineTo(-3, 0)
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(0, -6)
        ctx.lineTo(5, 0)
        ctx.lineTo(0, 6)
        ctx.lineTo(-5, 0)
        ctx.closePath()
        ctx.stroke()
        ctx.fillStyle = 'rgba(37, 99, 235, 0.95)'
        ctx.beginPath()
        ctx.arc(0, 0, 2.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const tick = () => {
      const dark = isDarkRef.current
      const w = window.innerWidth
      const h = window.innerHeight
      const time = performance.now() * 0.001

      ctx.clearRect(0, 0, w, h)

      if (mouse.active) {
        smooth.x += (mouse.x - smooth.x) * SMOOTH
        smooth.y += (mouse.y - smooth.y) * SMOOTH
        const speed = Math.hypot(mouse.x - smooth.x, mouse.y - smooth.y)
        hueShift = (hueShift + (dark ? 0.9 : 0.35) + speed * 0.04) % 360
        pushTrail()
      } else {
        smooth.x += (mouse.x - smooth.x) * SMOOTH
        smooth.y += (mouse.y - smooth.y) * SMOOTH
        if (trail.length > 0) trail.shift()
      }

      const cx = smooth.x
      const cy = smooth.y
      const show = mouse.active || trail.length > 0

      if (show && cx > -500) {
        drawRibbon(dark, cx, cy)
        if (mouse.active) {
          drawOrbitals(dark, cx, cy, time)
          drawCore(dark, cx, cy, time)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.cursor = prevCursor || ''
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        mixBlendMode: isDark ? 'screen' : 'normal',
      }}
    />
  )
}
