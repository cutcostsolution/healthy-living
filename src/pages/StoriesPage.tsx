import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Star, Quote, ArrowRight } from 'lucide-react'

export default function StoriesPage() {
  useEffect(() => { document.title = 'Transformation Stories | HEALTHY LIVING' }, [])

const stories = [
  {
    name: 'Amara K.',
    image: '/transform1.jpg',
    achievement: 'Lost 15kg in 4 months',
    quote: "The Body Review Test changed everything. For the first time, I understood WHY my body was different. The personalized plan actually worked where everything else failed.",
    detail: "Amara had tried every diet under the sun — keto, intermittent fasting, juice cleanses. Nothing worked long-term. After taking the Body Review Test, she discovered her unique metabolism type required a completely different approach. Within 4 months, she had lost 15kg and gained a new understanding of her body."
  },
  {
    name: 'David O.',
    image: '/transform2.jpg',
    achievement: 'Gained energy & vitality',
    quote: "I tried every diet out there. Nothing worked until I discovered what MY body actually needs. The test was truly eye-opening.",
    detail: "David was constantly tired, struggling with afternoon crashes and poor sleep. The Body Review Test revealed his body's unique response patterns to different foods and temperatures. With his personalized plan, David not only lost weight but regained the energy he hadn't felt in years."
  },
  {
    name: 'Ngozi M.',
    image: '/transform3.jpg',
    achievement: 'Found her balance',
    quote: "Finally, a plan that respects my body. I feel stronger, healthier, and more confident than ever. This is the real deal.",
    detail: "Ngozi had always felt like her body was a mystery. Some days she felt great, others she felt bloated and sluggish for no apparent reason. The Body Review Test helped her understand her body's rhythm and reactions. Today, she maintains her ideal weight effortlessly and feels balanced every single day."
  }
]

  return (
    <div>
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-[#f5f0e8] to-[#e8f0e9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a843] font-medium mb-3 tracking-wide uppercase text-sm">Real Stories</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Transformation Journeys
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Real people, real results. When you understand your body, everything changes.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, i) => (
              <div key={i} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#4a7c59]/10 to-[#d4a843]/10 rounded-3xl" />
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="relative z-10 rounded-2xl shadow-xl w-full h-[400px] object-cover"
                  />
                  <div className="absolute top-4 right-4 z-20 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-[#d4a843] fill-[#d4a843]" />
                    ))}
                  </div>
                </div>
                
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <Quote className="w-8 h-8 text-[#d4a843]" />
                    <span className="text-[#d4a843] font-medium uppercase tracking-wide text-sm">{story.achievement}</span>
                  </div>
                  
                  <blockquote className="text-xl text-stone-600 italic leading-relaxed mb-6">
                    "{story.quote}"
                  </blockquote>
                  
                  <p className="text-stone-500 leading-relaxed mb-6">
                    {story.detail}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f0f7f1] rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-[#4a7c59]">{story.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-stone-800">{story.name}</p>
                      <p className="text-sm text-stone-400">Body Review Test Graduate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#faf8f5] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Your Story Could Be Next
          </h2>
          <p className="text-stone-500 mb-8">
            Take the Body Review Test and begin your own transformation journey.
          </p>
          <Link to="/quiz">
            <Button size="lg" className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white px-10 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105">
              Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
