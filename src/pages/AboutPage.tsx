import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Target, Heart, ArrowRight, Leaf, Fingerprint, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  useEffect(() => { document.title = 'About | HEALTHY LIVING' }, [])
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-[#f5f0e8] to-[#e8f0e9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a843] font-medium mb-3 tracking-wide uppercase text-sm">About the Test</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            Because One Size <em className="text-[#4a7c59] not-italic">Never</em> Fits All
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Your friend might thrive on a diet that leaves you feeling drained. 
            Your colleague may lose weight effortlessly while you struggle. 
            The difference? Your unique metabolism.
          </p>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Understand Your Metabolism', desc: 'Discover how your body uniquely processes food, burns energy, and responds to different stimuli. No two metabolisms are the same.', color: 'bg-[#f0f7f1]', iconColor: 'text-[#4a7c59]' },
              { icon: Target, title: 'Get Personalized Solutions', desc: 'Stop guessing. Receive recommendations tailored specifically to your body type, lifestyle, and goals.', color: 'bg-[#fef9e8]', iconColor: 'text-[#d4a843]' },
              { icon: Heart, title: 'Achieve Lasting Results', desc: 'When you work with your body instead of against it, the results are sustainable, natural, and long-term.', color: 'bg-[#fdf2f2]', iconColor: 'text-[#c45c5c]' }
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes You Unique */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#d4a843] font-medium mb-3 tracking-wide uppercase text-sm">The Science</p>
            <h2 className="text-4xl font-bold text-stone-900 mb-6">
              What Makes Your Body <em className="text-[#4a7c59] not-italic">Unique</em>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Fingerprint, title: 'Genetic Blueprint', desc: 'Your blood group, genotype, and body type create a one-of-a-kind biological fingerprint that determines how you process nutrients, respond to exercise, and manage weight.' },
              { icon: Leaf, title: 'Metabolic Signature', desc: 'The way you sweat, your reaction to hot and cold, your sleep patterns, and your energy levels all combine to create a unique metabolic signature.' },
              { icon: Brain, title: 'Lifestyle Factors', desc: 'Your daily routine, stress levels, eating habits, and physical activity all interact with your biology in ways that are completely individual to you.' },
              { icon: TrendingUp, title: 'Personal History', desc: 'Past weight loss attempts, medical history, and family genetics all play a role in shaping what will work for YOUR body going forward.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-[#f0f7f1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#4a7c59]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d5a3d] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Discover Your Body's Truth?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Take the first step towards understanding the beautiful, complex system that is your body.
          </p>
          <Link to="/quiz">
            <Button size="lg" className="bg-white text-[#2d5a3d] hover:bg-[#faf8f5] px-10 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105">
              Take the Body Review Test <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
