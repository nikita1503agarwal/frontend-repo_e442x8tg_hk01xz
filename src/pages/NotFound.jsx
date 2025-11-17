import React from 'react'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout title="Not Found — TEAM BHADRAKALI" description="The page you’re looking for was not found.">
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-semibold">Page not found</h1>
          <p className="text-gray-600 mt-2">Let’s take you home.</p>
          <a href="/" className="mt-6 inline-block px-4 py-2 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b]">Go Home</a>
        </div>
      </section>
    </Layout>
  )
}
