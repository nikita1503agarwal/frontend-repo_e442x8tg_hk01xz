import React from 'react'
import Layout from '../components/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  const title = 'TEAM BHADRAKALI — Digital Growth Partners'
  const description = 'White-glove digital marketing studio delivering compounding growth. Performance, brand, and product working as one.'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'TEAM BHADRAKALI',
    'url': window.location.origin,
  }

  return (
    <Layout title={title} description={description} jsonLd={jsonLd}>
      <Hero />
      <WhatWeDo />
      <Proof />
      <FeaturedWork />
      <CtaBand />
    </Layout>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#b21f2d] to-[#7a001b] text-white flex items-center justify-center text-3xl font-black shadow-lg">ॐ</div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Growth powered by devotion</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We align performance, brand, and product to create compounding outcomes for ambitious teams.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#growth" className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b]">
              Get Free Growth Plan <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/work" className="inline-flex items-center gap-2 px-5 py-3 rounded border border-gray-300 hover:border-gray-400">View Work</a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function WhatWeDo() {
  const items = [
    { title: 'Acquisition', desc: 'Full-funnel paid + SEO that compounds.' },
    { title: 'Brand', desc: 'Identity, narrative, and content that converts.' },
    { title: 'Product', desc: 'Landing systems and growth loops.' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">What we do</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="group p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-transform will-change-transform hover:-translate-y-1 bg-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c9a227]" />
                <h3 className="font-semibold">{it.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-2">{it.desc}</p>
              <div aria-hidden className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[#b21f2d] via-[#7a001b] to-[#c9a227] group-hover:w-full transition-all"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Proof() {
  const stats = [
    ['3x', 'ROAS on DTC'],
    ['+120%', 'Organic traffic'],
    ['<2.5s', 'Core LCP'],
  ]
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
        {stats.map(([k, v]) => (
          <div key={k} className="p-6 rounded-lg bg-white border border-gray-200 text-center">
            <div className="text-3xl font-semibold text-[#7a001b]">{k}</div>
            <div className="text-sm text-gray-600">{v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedWork() {
  const items = [
    { name: 'Shakti Foods', cat: 'DTC', img: 'https://images.unsplash.com/photo-1518131678677-a09bcbf5a8fe?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Devi Health', cat: 'Health', img: 'https://images.unsplash.com/photo-1541976076758-347942db1971?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Agni SaaS', cat: 'B2B SaaS', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">Featured work</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <article key={p.name} className="group rounded-lg overflow-hidden border border-gray-200 bg-white">
              <img loading="lazy" src={`${p.img}&auto=format&fit=crop&sat=-10`} alt="" className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="text-xs text-gray-500">{p.cat}</div>
                <h3 className="font-medium group-hover:underline">{p.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section id="growth" className="py-16 bg-gradient-to-r from-[#b21f2d] to-[#7a001b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Get your free growth plan</h3>
        <a href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded bg-white/10 hover:bg-white/20">
          Start now <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}
