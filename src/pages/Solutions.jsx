import React, { useState } from 'react'
import Layout from '../components/Layout'

export default function Solutions() {
  const title = 'Solutions & Pricing — TEAM BHADRAKALI'
  const description = 'Service blocks, pricing tiers, and FAQs tailored for compounding growth.'
  const faq = [
    { q: 'How fast can we start?', a: 'We can typically begin within 1-2 weeks after alignment.' },
    { q: 'Do you work on performance and brand?', a: 'Yes — we integrate paid, SEO, product, and brand for compounding outcomes.' },
    { q: 'What does success look like?', a: 'Clear KPI ladders across acquisition, activation, and retention.' },
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Digital marketing and growth services',
    'provider': { '@type': 'Organization', 'name': 'TEAM BHADRAKALI' },
    'areaServed': 'Global'
  }

  return (
    <Layout title={title} description={description} jsonLd={jsonLd}>
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">Solutions</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Full-funnel growth across acquisition, brand, and product.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card title="Acquisition" list={[ 'Paid Search/Social', 'SEO + Content', 'Attribution' ]} />
            <Card title="Brand" list={[ 'Identity + Systems', 'Messaging + Narrative', 'Content Ops' ]} />
            <Card title="Product" list={[ 'Landing Systems', 'Experimentation', 'Activation' ]} />
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Price name="Starter" price="$4,000/mo" points={[ 'Growth plan', '1 channel', 'Monthly reporting' ]} />
            <Price name="Growth" price="$8,000/mo" highlight points={[ '3 channels', 'Experimentation', 'Weekly reporting' ]} />
            <Price name="Scale" price="Custom" points={[ 'Multi-market', 'Squad model', 'C-suite alignment' ]} />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-lg border border-gray-200">
            {faq.map((f) => (
              <details key={f.q} className="group p-4">
                <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                  {f.q}
                  <span aria-hidden className="ml-4 text-[#7a001b] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="text-sm text-gray-600 mt-2">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

function Card({ title, list }) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white hover:-translate-y-1 transition will-change-transform">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
        {list.map((l) => <li key={l}>{l}</li>)}
      </ul>
    </div>
  )
}

function Price({ name, price, points, highlight }) {
  return (
    <div className={"p-6 rounded-lg border bg-white " + (highlight ? 'border-[#c9a227] shadow-lg' : 'border-gray-200')}>
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">{name}</h3>
        <div className="text-xl text-[#7a001b] font-semibold">{price}</div>
      </div>
      <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <a href="/contact" className="mt-6 inline-block px-4 py-2 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b]">Get started</a>
    </div>
  )
}
