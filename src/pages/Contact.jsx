import React, { useState } from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email required'
    if (form.phone && !/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) return 'Enter a valid phone number'
    if (form.website && !/^https?:\/\//.test(form.website)) return 'Website must start with http or https'
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
      await submitToSupabase('contact', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', website: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <Layout title="Contact — TEAM BHADRAKALI" description="Reach out for a free growth plan and engagement details.">
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="text-gray-600 mt-2">We’ll respond within 1 business day.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-3" data-category="Form" data-action="Submit" data-label="contact">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="name" label="Name" value={form.name} onChange={onChange} required />
              <Field id="email" label="Email" value={form.email} onChange={onChange} required inputMode="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field id="phone" label="Phone" value={form.phone} onChange={onChange} inputMode="tel" />
              <Field id="website" label="Website" value={form.website} onChange={onChange} placeholder="https://" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={onChange} rows="5" className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9a227]"></textarea>
            </div>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex items-center gap-3">
              <button disabled={status==='loading'} className="px-4 py-2 rounded bg-[#b21f2d] text-white hover:bg-[#7a001b] disabled:opacity-60">{status==='loading'?'Sending...':'Send'}</button>
              {status==='success' && <span className="text-sm text-green-700">Thanks! We’ll be in touch.</span>}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

function Field({ id, label, value, onChange, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <input id={id} name={id} value={value} onChange={onChange} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c9a227]" {...props} />
    </div>
  )
}
