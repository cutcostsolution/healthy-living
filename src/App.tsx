import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import StoriesPage from './pages/StoriesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import ContactPage from './pages/ContactPage'
import PackageSelectionPage from './pages/PackageSelectionPage'
import PaymentPage from './pages/PaymentPage'
import PaymentConfirmPage from './pages/PaymentConfirmPage'
import AccessCodePage from './pages/AccessCodePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Quiz Flow: Packages → Payment → Confirm → Access Code → Quiz */}
        <Route path="/quiz" element={<PackageSelectionPage />} />
        <Route path="/quiz/payment" element={<PaymentPage />} />
        <Route path="/quiz/confirm" element={<PaymentConfirmPage />} />
        <Route path="/quiz/access" element={<AccessCodePage />} />
        <Route path="/quiz/start" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
