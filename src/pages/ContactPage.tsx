import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, Clock, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact | HEALTHY LIVING' }, [])
  return (
    <div>
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-[#f5f0e8] to-[#e8f0e9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a843] font-medium mb-3 tracking-wide uppercase text-sm">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            We're Here For You
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed">
            Have questions about the Body Review Test? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#f0f7f1] rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-[#4a7c59]" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">Call Us</h3>
                <p className="text-stone-500 mb-4">Speak directly with our team</p>
                <p className="text-2xl font-bold text-[#4a7c59]">0911518568</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#fef9e8] rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-[#d4a843]" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">Email Us</h3>
                <p className="text-stone-500 mb-4">We'll respond within 24 hours</p>
                <p className="text-lg font-bold text-[#d4a843] break-all">info.healthyliving.help@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#fdf2f2] rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-[#c45c5c]" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">Response Time</h3>
                <p className="text-stone-500 mb-4">We value your time</p>
                <p className="text-lg font-bold text-stone-800">Within 24-48 hours</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#f0f7f1] rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-7 h-7 text-[#4a7c59]" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">WhatsApp</h3>
                <p className="text-stone-500 mb-4">Chat with us anytime</p>
                <p className="text-lg font-bold text-[#4a7c59]">0911518568</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Contact */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            When Should You Reach Out?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {[
              'Questions about the Body Review Test',
              'Need help understanding your results',
              'Want to learn more about our approach',
              'Technical issues with the test',
              'Interested in partnering with us',
              'Any other inquiries'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-2 h-2 bg-[#4a7c59] rounded-full flex-shrink-0" />
                <span className="text-stone-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
