// Get all access codes and stats
import { getConnection, initDB } from './db.js'

export default async function handler(req, res) {
  // Verify admin key
  const adminKey = req.headers['x-admin-key']
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const db = await initDB()

    // Get all codes
    const [codes] = await db.execute(
      'SELECT * FROM access_codes ORDER BY created_at DESC LIMIT 100'
    )

    // Get stats
    const [totalResult] = await db.execute('SELECT COUNT(*) as count FROM access_codes')
    const [usedResult] = await db.execute('SELECT COUNT(*) as count FROM access_codes WHERE is_used = TRUE')
    
    // Get recent usage (last 10 used codes)
    const [recentUsage] = await db.execute(
      'SELECT * FROM access_codes WHERE is_used = TRUE ORDER BY used_at DESC LIMIT 10'
    )

    const total = totalResult[0].count
    const used = usedResult[0].count

    return res.status(200).json({
      codes,
      stats: {
        total,
        used,
        unused: total - used,
        recentUsage
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Database error' })
  }
}
