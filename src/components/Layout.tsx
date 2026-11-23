import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/stories', label: 'Stories' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Elegant Top Bar */}
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Row - Centered and Beautiful */}
          <div className="flex justify-center py-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <img 
                  src="/logo.jpg" 
                  alt="Healthy Living" 
                  className="h-16 w-auto rounded-2xl shadow-md group-hover:shadow-lg transition-shadow"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-stone-900 leading-tight tracking-tight">HEALTHY LIVING</h1>
                <p className="text-xs text-[#4a7c59] tracking-widest uppercase font-medium">Body Review Test</p>
              </div>
            </Link>
          </div>

          {/* Navigation Row */}
          <nav className="flex items-center justify-center pb-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-[#faf8f5] rounded-full p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? 'bg-[#2d5a3d] text-white shadow-md'
                      : 'text-stone-600 hover:text-[#2d5a3d] hover:bg-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quiz"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  location.pathname === '/quiz'
                    ? 'bg-[#d4a843] text-white shadow-md'
                    : 'bg-[#d4a843] text-white hover:bg-[#c49a3a] shadow-md hover:shadow-lg'
                }`}
              >
                Take the Test
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-[#2d5a3d]"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden pb-4">
              <div className="bg-[#faf8f5] rounded-2xl p-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.to
                        ? 'bg-[#2d5a3d] text-white'
                        : 'text-stone-600 hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/quiz"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium bg-[#d4a843] text-white text-center"
                >
                  Take the Test
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.jpg" alt="Healthy Living" className="h-10 w-auto rounded-xl" />
                <span className="text-lg font-bold text-stone-300">HEALTHY LIVING</span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Helping you understand your unique body for a healthier, happier life.
              </p>
            </div>
            <div>
              <h4 className="text-stone-300 font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className="block text-sm text-stone-500 hover:text-stone-300 transition-colors">{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-stone-300 font-semibold mb-4">Contact</h4>
              <p className="text-sm text-stone-500">0911518568</p>
              <p className="text-sm text-stone-500">info.healthyliving.help@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center">
            <p className="text-sm text-stone-600">© 2024 Healthy Living. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
