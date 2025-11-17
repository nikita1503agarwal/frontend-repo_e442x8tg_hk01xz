// Supabase submission helper with enrichment and RLS-friendly inserts
export async function submitToSupabase(form_type, payload) {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase env missing')

  // Enrichment
  const params = new URLSearchParams(window.location.search)
  const utm = Object.fromEntries(Array.from(params.entries()).filter(([k]) => k.startsWith('utm_')))
  const enriched = {
    ...payload,
    form_type,
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
    utm_term: utm.utm_term || null,
    utm_content: utm.utm_content || null,
    page_path: window.location.pathname,
    user_agent: navigator.userAgent,
    created_at: new Date().toISOString(),
  }

  const table = form_type // tables: free_growth_plan, contact, reachout
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(enriched),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Supabase error: ${res.status} ${text}`)
  }
  return res.json()
}
