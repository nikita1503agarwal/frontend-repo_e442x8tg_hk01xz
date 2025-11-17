import React, { useState } from 'react'
import Layout from '../components/Layout'

const projects = [
  { id: 1, name: 'Shakti Foods', cat: 'DTC', img: 'https://images.unsplash.com/photo-1518131678677-a09bcbf5a8fe?q=80&w=1200&auto=format&fit=crop', blurb: '3x ROAS through funnel re-architecture and creative systems.' },
  { id: 2, name: 'Devi Health', cat: 'Health', img: 'https://images.unsplash.com/photo-1541976076758-347942db1971?q=80&w=1200&auto=format&fit=crop', blurb: '+120% organic traffic with content moat and UX clean-up.' },
  { id: 3, name: 'Agni SaaS', cat: 'B2B SaaS', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop', blurb: 'Activation loops and pricing tests drove 40% lift.' },
]

export default function Work() {
  const [active, setActive] = useState(null)

  return (
    <Layout title="Work — TEAM BHADRAKALI" description="Selected projects and case studies.">
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">Work</h1>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <button key={p.id} onClick={() => setActive(p)} className="text-left group rounded-lg overflow-hidden border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a227]">
                <img loading="lazy" alt="" src={`${p.img}&auto=format&fit=crop&sat=-10`} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="text-xs text-gray-500">{p.cat}</div>
                  <h3 className="font-medium group-hover:underline">{p.name}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setActive(null)}>
          <article className="max-w-2xl w-full rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
            <img alt="" src={`${active.img}&auto=format&fit=crop`} className="h-60 w-full object-cover rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">{active.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{active.blurb}</p>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b]" onClick={() => setActive(null)}>Close</button>
              </div>
            </div>
          </article>
        </div>
      )}
    </Layout>
  )
}
