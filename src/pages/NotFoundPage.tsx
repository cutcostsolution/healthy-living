import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-[#2d5a3d] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Page Not Found</h2>
        <p className="text-stone-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white rounded-full px-6">
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </Link>
          <Button onClick={() => window.history.back()} variant="outline" className="border-stone-300 text-stone-600 rounded-full px-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
