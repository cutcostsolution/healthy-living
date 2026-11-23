import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircle, Mail, ArrowRight, CheckCircle2, Receipt, Smartphone, Clock } from 'lucide-react'

export default function PaymentConfirmPage() {
  const navigate = useNavigate()
  const pkgId = localStorage.getItem('selectedPackage') || ''

  const packages: Record<string, { name: string; price: string }> = {
    basic: { name: 'Basic Fit', price: 'N47,350' },
    dual: { name: 'Dual Choice', price: 'N70,251.30' },
    flexi: { name: 'FlexiPick', price: 'N113,740' }
  }

  const pkg = packages[pkgId] || packages.dual

  const WHATSAPP_NUMBER = '0911518568'
  const EMAIL = 'info.healthyliving.help@gmail.com'

  const whatsappMessage = `Hello HEALTHY LIVING Team,\n\nI have completed my payment for the ${pkg.name} package (${pkg.price}).\n\nPlease find my payment proof attached. I would like to receive my access code to begin the Body Reveal Test.\n\nThank you.`

  const emailSubject = `Payment Confirmation - ${pkg.name} Package`
  const emailBody = `Hello HEALTHY LIVING Team,%0D%0A%0D%0AI have completed my payment for the ${pkg.name} package (${pkg.price}).%0D%0A%0D%0APlease find my payment proof attached. I would like to receive my access code to begin the Body Reveal Test.%0D%0A%0D%0AThank you.`

  useEffect(() => {
    document.title = 'Send Proof of Payment | HEALTHY LIVING'
    if (!pkgId) navigate('/quiz')
  }, [pkgId, navigate])

  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f1] text-[#4a7c59] px-4 py-2 rounded-full mb-4">
            <Receipt className="w-4 h-4" />
            <span className="text-sm font-medium">Step 3 of 4</span>
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Confirm Your <span className="text-[#4a7c59]">Payment</span>
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            Send us your proof of payment so we can verify and send you your access code.
          </p>
        </div>

        {/* Package Summary */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-400">Package</p>
              <p className="font-bold text-stone-800">{pkg.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-400">Amount Paid</p>
              <p className="font-bold text-[#4a7c59]">{pkg.price}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Confirmation Buttons */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-stone-800 text-center mb-4">
            Choose how to send your proof:
          </h3>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="border-2 border-[#25D366] hover:bg-[#25D366]/5 cursor-pointer transition-all hover:shadow-lg mb-4">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-stone-900 mb-1">Send via WhatsApp</h4>
                  <p className="text-sm text-stone-500">Quick response. Attach your payment screenshot.</p>
                  <p className="text-sm text-[#128C7E] font-medium mt-1">{WHATSAPP_NUMBER}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-400" />
              </CardContent>
            </Card>
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`}
          >
            <Card className="border-2 border-stone-200 hover:border-[#4a7c59] hover:bg-[#f0f7f1]/50 cursor-pointer transition-all hover:shadow-lg">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-stone-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-stone-900 mb-1">Send via Email</h4>
                  <p className="text-sm text-stone-500">Attach your payment receipt or screenshot.</p>
                  <p className="text-sm text-[#4a7c59] font-medium mt-1">{EMAIL}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-400" />
              </CardContent>
            </Card>
          </a>
        </div>

        {/* What Happens After */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#f0f7f1] to-white mb-8">
          <CardContent className="p-6 md:p-8">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4a7c59]" /> What Happens Next
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-stone-800">We Review Your Payment</p>
                  <p className="text-sm text-stone-500">Our team will verify your payment within a few hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-stone-800">You Receive an Access Code</p>
                  <p className="text-sm text-stone-500">We will send you a one-time access code via WhatsApp or email.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#d4a843] rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-stone-800">Start Your Body Reveal Test</p>
                  <p className="text-sm text-stone-500">Enter your access code and begin your personalized test.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Already have code? */}
        <div className="text-center">
          <p className="text-sm text-stone-500 mb-3">Already received your access code?</p>
          <Button
            onClick={() => navigate('/quiz/access')}
            variant="outline"
            className="border-[#4a7c59] text-[#4a7c59] hover:bg-[#f0f7f1] rounded-full px-8"
          >
            Enter Access Code
          </Button>
        </div>
      </div>
    </div>
  )
}
