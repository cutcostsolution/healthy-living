import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, CheckCircle2, Building2, User, Hash, Wallet, CreditCard } from 'lucide-react'
import { useState } from 'react'

export default function PaymentPage() {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const pkgId = localStorage.getItem('selectedPackage') || ''

  const packages: Record<string, { name: string; price: string; color: string }> = {
    basic: { name: 'Basic Fit', price: 'N47,350', color: 'bg-stone-100 text-stone-700' },
    dual: { name: 'Dual Choice', price: 'N70,251.30', color: 'bg-[#f0f7f1] text-[#2d5a3d]' },
    flexi: { name: 'FlexiPick', price: 'N113,740', color: 'bg-[#fef9e8] text-[#8b6914]' }
  }

  const pkg = packages[pkgId] || packages.dual

  useEffect(() => {
    document.title = 'Make Payment | HEALTHY LIVING'
    if (!pkgId) navigate('/quiz')
  }, [pkgId, navigate])

  const handleCopy = () => {
    navigator.clipboard.writeText('1030187673')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f1] text-[#4a7c59] px-4 py-2 rounded-full mb-4">
            <Wallet className="w-4 h-4" />
            <span className="text-sm font-medium">Step 2 of 4</span>
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Make Your <span className="text-[#4a7c59]">Payment</span>
          </h1>
          <p className="text-stone-500">Complete your payment to proceed with the Body Reveal Test</p>
        </div>

        {/* Selected Package Summary */}
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-5">
            <p className="text-sm text-stone-400 mb-1">Selected Package</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${pkg.color}`}>
                  {pkg.name}
                </span>
              </div>
              <span className="text-2xl font-bold text-[#4a7c59]">{pkg.price}</span>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="border-2 border-[#4a7c59]/20 shadow-xl mb-6 bg-gradient-to-br from-[#f0f7f1] to-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#d62027] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">UBA</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">United Bank for Africa (UBA)</h3>
                <p className="text-sm text-stone-500">Bank Transfer / Deposit</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-400">Account Name</span>
                </div>
                <p className="text-lg font-bold text-stone-900">HEALTHY LIVING SOLUTIONS</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-400">Account Number</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 tracking-wider">1030187673</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0f7f1] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white transition-all"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-400">Bank Name</span>
                </div>
                <p className="text-lg font-bold text-stone-900">United Bank for Africa (UBA)</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-stone-200">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-400">Amount to Pay</span>
                </div>
                <p className="text-2xl font-bold text-[#4a7c59]">{pkg.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="bg-[#fef9e8] rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-[#8b6914] mb-3">Payment Instructions</h3>
          <ol className="space-y-2 text-sm text-[#8b6914]">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Transfer or deposit <strong>{pkg.price}</strong> to the account above.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Save your payment receipt or screenshot the transaction confirmation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Click "I Have Paid" below to send us your proof of payment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Our team will verify your payment and send you a one-time access code.</span>
            </li>
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Button
            onClick={() => navigate('/quiz/confirm')}
            size="lg"
            className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white px-12 py-7 text-lg rounded-full shadow-xl transition-all hover:scale-105"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            I Have Paid — Send Proof
          </Button>
          <p className="text-sm text-stone-400">
            Do not click until you have completed the payment
          </p>
        </div>
      </div>
    </div>
  )
}
