// API endpoint for admin to generate access codes
// POST /api/generate-codes
// Body: { packageType: "dual", count: 10 }
// ADMIN ONLY - add admin key check

import { getConnection, initDB } from './db.js'
import crypto from 'crypto'

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple admin check — you should set ADMIN_KEY in Vercel env vars
  const adminKey = req.headers['x-admin-key']
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { packageType, count = 1 } = req.body

  if (!packageType) {
    return res.status(400).json({ error: 'Package type is required' })
  }

  try {
    const db = await initDB()
    const codes = []

    for (let i = 0; i < count; i++) {
      const code = generateCode()
      await db.execute(
        'INSERT INTO access_codes (code, package_type) VALUES (?, ?)',
        [code, packageType]
      )
      codes.push(code)
    }

    return res.status(200).json({ success: true, codes })

  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
