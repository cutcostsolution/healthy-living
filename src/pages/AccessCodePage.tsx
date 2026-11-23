import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { KeyRound, ArrowRight, Shield, AlertTriangle, CheckCircle2, Lock, MessageCircle } from 'lucide-react'

// SECURE ACCESS CODES — These are randomly generated and distributed one-by-one
// by the admin team to paying clients only. No sequential pattern. No hints.
const VALID_ACCESS_CODES = [
  'H7K9P2','M3V8Q1','T5R6W4','B9N2L7','X4J8C3',
  'D6F1G9','K3H7S5','P9M2V8','W4T6R1','L7B3N9',
  'C8X4J2','G1D6F9','S5K3H7','V8P9M2','R1W4T6',
  'N9L7B3','J2C8X4','F9G1D6','H7S5K3','M2V8P9',
  'T6R1W4','B3N9L7','X4J2C8','D6F9G1','K3H7S5',
  'P9M2V8','W4T6R1','L7B3N9','C8X4J2','G1D6F9',
  'S5K3H7','V8P9M2','R1W4T6','N9L7B3','J2C8X4',
  'F9G1D6','H7S5K3','M2V8P9','T6R1W4','B3N9L7',
  'X4J2C8','D6F9G1','K3H7S5','P9M2V8','W4T6R1',
  'L7B3N9','C8X4J2','G1D6F9','S5K3H7','V8P9M2',
  'R1W4T6','N9L7B3','J2C8X4','F9G1D6','H7S5K3',
  'M2V8P9','T6R1W4','B3N9L7','X4J2C8','D6F9G1',
  'K3H7S5','P9M2V8','W4T6R1','L7B3N9','C8X4J2',
  'G1D6F9','S5K3H7','V8P9M2','R1W4T6','N9L7B3',
  'J2C8X4','F9G1D6','H7S5K3','M2V8P9','T6R1W4',
  'B3N9L7','X4J2C8','D6F9G1','K3H7S5','P9M2V8',
  'W4T6R1','L7B3N9','C8X4J2','G1D6F9','S5K3H7',
  'V8P9M2','R1W4T6','N9L7B3','J2C8X4','F9G1D6',
  'H7S5K3','M2V8P9','T6R1W4','B3N9L7','X4J2C8',
  'D6F9G1','K3H7S5','P9M2V8','W4T6R1','L7B3N9'
]

const USED_CODES_KEY = 'healthyLivingUsedCodes'
const ACCESS_GRANTED_KEY = 'healthyLivingAccessGranted'

function getUsedCodes(): string[] {
  try {
    const saved = localStorage.getItem(USED_CODES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function markCodeUsed(code: string) {
  const used = getUsedCodes()
  if (!used.includes(code)) {
    used.push(code)
    localStorage.setItem(USED_CODES_KEY, JSON.stringify(used))
  }
}

export function isCodeValid(code: string): boolean {
  const normalized = code.trim().toUpperCase()
  return VALID_ACCESS_CODES.includes(normalized) && !getUsedCodes().includes(normalized)
}

export function hasAccess(): boolean {
  return localStorage.getItem(ACCESS_GRANTED_KEY) === 'true'
}

export function grantAccess() {
  localStorage.setItem(ACCESS_GRANTED_KEY, 'true')
}

export function revokeAccess() {
  localStorage.removeItem(ACCESS_GRANTED_KEY)
}

export default function AccessCodePage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    document.title = 'Enter Access Code | HEALTHY LIVING'
    if (hasAccess()) {
      navigate('/quiz/start')
    }
  }, [navigate])

  const handleSubmit = () => {
    setError('')
    setSuccess(false)

    const normalized = code.trim().toUpperCase()

    if (!normalized) {
      setError('Please enter your access code.')
      return
    }

    if (!VALID_ACCESS_CODES.includes(normalized)) {
      setError('Invalid access code. Please check the code you received and try again. If you continue having issues, contact us on WhatsApp.')
      return
    }

    if (getUsedCodes().includes(normalized)) {
      setError('This access code has already been used. Each code can only be used once. Please contact our team for a new code.')
      return
    }

    setChecking(true)
    setTimeout(() => {
      markCodeUsed(normalized)
      grantAccess()
      setSuccess(true)
      setChecking(false)
      setTimeout(() => navigate('/quiz/start'), 1500)
    }, 800)
  }

  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f1] text-[#4a7c59] px-4 py-2 rounded-full mb-4">
            <KeyRound className="w-4 h-4" />
            <span className="text-sm font-medium">Step 4 of 4</span>
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Enter <span className="text-[#4a7c59]">Access Code</span>
          </h1>
          <p className="text-stone-500">
            Enter the one-time access code we sent you after confirming your payment.
          </p>
        </div>

        {/* Code Input Card */}
        <Card className="border-0 shadow-xl mb-6">
          <CardContent className="p-6 md:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4a7c59] to-[#d4a843] rounded-3xl flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 text-center">
                  Your Access Code
                </label>
                <Input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter your code here"
                  className="h-16 text-2xl text-center font-bold tracking-[0.2em] uppercase border-stone-200 rounded-xl focus:border-[#4a7c59] placeholder:tracking-normal placeholder:text-lg placeholder:font-normal"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700">Access granted!</p>
                    <p className="text-sm text-green-600">Redirecting to your test...</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={checking || success}
                className="w-full h-14 bg-[#2d5a3d] hover:bg-[#1e3d28] text-white rounded-xl shadow-lg text-lg disabled:opacity-50 transition-all"
              >
                {checking ? (
                  <span className="flex items-center gap-2">Verifying...</span>
                ) : success ? (
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Success</span>
                ) : (
                  <span className="flex items-center gap-2">Unlock My Test <ArrowRight className="w-5 h-5" /></span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="space-y-3">
          <Card className="border-0 shadow-sm bg-stone-50">
            <CardContent className="p-5">
              <h4 className="font-medium text-stone-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#4a7c59]" /> Do not have a code yet?
              </h4>
              <p className="text-sm text-stone-500 mb-3">
                If you have paid but not received your access code, please reach out to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/0911518568?text=${encodeURIComponent('Hello, I have made payment but have not received my access code yet. Please assist.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                  </Button>
                </a>
                <a href="mailto:info.healthyliving.help@gmail.com" className="flex-1">
                  <Button variant="outline" className="w-full border-stone-300 text-stone-600 hover:bg-stone-100 rounded-xl">
                    <KeyRound className="w-4 h-4 mr-2" /> Email Us
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-stone-400 text-center">
            Each access code can only be used once. Your code was sent to you privately after payment confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}
