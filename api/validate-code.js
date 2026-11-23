// API endpoint to validate access codes
// POST /api/validate-code
// Body: { code: "H7K9P2" }

import { getConnection, initDB } from './db.js'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Access code is required' })
  }

  try {
    const db = await initDB()

    // Check if code exists and is not used
    const [rows] = await db.execute(
      'SELECT * FROM access_codes WHERE code = ? AND is_used = FALSE',
      [code.trim().toUpperCase()]
    )

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid or already used access code' })
    }

    // Mark code as used
    await db.execute(
      'UPDATE access_codes SET is_used = TRUE, used_at = NOW() WHERE code = ?',
      [code.trim().toUpperCase()]
    )

    return res.status(200).json({
      success: true,
      package: rows[0].package_type,
      message: 'Access granted'
    })

  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
}
