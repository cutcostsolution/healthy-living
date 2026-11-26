import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Key, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  Shield, 
  Users, 
  TrendingUp,
  Package,
  Clock,
  AlertCircle
} from 'lucide-react'

interface AccessCode {
  id: number
  code: string
  package_type: string
  is_used: boolean
  used_by?: string
  used_at?: string
  created_at: string
}

interface Stats {
  total: number
  used: number
  unused: number
  recentUsage: AccessCode[]
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [error, setError] = useState('')
  const [codes, setCodes] = useState<AccessCode[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [copiedCode, setCopiedCode] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('Basic Fit')
  const navigate = useNavigate()

  const packages = [
    { name: 'Basic Fit', price: '₦47,350' },
    { name: 'Dual Choice', price: '₦70,251' },
    { name: 'FlexiPick', price: '₦113,740' }
  ]

  useEffect(() => {
    // Check if already authenticated in this session
    const saved = sessionStorage.getItem('adminAuth')
    if (saved === 'true') {
      setIsAuthenticated(true)
      fetchCodes()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey })
      })

      if (response.ok) {
        setIsAuthenticated(true)
        sessionStorage.setItem('adminAuth', 'true')
        fetchCodes()
      } else {
        setError('Invalid admin key')
      }
    } catch (err) {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const fetchCodes = async () => {
    try {
      const response = await fetch('/api/admin-codes', {
        headers: { 'x-admin-key': adminKey || sessionStorage.getItem('adminKey') || '' }
      })
      if (response.ok) {
        const data = await response.json()
        setCodes(data.codes || [])
        setStats(data.stats)
      }
    } catch (err) {
      console.error('Failed to fetch codes')
    }
  }

  const generateCode = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/generate-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey || sessionStorage.getItem('adminKey') || ''
        },
        body: JSON.stringify({ packageType: selectedPackage, count: 1 })
      })

      if (response.ok) {
        const data = await response.json()
        fetchCodes()
        // Show the new code prominently
        if (data.codes && data.codes.length > 0) {
          setCopiedCode(data.codes[0].code)
        }
      }
    } catch (err) {
      alert('Failed to generate code')
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const deleteCode = async (id: number) => {
    if (!confirm('Delete this code?')) return
    try {
      await fetch(`/api/admin-codes/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey || sessionStorage.getItem('adminKey') || '' }
      })
      fetchCodes()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuth')
    sessionStorage.removeItem('adminKey')
    setIsAuthenticated(false)
    setAdminKey('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <p className="text-slate-400 text-sm">Enter your admin key to manage access codes</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter Admin Key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Access Dashboard'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full text-slate-400 hover:text-white"
                onClick={() => navigate('/')}
              >
                Back to Website
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-8 h-8 text-purple-600" />
              Healthy Living Admin
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Manage access codes and view statistics</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchCodes} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={logout} variant="destructive" size="sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Codes</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Key className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Used</p>
                    <p className="text-2xl font-bold text-green-600">{stats.used}</p>
                  </div>
                  <Check className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Available</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.unused}</p>
                  </div>
                  <Package className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Conversion</p>
                    <p className="text-2xl font-bold">
                      {stats.total > 0 ? Math.round((stats.used / stats.total) * 100) : 0}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="generate">Generate Codes</TabsTrigger>
            <TabsTrigger value="manage">Manage Codes</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Generate Tab */}
          <TabsContent value="generate">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Generate New Access Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Package</label>
                    <div className="grid grid-cols-3 gap-2">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.name}
                          onClick={() => setSelectedPackage(pkg.name)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedPackage === pkg.name
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-slate-200 dark:border-slate-700 hover:border-purple-300'
                          }`}
                        >
                          <div className="font-semibold text-sm">{pkg.name}</div>
                          <div className="text-xs opacity-75">{pkg.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={generateCode} 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={generating}
                  >
                    {generating ? 'Generating...' : 'Generate Access Code'}
                  </Button>
                </CardContent>
              </Card>

              {/* Latest Generated Code */}
              {copiedCode && (
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      New Code Generated!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
                      <div className="text-4xl font-mono font-bold tracking-wider text-slate-900 dark:text-white mb-4">
                        {copiedCode}
                      </div>
                      <Button 
                        onClick={() => copyToClipboard(copiedCode)}
                        className="w-full"
                        variant={copiedCode ? "secondary" : "default"}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-slate-500 mt-4">
                        Package: {selectedPackage}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Send this code to your customer via WhatsApp
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>All Access Codes ({codes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4">Code</th>
                        <th className="text-left py-3 px-4">Package</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Created</th>
                        <th className="text-left py-3 px-4">Used At</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {codes.map((code) => (
                        <tr key={code.id} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="py-3 px-4 font-mono font-bold">{code.code}</td>
                          <td className="py-3 px-4">{code.package_type}</td>
                          <td className="py-3 px-4">
                            {code.is_used ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <Check className="w-3 h-3 mr-1" /> Used
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                <Clock className="w-3 h-3 mr-1" /> Available
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {new Date(code.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {code.used_at ? new Date(code.used_at).toLocaleString() : '-'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(code.code)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => deleteCode(code.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="recent">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Recently Used Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentUsage && stats.recentUsage.length > 0 ? (
                    stats.recentUsage.map((usage) => (
                      <div key={usage.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-mono font-bold">{usage.code}</p>
                            <p className="text-sm text-slate-500">{usage.package_type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            {new Date(usage.used_at!).toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(usage.used_at!).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 py-8">No codes used yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
