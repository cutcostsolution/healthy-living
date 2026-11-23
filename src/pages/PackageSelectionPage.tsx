import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Shield, Star, ArrowRight, Sparkles, Info, ChevronDown, ChevronUp } from 'lucide-react'

interface PackageOption {
  id: string
  name: string
  price: string
  description: string
  longDescription: string
  features: { text: string; detail: string }[]
  idealFor: string
  icon: typeof Shield
  popular: boolean
  color: string
  whatsIncluded: string[]
}

const packages: PackageOption[] = [
  {
    id: 'basic',
    name: 'Basic Fit',
    price: 'N47,350',
    description: 'Your first step to understanding your body',
    longDescription: 'The Basic Fit package gives you a complete body analysis that reveals the root causes of your weight and health challenges. You will receive a detailed, personalized report based on your unique body type, metabolism, blood group, genotype, and lifestyle habits. This is the foundation you need to finally understand why generic diets have not worked for you.',
    idealFor: 'Anyone who wants to understand their body and start their health journey with clear, personalized insights.',
    icon: Shield,
    popular: false,
    color: 'from-stone-400 to-stone-500',
    features: [
      { text: 'Full Body Reveal Test', detail: 'A comprehensive analysis of your body type, metabolism rate, blood group compatibility, genotype, bone structure, and biological makeup. This test reveals WHY your body behaves the way it does.' },
      { text: 'Personalized Analysis Report', detail: 'A detailed written report explaining your unique body profile, including your metabolism type, detox patterns, sleep analysis, and lifestyle recommendations tailored specifically to YOU.' },
      { text: 'Basic Meal Recommendations', detail: 'General dietary guidance based on your blood group, body type, and cravings patterns. Know which foods support your body and which ones work against it.' },
      { text: 'Email Support', detail: 'Reach out to our team via email for any questions about your report or recommendations. Response within 48 hours.' }
    ],
    whatsIncluded: [
      'Complete 17-question Body Reveal Test',
      'Personalized body analysis report (PDF)',
      'Metabolism type identification',
      'Basic meal plan recommendations',
      'Lifestyle insight summary',
      'Email support for 1 week'
    ]
  },
  {
    id: 'dual',
    name: 'Dual Choice',
    price: 'N70,251.30',
    description: 'Our most popular plan — test + personalized follow-up care',
    longDescription: 'The Dual Choice package includes everything in Basic Fit PLUS two full weeks of dedicated follow-up support. After your Body Reveal Test, we do not just hand you a report and leave you alone. Our team walks with you through a customized meal plan, checks in weekly, and adjusts your plan based on how your body responds. You also get priority WhatsApp support so help is always one message away.',
    idealFor: 'People who want more than just a report — you want a partner in your health journey who guides you step-by-step for the first two critical weeks.',
    icon: Star,
    popular: true,
    color: 'from-[#4a7c59] to-[#2d5a3d]',
    features: [
      { text: 'Everything in Basic Fit', detail: 'You get the full Body Reveal Test, complete personalized analysis report, metabolism assessment, detox pattern analysis, sleep evaluation, and all the foundational insights.' },
      { text: '2-Week Follow-Up Support', detail: 'For two full weeks after your test, our team actively follows up with you via phone or WhatsApp. We monitor your progress, answer questions, and keep you accountable. This is where real change happens.' },
      { text: 'Customized Meal Plan', detail: 'Not generic advice — a meal plan designed specifically for YOUR body type, metabolism, blood group, and food preferences. We tell you exactly what to eat, when to eat it, and why it works for your body.' },
      { text: 'Priority WhatsApp Support', detail: 'Direct access to our team on WhatsApp for quick questions, motivation, and adjustments. No waiting — we respond during business hours.' },
      { text: 'Weekly Check-In Calls', detail: 'A scheduled call each week to review your progress, celebrate wins, troubleshoot challenges, and refine your plan for the week ahead.' }
    ],
    whatsIncluded: [
      'Everything in Basic Fit',
      '2 weeks of dedicated follow-up support',
      'Fully customized meal plan',
      'Weekly 1-on-1 check-in calls',
      'Priority WhatsApp support',
      'Progress tracking & adjustments'
    ]
  },
  {
    id: 'flexi',
    name: 'FlexiPick',
    price: 'N113,740',
    description: 'The complete premium experience with a personal health coach',
    longDescription: 'The FlexiPick package is our most comprehensive offering. You get everything in Dual Choice PLUS a full month of personalized coaching, detailed progress tracking, and 24/7 priority support. This package includes a dedicated health coach who works closely with you, exclusive wellness content, and monthly strategy sessions to ensure you achieve and maintain your goals.',
    idealFor: 'People who are serious about transformation and want the highest level of support, accountability, and personalized guidance for lasting results.',
    icon: Sparkles,
    popular: false,
    color: 'from-[#d4a843] to-[#b8941e]',
    features: [
      { text: 'Everything in Dual Choice', detail: 'Full Body Reveal Test, personalized report, 2-week follow-up, customized meal plan, priority WhatsApp support, and weekly check-in calls — all included.' },
      { text: 'Monthly Check-In Sessions', detail: 'After your initial 2-week intensive support, you continue with monthly deep-dive sessions for a full month. We review long-term progress, adjust strategies, and plan your next phase.' },
      { text: 'Priority Support (24/7)', detail: 'No matter the time, our premium support line is available to you. Whether it is a question at 6 AM or motivation at 10 PM, we are here.' },
      { text: 'Personal Health Coach', detail: 'A dedicated coach assigned specifically to you. They know your file, understand your challenges, and provide tailored guidance throughout your journey.' },
      { text: 'Detailed Progress Tracking', detail: 'Weekly tracking of your weight, energy levels, sleep quality, and adherence to your plan. Visual charts show your progress so you can see how far you have come.' },
      { text: 'Exclusive Wellness Content', detail: 'Access to premium health guides, recipe collections, workout recommendations, and member-only tips crafted specifically for your body type.' }
    ],
    whatsIncluded: [
      'Everything in Dual Choice',
      'Full month of extended support',
      'Dedicated personal health coach',
      'Monthly deep-dive strategy sessions',
      '24/7 priority support access',
      'Detailed weekly progress tracking',
      'Exclusive member wellness content',
      'Long-term maintenance plan'
    ]
  }
]

