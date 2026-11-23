import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { MessageSquare, Brain, Award, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function HowItWorksPage() {
  useEffect(() => { document.title = 'How It Works | HEALTHY LIVING' }, [])

const steps = [
  {
    step: '1',
    title: 'Share Your Story',
    icon: MessageSquare,
    desc: 'Answer simple questions about your body, habits, and how you feel. The quiz takes just a few minutes and covers everything from your blood type to your sleep patterns.',
    details: [
      '16 simple steps, one question at a time',
      'Covers your biology, lifestyle, and goals',
      'Takes only 5-7 minutes to complete',
      'All answers are kept strictly confidential'
    ]
  },
  {
    step: '2',
    title: 'We Listen & Analyze',
    icon: Brain,
    desc: 'Our experts carefully review your unique profile, looking at the interplay between your genetics, metabolism, lifestyle, and goals to understand what your body truly needs.',
    details: [
      'Comprehensive metabolic analysis',
      'Personalized body type assessment',
      'Lifestyle pattern evaluation',
      'Expert review within 24-48 hours'
    ]
  },
  {
    step: '3',
    title: 'Receive Your Plan',
    icon: Award,
    desc: 'Get a personalized, natural approach designed specifically for your body and your goals. No generic advice — just recommendations that work for YOU.',
    details: [
      'Customized nutrition guidance',
      'Tailored exercise recommendations',
      'Lifestyle adjustment suggestions',
      'Ongoing support and follow-up'
    ]
  }
]

  return (
    <div>
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-[#f5f0e8] to-[#e8f0e9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a843] font-medium mb-3 tracking-wide uppercase text-sm">The Process</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Three Gentle Steps
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Understanding your body doesn't have to be complicated. We've made it simple.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-10 top-24 w-0.5 h-24 bg-stone-200 hidden lg:block" />
                )}
                
                <div className="grid lg:grid-cols-[120px_1fr] gap-8">
                  {/* Step Number */}
                  <div className="flex lg:flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-[#2d5a3d] rounded-full flex items-center justify-center shadow-lg shadow-[#2d5a3d]/20 flex-shrink-0">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="lg:hidden">
                      <span className="text-3xl font-bold text-stone-200">{item.step}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-[#faf8f5] rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="hidden lg:inline text-5xl font-bold text-stone-200">{item.step}</span>
                      <h3 className="text-2xl font-bold text-stone-900">{item.title}</h3>
                    </div>
                    <p className="text-stone-500 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    <ul className="space-y-3">
                      {item.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4a7c59] flex-shrink-0 mt-0.5" />
                          <span className="text-stone-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the Test Covers */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">What the Test Covers</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Our comprehensive 16-step assessment explores every aspect of your health.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Personal Profile',
              'Body Biology',
              'Metabolism',
              'Sweat & Detox',
              'Sleep Patterns',
              'Daily Rhythm',
              'Body Sensations',
              'Lifestyle Habits',
              'Medical History',
              'Your Goals',
              'Past Attempts',
              'Motivation'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#4a7c59] flex-shrink-0" />
                <span className="font-medium text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d5a3d] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8">
            Your journey to understanding your body begins with a single step.
          </p>
          <Link to="/quiz">
            <Button size="lg" className="bg-white text-[#2d5a3d] hover:bg-[#faf8f5] px-10 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105">
              Take the Test Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
