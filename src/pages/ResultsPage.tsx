import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CheckCircle2, Clock, Mail, Phone, Package,
  MessageCircle, Sparkles
} from 'lucide-react'

interface QuizData {
  name: string
  email: string
  phone: string
  selectedPackage: string
}

export default function ResultsPage() {
  const [data, setData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Your Results | HEALTHY LIVING'
    const saved = localStorage.getItem('bodyReviewResults')
    if (saved) {
      setData(JSON.parse(saved))
    }
    setTimeout(() => setLoading(false), 800)
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#f0f7f1] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-8 h-8 text-[#4a7c59]" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Loading...</h2>
        </div>
      </div>
    )
  }

  const pkgName = data?.selectedPackage === 'basic' ? 'Basic Fit' : data?.selectedPackage === 'dual' ? 'Dual Choice' : data?.selectedPackage === 'flexi' ? 'FlexiPick' : 'your selected package'
  const pkgPrice = data?.selectedPackage === 'basic' ? 'N47,350' : data?.selectedPackage === 'dual' ? 'N70,251.30' : data?.selectedPackage === 'flexi' ? 'N113,740' : ''

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f1] text-[#4a7c59] px-4 py-2 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Submission Confirmed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-3">
            Your Solution is <span className="text-[#4a7c59]">On Its Way</span>
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            {data?.name ? `${data.name}, your` : 'Your'} Body Review Test has been received. 
            Your personalized analysis and plan are being prepared by our team.
          </p>
        </div>

        {/* What Happens Next */}
        <Card className="border-0 shadow-lg mb-6 bg-gradient-to-br from-[#f0f7f1] to-white">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-stone-900 mb-6 text-center">What Happens Next</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Review & Preparation</p>
                  <p className="text-sm text-stone-500">Our team is reviewing your test answers and preparing your personalized Body Reveal Test analysis.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Results via Email</p>
                  <p className="text-sm text-stone-500">
                    Your complete results and personalized plan will be sent to{' '}
                    <strong className="text-stone-700">{data?.email || 'your email address'}</strong>.
                    Please check your inbox (and spam folder) within 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Phone Follow-Up</p>
                  <p className="text-sm text-stone-500">
                    We will also reach you on <strong className="text-stone-700">{data?.phone || 'your phone number'}</strong>{' '}
                    to confirm your appointment and answer any questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#d4a843] rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Your Package: {pkgName}</p>
                  <p className="text-sm text-stone-500">
                    Based on your <strong className="text-stone-700">{pkgName}</strong> selection
                    {pkgPrice ? ` (${pkgPrice})` : ''}, your full Body Reveal Test and follow-up support 
                    will be scheduled once payment is confirmed.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Notice */}
        <div className="bg-[#fef9e8] rounded-2xl p-6 mb-6 text-center">
          <Clock className="w-8 h-8 text-[#d4a843] mx-auto mb-3" />
          <p className="text-[#8b6914] font-medium">
            Expected response time: <strong>24-48 hours</strong>
          </p>
          <p className="text-sm text-[#b8956a] mt-1">
            If you do not hear from us within 48 hours, please call us directly.
          </p>
        </div>

        {/* Contact Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6 md:p-8 text-center">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Questions or Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a href="https://whatsapp.com/channel/0029VbCdFl0EquiJRVt8aF2h" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 rounded-full px-6">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Our WhatsApp Channel
                </Button>
              </a>
              <a href="tel:0911518568">
                <Button className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white rounded-full px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 0911518568
                </Button>
              </a>
            </div>
            <p className="text-sm text-stone-400">info.healthyliving.help@gmail.com</p>
          </CardContent>
        </Card>

        {/* One-time reminder */}
        <p className="text-center text-xs text-stone-400">
          Your Body Review Test submission is unique to you. One test per person.
        </p>
      </div>
    </div>
  )
}
