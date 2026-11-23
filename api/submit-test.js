// API endpoint to save test submissions
// POST /api/submit-test

import { getConnection, initDB } from './db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, packageType, formData } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone are required' })
  }

  try {
    const db = await initDB()

    await db.execute(
      'INSERT INTO submissions (name, email, phone, package_type, form_data) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, packageType || 'unknown', JSON.stringify(formData)]
    )

    return res.status(200).json({ success: true, message: 'Submission saved' })

  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