export default function PackageSelectionPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Choose Your Plan | HEALTHY LIVING'
  }, [])

  const handleContinue = () => {
    if (!selected) return
    localStorage.setItem('selectedPackage', selected)
    navigate('/quiz/payment')
  }

  const selectedPkg = packages.find(p => p.id === selected)

  return (
    <div className="py-12 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#f0f7f1] text-[#4a7c59] px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Step 1 of 4</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Choose Your <span className="text-[#4a7c59]">Plan</span>
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
            Every plan includes our comprehensive Body Reveal Test.
            The difference is in the level of support and follow-up care you receive.
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-2xl mx-auto mb-10 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <Info className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">Payment Required Before Test</p>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">
              To access the Body Reveal Test, you must first select a package below, make payment to our account, 
              and receive a one-time access code from our team. No free tests. No exceptions.
            </p>
          </div>
        </div>

        {/* Packages */}
        <div className="space-y-6 mb-10">
          {packages.map((pkg) => {
            const Icon = pkg.icon
            const isSelected = selected === pkg.id
            const isExpanded = expanded === pkg.id
            return (
              <Card
                key={pkg.id}
                onClick={() => { setSelected(pkg.id); setExpanded(pkg.id) }}
                className={`relative cursor-pointer border-2 transition-all hover:shadow-xl ${
                  isSelected
                    ? 'border-[#4a7c59] shadow-xl'
                    : 'border-stone-100 hover:border-stone-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-[#d4a843] to-[#b8941e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <CardContent className="p-6 md:p-8">
                  {/* Top Row: Icon, Name, Price, Select */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-stone-900">{pkg.name}</h3>
                      <p className="text-sm text-stone-500">{pkg.description}</p>
                    </div>

                    <div className="text-left md:text-right flex-shrink-0">
                      <span className="text-3xl font-bold text-[#4a7c59]">{pkg.price}</span>
                    </div>

                    <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-[#4a7c59] bg-[#4a7c59]' : 'border-stone-200'
                    }`}>
                      {isSelected && <Check className="w-6 h-6 text-white" />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-stone-100">
                      {/* What You Get */}
                      <div className="mb-5">
                        <h4 className="font-bold text-stone-800 mb-2">What This Package Gives You</h4>
                        <p className="text-sm text-stone-600 leading-relaxed">{pkg.longDescription}</p>
                      </div>

                      {/* Ideal For */}
                      <div className="mb-5 bg-[#f0f7f1] rounded-xl p-4">
                        <h4 className="font-bold text-[#2d5a3d] mb-1 text-sm">Best For</h4>
                        <p className="text-sm text-stone-600">{pkg.idealFor}</p>
                      </div>

                      {/* Detailed Features */}
                      <h4 className="font-bold text-stone-800 mb-3">Features Breakdown</h4>
                      <div className="space-y-3 mb-5">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-[#4a7c59] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-stone-800 text-sm">{feature.text}</p>
                              <p className="text-xs text-stone-500 leading-relaxed">{feature.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary List */}
                      <div className="bg-stone-50 rounded-xl p-4">
                        <h4 className="font-bold text-stone-700 text-sm mb-2">Quick Summary</h4>
                        <div className="flex flex-wrap gap-2">
                          {pkg.whatsIncluded.map((item, i) => (
                            <span key={i} className="bg-white text-stone-600 text-xs px-3 py-1.5 rounded-full border border-stone-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Close button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setExpanded(null) }}
                        className="mt-4 flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 mx-auto"
                      >
                        <ChevronUp className="w-4 h-4" /> Show Less
                      </button>
                    </div>
                  )}

                  {!isExpanded && isSelected && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpanded(pkg.id) }}
                      className="mt-4 flex items-center gap-1 text-sm text-[#4a7c59] hover:text-[#2d5a3d] mx-auto font-medium"
                    >
                      <ChevronDown className="w-4 h-4" /> See Full Details
                    </button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selected}
            size="lg"
            className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white px-12 py-7 text-lg rounded-full shadow-xl disabled:opacity-40 transition-all hover:scale-105"
          >
            Continue to Payment <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-stone-400 mt-3">
            {selectedPkg
              ? `You selected: ${selectedPkg.name} (${selectedPkg.price}) — Click "See Full Details" above to read everything included`
              : 'Please select a package to continue'}
          </p>
        </div>
      </div>
    </div>
  )
}
