import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Fingerprint, Heart, MessageCircle } from 'lucide-react'

export default function HomePage() {
  useEffect(() => { document.title = 'HEALTHY LIVING | Body Review Test' }, [])
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] via-[#faf8f5] to-[#e8f0e9]" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#4a7c59]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4a843]/8 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/70 text-[#4a7c59] px-4 py-2 rounded-full mb-8 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Discover What Makes You Unique</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 mb-6 leading-[1.05]">
                Your Body Has a <span className="text-[#4a7c59]">Story</span> to Tell
              </h1>
              
              <p className="text-lg text-stone-500 mb-6 leading-relaxed max-w-lg">
                Every body is beautifully unique. The Body Review Test helps us understand 
                your individual metabolism so we can create a plan that truly works for <em className="text-[#4a7c59] font-medium not-italic">you</em>.
              </p>

              {/* Process reminder */}
              <div className="mb-8 bg-white/60 backdrop-blur rounded-xl p-4 border border-stone-200/50 max-w-lg">
                <p className="text-sm text-stone-600 leading-relaxed">
                  <strong className="text-stone-800">How it works:</strong> Choose your plan → Make payment → Receive access code → Take your test → Get results.
                </p>
              </div>

              <div className="space-y-3">
                <Link to="/quiz">
                  <Button size="lg" className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white px-10 py-7 text-lg rounded-full shadow-xl shadow-[#2d5a3d]/20 transition-all hover:scale-105">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Choose Your Plan
                  </Button>
                </Link>
                <p className="text-sm text-[#d4a843] font-medium ml-4">3 packages from N47,350</p>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center relative">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#4a7c59]/10 to-[#d4a843]/10 rounded-[2.5rem] transform rotate-2" />
                <img src="/logo.jpg" alt="Healthy Living" className="relative z-10 rounded-[2rem] shadow-2xl max-w-sm w-full bg-white p-4" />
                
                <div className="absolute -top-4 -right-4 bg-white shadow-xl p-4 rounded-2xl float-animation z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f0f7f1] rounded-full flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-[#4a7c59]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">Unique to You</p>
                      <p className="text-xs text-stone-400">Personalized analysis</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white shadow-xl p-4 rounded-2xl float-animation-delayed z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#fef9e8] rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#d4a843]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">Natural Solutions</p>
                      <p className="text-xs text-stone-400">Gentle on your body</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Begin Your Journey</h2>
            <p className="text-stone-500">Everything you need to understand your body</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Why Take the Test?', desc: 'Discover why understanding your unique metabolism is the key to lasting health.', link: '/about', btn: 'Learn More' },
              { title: 'Real Stories', desc: 'See how the Body Review Test has transformed lives.', link: '/stories', btn: 'Read Stories' },
              { title: 'How It Works', desc: 'A simple 3-step process to unlock your body\'s secrets.', link: '/how-it-works', btn: 'See How' },
            ].map((card, i) => (
              <div key={i} className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-stone-800 mb-3">{card.title}</h3>
                <p className="text-stone-500 mb-6 leading-relaxed">{card.desc}</p>
                <Link to={card.link} className="text-[#4a7c59] font-medium hover:text-[#2d5a3d] transition-colors inline-flex items-center gap-1">
                  {card.btn} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Channel Section */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/healthy-family.jpg"
                alt="Happy healthy family of all ages"
                className="rounded-3xl shadow-2xl w-full object-cover max-h-[400px]"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#128C7E] px-4 py-2 rounded-full mb-6">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Join Our Community</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4 leading-tight">
                Healthy Living Tips for <span className="text-[#4a7c59]">Everyone</span>
              </h2>
              
              <p className="text-stone-500 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                From our elders to our little ones, health is a family journey. 
                Join our WhatsApp channel for daily tips, motivation, and a community 
                that celebrates wellness at every age.
              </p>
              
              <a
                href="https://whatsapp.com/channel/0029VbCdFl0EquiJRVt8aF2h"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-7 text-lg rounded-full shadow-xl shadow-[#25D366]/20 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Our WhatsApp Channel
                </Button>
              </a>
              
              <p className="text-sm text-stone-400 mt-4">
                Free daily health tips for the whole family
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
