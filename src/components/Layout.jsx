import React, { useEffect, useState, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children, title, description, jsonLd }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem('reduced-motion')
    if (saved != null) return saved === 'true'
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    document.documentElement.style.scrollBehavior = reducedMotion ? 'auto' : 'smooth'
    document.documentElement.setAttribute('data-reduced-motion', reducedMotion ? 'true' : 'false')
  }, [reducedMotion])

  useEffect(() => {
    if (title) document.title = title

    const metaDesc = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      document.head.appendChild(m)
      return m
    })()
    if (description) metaDesc.setAttribute('content', description)

    const ogTitle = ensureMeta('property', 'og:title')
    const ogDesc = ensureMeta('property', 'og:description')
    const ogType = ensureMeta('property', 'og:type')
    const ogUrl = ensureMeta('property', 'og:url')

    ogTitle.setAttribute('content', title || 'TEAM BHADRAKALI')
    ogDesc.setAttribute('content', description || '')
    ogType.setAttribute('content', 'website')
    ogUrl.setAttribute('content', window.location.href)

    const twTitle = ensureMeta('name', 'twitter:title')
    const twDesc = ensureMeta('name', 'twitter:description')
    const twCard = ensureMeta('name', 'twitter:card')

    twTitle.setAttribute('content', title || 'TEAM BHADRAKALI')
    twDesc.setAttribute('content', description || '')
    twCard.setAttribute('content', 'summary_large_image')

    // JSON-LD
    let jsonScript = document.getElementById('page-jsonld')
    if (!jsonScript) {
      jsonScript = document.createElement('script')
      jsonScript.type = 'application/ld+json'
      jsonScript.id = 'page-jsonld'
      document.head.appendChild(jsonScript)
    }
    if (jsonLd) {
      jsonScript.textContent = JSON.stringify(jsonLd)
    } else {
      jsonScript.textContent = ''
    }
  }, [title, description, jsonLd, location.pathname])

  // Scroll depth tracking
  useEffect(() => {
    let maxDepth = 0
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      if (percent >= maxDepth + 25) {
        maxDepth = percent
        window.dispatchEvent(new CustomEvent('analytics', { detail: { category: 'Scroll', action: 'Depth', label: `${maxDepth}%` } }))
        console.log('[analytics]', { category: 'Scroll', action: 'Depth', label: `${maxDepth}%` })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = useMemo(() => ([
    { to: '/', label: 'Home' },
    { to: '/solutions', label: 'Solutions + Pricing' },
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]), [])

  return (
    <div className="min-h-screen bg-white text-[#111] font-ubuntu">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-gold focus:text-white focus:px-3 focus:py-2 rounded">Skip to content</a>
      <header className="sticky top-0 z-50 backdrop-blur border-b border-gray-100 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3" aria-label="TEAM BHADRAKALI home">
              <div aria-hidden className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#b21f2d] to-[#7a001b] flex items-center justify-center text-white font-black">ॐ</div>
              <span className="text-sm tracking-wider font-semibold">TEAM BHADRAKALI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) => classNames(
                    'relative text-sm font-medium hover:text-[#b21f2d] transition-colors',
                    isActive ? 'text-[#b21f2d]' : 'text-gray-700'
                  )}
                >
                  {({ isActive }) => (
                    <span className="group inline-flex items-center">
                      {n.label}
                      <span aria-hidden className={classNames('absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#b21f2d] via-[#7a001b] to-[#c9a227] transition-all duration-300 group-hover:w-full', isActive && 'w-full')}></span>
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                data-category="Preferences"
                data-action="Toggle"
                data-label="Reduced Motion"
                aria-pressed={reducedMotion}
                onClick={() => setReducedMotion((v) => {
                  localStorage.setItem('reduced-motion', (!v).toString())
                  return !v
                })}
                className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-gray-400"
              >
                {reducedMotion ? 'Animations Off' : 'Animations On'}
              </button>
              <button className="md:hidden p-2" aria-label="Menu" onClick={() => setMobileOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Menu</span>
                <button className="p-2" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-3 grid gap-2">
                {nav.map(n => (
                  <NavLink key={n.to} to={n.to} onClick={() => setMobileOpen(false)} className="py-2 text-gray-800 hover:text-[#b21f2d]">
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main">{children}</main>

      <footer className="mt-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Let’s build your growth plan</h3>
            <p className="text-sm text-gray-600 mt-1">Quick reach-out — we’ll respond within 1 business day.</p>
          </div>
          <FooterReachOutForm />
        </div>
        <div className="text-xs text-gray-500 py-6 text-center">© {new Date().getFullYear()} TEAM BHADRAKALI. All rights reserved.</div>
      </footer>
    </div>
  )
}

function ensureMeta(attr, name) {
  let el = document.querySelector(`meta[${attr}='${name}']`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  return el
}

function FooterReachOutForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email required'
    if (form.message.trim().length < 10) return 'Message should be at least 10 characters'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError('')
    setStatus('loading')
    try {
      const { submitToSupabase } = await import('../lib/forms')
      await submitToSupabase('reachout', {
        name: form.name,
        email: form.email,
        message: form.message,
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3" data-category="Form" data-action="Submit" data-label="reachout">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input id="name" name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9a227]" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" name="email" value={form.email} onChange={onChange} inputMode="email" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9a227]" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <input id="message" name="message" value={form.message} onChange={onChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9a227]" required />
        </div>
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex items-center gap-3">
        <button disabled={status==='loading'} className="px-4 py-2 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b] disabled:opacity-60">{status==='loading'?'Sending...':'Send'}</button>
        {status==='success' && <span className="text-sm text-green-700">Thanks! We’ll be in touch.</span>}
      </div>
    </form>
  )
}
