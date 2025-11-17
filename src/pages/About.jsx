import React from 'react'
import Layout from '../components/Layout'

export default function About() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'TEAM BHADRAKALI',
  }
  return (
    <Layout title="About — TEAM BHADRAKALI" description="Principles, values, and people behind the work." jsonLd={jsonLd}>
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">About</h1>
          <p className="mt-4 text-gray-700">We believe in compounding craft: the intersection of performance, brand, and product. We operate as a focused squad embedded with your team.</p>
          <blockquote className="mt-6 border-l-4 border-[#c9a227] pl-4 italic text-gray-700">శక్తి తో నడిచే ఎదుగుదల — growth powered by shakti.</blockquote>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-gray-200 bg-white">
              <h3 className="font-semibold">Values</h3>
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
                <li>Devotion to outcomes</li>
                <li>Systems over hacks</li>
                <li>Clarity and candor</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 bg-white">
              <h3 className="font-semibold">How we work</h3>
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
                <li>Weekly experiments and reviews</li>
                <li>Shared KPI ladders</li>
                <li>Asynchronous clarity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
