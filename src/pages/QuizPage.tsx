import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronRight, ChevronLeft, CheckCircle2, Loader2, Save, Clock,
  User, MessageSquare, Scale, Fingerprint, Utensils, Coffee,
  Droplets, Leaf, Bed, Wind, Flame, Sun, Moon, Thermometer, Wine, Shield, Target
} from 'lucide-react'
import { hasAccess } from './AccessCodePage'

const quizSteps = [
  { id: 'name', title: 'What should we call you?', icon: User, subtitle: "Let's get acquainted", fields: ['name'] },
  { id: 'contact', title: 'How can we reach you?', icon: MessageSquare, subtitle: 'Stay connected', fields: ['email', 'phone'] },
  { id: 'basics', title: 'Tell us about yourself', icon: User, subtitle: 'The essentials', fields: ['age', 'gender'] },
  { id: 'body', title: 'Your body measurements', icon: Scale, subtitle: 'For accurate analysis', fields: ['weight', 'height'] },
  { id: 'biology', title: 'Your biological makeup', icon: Fingerprint, subtitle: 'What makes you unique', fields: ['bloodGroup', 'genotype'] },
  { id: 'bodyType', title: 'Your body type', icon: User, subtitle: 'Understanding your frame', fields: ['bodyType', 'boneSize'] },
  { id: 'metabolism1', title: 'How do you eat?', icon: Utensils, subtitle: 'Your meal patterns', fields: ['bestMeal', 'mealFrequency'] },
  { id: 'metabolism2', title: 'Your food habits', icon: Coffee, subtitle: 'Portions & cravings', fields: ['portionSize', 'cravings'] },
  { id: 'sweat', title: 'How does your body sweat?', icon: Droplets, subtitle: 'Your cooling system', fields: ['sweatTime', 'sweatArea', 'sweatIntensity'] },
  { id: 'detox', title: 'How do you detoxify?', icon: Leaf, subtitle: 'Cleansing patterns', fields: ['detoxify', 'detoxFrequency'] },
  { id: 'sleep', title: 'Your sleep pattern', icon: Bed, subtitle: 'Rest & recovery', fields: ['wakeTime', 'sleepTime', 'sleepQuality'] },
  { id: 'daily', title: 'Your daily routine', icon: Clock, subtitle: 'Work & exercise', fields: ['eatingSchedule', 'activeWorkHours', 'workingHoursPerDay', 'exerciseFrequency'] },
  { id: 'sensations', title: 'How does your body feel?', icon: Thermometer, subtitle: 'Temperature & weather', fields: ['coldWaterSensation', 'hotWaterSensation', 'weatherPreference', 'bodyTemperature'] },
  { id: 'lifestyle', title: 'Your lifestyle', icon: Wine, subtitle: 'Habits & stress', fields: ['alcohol', 'smoking', 'stressLevel', 'energyLevel', 'waterIntake'] },
  { id: 'medical', title: 'Your health background', icon: Shield, subtitle: 'Medical history', fields: ['surgeries', 'medications', 'familyHistory', 'allergies'] },
  { id: 'weightGoal', title: 'Your weight goal & timeline', icon: Target, subtitle: 'Set your target', fields: ['targetWeight', 'timelineMonths'] },
  { id: 'goals', title: 'What do you want to achieve?', icon: Target, subtitle: 'Your journey begins here', fields: ['goals', 'healthChallenges', 'pastAttempts', 'motivation'] },
]

export default function QuizPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [savedIndicator, setSavedIndicator] = useState(false)

  // Access code check — redirect if no valid access
  useEffect(() => {
    if (!hasAccess()) {
      navigate('/quiz/access', { replace: true })
    }
  }, [navigate])

  const FORMSPREE_FORM_ID = 'mbdplogr'

  const defaultFormData: Record<string, string> = {
    name: '', email: '', phone: '', age: '', gender: '', weight: '', height: '', heightUnit: 'cm',
    bloodGroup: '', genotype: '', bodyType: '', boneSize: '',
    bestMeal: '', mealFrequency: '', portionSize: '', cravings: '',
    sweatTime: '', sweatArea: '', sweatIntensity: '', detoxify: '', detoxFrequency: '',
    wakeTime: '', sleepTime: '', sleepQuality: '', eatingSchedule: '', activeWorkHours: '', workingHoursPerDay: '', exerciseFrequency: '',
    coldWaterSensation: '', hotWaterSensation: '', weatherPreference: '', bodyTemperature: '',
    alcohol: '', smoking: '', stressLevel: '', energyLevel: '', waterIntake: '',
    surgeries: '', medications: '', familyHistory: '', allergies: '',
    targetWeight: '', timelineMonths: '',
    goals: '', healthChallenges: '', pastAttempts: '', motivation: ''
  }

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('bodyReviewQuiz')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setCurrentStep(parseInt(localStorage.getItem('bodyReviewQuizStep') || '0'))
        return { ...defaultFormData, ...parsed }
      } catch { /* ignore */ }
    }
    return defaultFormData
  })

  // Auto-save on change
  useEffect(() => {
    localStorage.setItem('bodyReviewQuiz', JSON.stringify(formData))
    localStorage.setItem('bodyReviewQuizStep', String(currentStep))
    setSavedIndicator(true)
    const timer = setTimeout(() => setSavedIndicator(false), 1500)
    return () => clearTimeout(timer)
  }, [formData, currentStep])

  // Set page title
  useEffect(() => {
    document.title = `Step ${currentStep + 1} of ${quizSteps.length} | Body Review Test`
  }, [currentStep])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSubmitError('')
  }

  const validateStep = () => {
    const step = quizSteps[currentStep]
    for (const field of step.fields) {
      const value = formData[field]?.trim() || ''
      if (!value) return false
      
      // Smart validation
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          setSubmitError('Please enter a valid email address.')
          return false
        }
      }
      if (field === 'phone') {
        const phoneRegex = /^[0-9+\-()\s]{7,15}$/
        if (!phoneRegex.test(value)) {
          setSubmitError('Please enter a valid phone number.')
          return false
        }
      }
      if (field === 'age') {
        const age = parseInt(value)
        if (isNaN(age) || age < 10 || age > 120) {
          setSubmitError('Please enter a valid age between 10 and 120.')
          return false
        }
      }
      if (field === 'weight') {
        const w = parseFloat(value)
        if (isNaN(w) || w < 20 || w > 300) {
          setSubmitError('Please enter a valid weight between 20kg and 300kg.')
          return false
        }
      }
      if (field === 'height') {
        const h = parseFloat(value)
        if (isNaN(h) || h < 50 || h > 250) {
          setSubmitError('Please enter a valid height between 50cm and 250cm.')
          return false
        }
      }
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return
    setSubmitError('')
    setCurrentStep(prev => Math.min(prev + 1, quizSteps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setSubmitError('')
    setCurrentStep(prev => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Body Review Test from ${formData.name}`,
          _replyto: formData.email || 'info.healthyliving.help@gmail.com'
        })
      })

      if (response.ok) {
        // Save results for admin review
        localStorage.setItem('bodyReviewResults', JSON.stringify(formData))
        localStorage.removeItem('bodyReviewQuiz')
        localStorage.removeItem('bodyReviewQuizStep')
        setSubmitted(true)
        // Do NOT redirect to results — user sees confirmation page instead
      } else {
        const data = await response.json()
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / quizSteps.length) * 100

  const renderField = (fieldName: string) => {
    switch (fieldName) {
      case 'name': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Your full name</Label><Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="e.g., Jane Doe" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'email': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Email address</Label><Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your@email.com" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'phone': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Phone number</Label><Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="0911518568" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'age': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How old are you?</Label><Input type="number" value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} placeholder="Your age" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'gender': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Your gender</Label><div className="grid grid-cols-3 gap-3">{['Male', 'Female', 'Other'].map(g => <button key={g} onClick={() => handleInputChange('gender', g)} className={`py-4 px-5 rounded-xl border-2 font-medium transition-all ${formData.gender === g ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300 text-stone-600'}`}>{g}</button>)}</div></div>
      case 'weight': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Current weight (kg)</Label><Input type="number" value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} placeholder="e.g., 70" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'height': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Height</Label><div className="grid grid-cols-3 gap-3"><div className="col-span-2"><Input type="number" value={formData.height} onChange={(e) => handleInputChange('height', e.target.value)} placeholder="e.g., 165 or 5.5" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div><div className="grid grid-cols-2 gap-2"><button onClick={() => handleInputChange('heightUnit', 'cm')} className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all ${formData.heightUnit === 'cm' ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>cm</button><button onClick={() => handleInputChange('heightUnit', 'ft')} className={`py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all ${formData.heightUnit === 'ft' ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>ft</button></div></div><p className="text-xs text-stone-400">Enter in cm (e.g., 165) or feet (e.g., 5.5 for 5ft 6in)</p></div>
      case 'bloodGroup': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Blood group</Label><div className="grid grid-cols-4 gap-3">{['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <button key={bg} onClick={() => handleInputChange('bloodGroup', bg)} className={`py-4 rounded-xl border-2 font-semibold transition-all ${formData.bloodGroup === bg ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{bg}</button>)}</div></div>
      case 'genotype': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Genotype</Label><div className="grid grid-cols-5 gap-3">{['AA', 'AS', 'AC', 'SS', 'SC'].map(gt => <button key={gt} onClick={() => handleInputChange('genotype', gt)} className={`py-4 rounded-xl border-2 font-semibold transition-all ${formData.genotype === gt ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{gt}</button>)}</div></div>
      case 'bodyType': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Which describes your body best?</Label><div className="space-y-3">{[{v:'ectomorph',l:'Slim/Lean',d:'Hard to gain weight'},{v:'mesomorph',l:'Athletic/Muscular',d:'Build muscle easily'},{v:'endomorph',l:'Curvy/Rounded',d:'Gain weight easily'}].map(bt => <button key={bt.v} onClick={() => handleInputChange('bodyType', bt.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.bodyType === bt.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.bodyType === bt.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.bodyType === bt.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><div><div className="font-medium text-stone-800">{bt.l}</div><div className="text-sm text-stone-500">{bt.d}</div></div></button>)}</div></div>
      case 'boneSize': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Wrap your fingers around your wrist</Label><div className="space-y-3">{[{v:'small',l:'Small',d:'Fingers overlap'},{v:'medium',l:'Medium',d:'Fingers just touch'},{v:'large',l:'Large',d:'Fingers don\'t touch'}].map(bs => <button key={bs.v} onClick={() => handleInputChange('boneSize', bs.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.boneSize === bs.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.boneSize === bs.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.boneSize === bs.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><div><div className="font-medium text-stone-800">{bs.l}</div><div className="text-sm text-stone-500">{bs.d}</div></div></button>)}</div></div>
      case 'bestMeal': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Which meal do you enjoy most?</Label><div className="grid grid-cols-2 gap-3">{[{v:'breakfast',l:'Breakfast',icon:Coffee},{v:'lunch',l:'Lunch',icon:Sun},{v:'dinner',l:'Dinner',icon:Moon},{v:'snacks',l:'Snacks',icon:Utensils}].map(m => <button key={m.v} onClick={() => handleInputChange('bestMeal', m.v)} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${formData.bestMeal === m.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><m.icon className="w-5 h-5 text-[#4a7c59]" /><span className="font-medium text-stone-800">{m.l}</span></button>)}</div></div>
      case 'mealFrequency': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How many meals per day?</Label><div className="grid grid-cols-4 gap-3">{['2', '3', '4', '5+'].map(f => <button key={f} onClick={() => handleInputChange('mealFrequency', f)} className={`py-4 rounded-xl border-2 font-semibold transition-all ${formData.mealFrequency === f ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{f}</button>)}</div></div>
      case 'portionSize': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Typical portion size</Label><div className="space-y-3">{[{v:'small',l:'Small portions'},{v:'medium',l:'Medium portions'},{v:'large',l:'Large portions'}].map(ps => <button key={ps.v} onClick={() => handleInputChange('portionSize', ps.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.portionSize === ps.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.portionSize === ps.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.portionSize === ps.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-medium text-stone-800">{ps.l}</span></button>)}</div></div>
      case 'cravings': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">What do you crave most?</Label><Input value={formData.cravings} onChange={(e) => handleInputChange('cravings', e.target.value)} placeholder="e.g., Sweet, salty, carbs, fried foods" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'sweatTime': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">When do you sweat most?</Label><div className="space-y-3">{[{v:'exercise',l:'During exercise'},{v:'night',l:'At night while sleeping'},{v:'eating',l:'After eating'},{v:'hot',l:'In hot weather'}].map(st => <button key={st.v} onClick={() => handleInputChange('sweatTime', st.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.sweatTime === st.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sweatTime === st.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.sweatTime === st.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-medium text-stone-800">{st.l}</span></button>)}</div></div>
      case 'sweatArea': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Where does sweat come from most?</Label><Input value={formData.sweatArea} onChange={(e) => handleInputChange('sweatArea', e.target.value)} placeholder="e.g., Armpits, forehead, back, palms" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'sweatIntensity': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How intense is your sweating?</Label><div className="space-y-3">{[{v:'light',l:'Light',d:'Barely noticeable'},{v:'moderate',l:'Moderate',d:'Visible dampness'},{v:'heavy',l:'Heavy',d:'Dripping, clothes get wet'}].map(si => <button key={si.v} onClick={() => handleInputChange('sweatIntensity', si.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.sweatIntensity === si.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sweatIntensity === si.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.sweatIntensity === si.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><div><div className="font-medium text-stone-800">{si.l}</div><div className="text-sm text-stone-500">{si.d}</div></div></button>)}</div></div>
      case 'detoxify': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How do you detoxify?</Label><div className="space-y-3">{[{v:'water',l:'Drinking lots of water'},{v:'exercise',l:'Exercise / Sweating'},{v:'herbs',l:'Herbal remedies'},{v:'none',l:'I don\'t actively detoxify'}].map(dt => <button key={dt.v} onClick={() => handleInputChange('detoxify', dt.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.detoxify === dt.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.detoxify === dt.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.detoxify === dt.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-medium text-stone-800">{dt.l}</span></button>)}</div></div>
      case 'detoxFrequency': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How often do you detox?</Label><div className="grid grid-cols-4 gap-3">{['Daily', 'Weekly', 'Monthly', 'Rarely'].map(df => <button key={df} onClick={() => handleInputChange('detoxFrequency', df)} className={`py-4 rounded-xl border-2 font-medium transition-all ${formData.detoxFrequency === df ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{df}</button>)}</div></div>
      case 'wakeTime': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">What time do you usually wake up?</Label><Input value={formData.wakeTime} onChange={(e) => handleInputChange('wakeTime', e.target.value)} placeholder="e.g., 6:00 AM" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'sleepTime': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">What time do you usually sleep?</Label><Input value={formData.sleepTime} onChange={(e) => handleInputChange('sleepTime', e.target.value)} placeholder="e.g., 10:30 PM" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'sleepQuality': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How would you rate your sleep quality?</Label><div className="grid grid-cols-4 gap-3">{['Poor', 'Fair', 'Good', 'Excellent'].map(sq => <button key={sq} onClick={() => handleInputChange('sleepQuality', sq)} className={`py-4 rounded-xl border-2 font-medium transition-all ${formData.sleepQuality === sq ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{sq}</button>)}</div></div>
      case 'eatingSchedule': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Describe your typical eating schedule</Label><Input value={formData.eatingSchedule} onChange={(e) => handleInputChange('eatingSchedule', e.target.value)} placeholder="e.g., 7am breakfast, 1pm lunch, 7pm dinner" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'activeWorkHours': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Your active work hours</Label><Input value={formData.activeWorkHours} onChange={(e) => handleInputChange('activeWorkHours', e.target.value)} placeholder="e.g., 9am - 5pm" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'workingHoursPerDay': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Working hours per day</Label><div className="grid grid-cols-5 gap-3">{['4', '6', '8', '10', '12+'].map(wh => <button key={wh} onClick={() => handleInputChange('workingHoursPerDay', wh)} className={`py-4 rounded-xl border-2 font-semibold transition-all ${formData.workingHoursPerDay === wh ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{wh}h</button>)}</div></div>
      case 'exerciseFrequency': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How often do you exercise?</Label><div className="space-y-3">{[{v:'never',l:'Never'},{v:'1-2x',l:'1-2 times a week'},{v:'3-4x',l:'3-4 times a week'},{v:'daily',l:'Daily'}].map(ef => <button key={ef.v} onClick={() => handleInputChange('exerciseFrequency', ef.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.exerciseFrequency === ef.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.exerciseFrequency === ef.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.exerciseFrequency === ef.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-medium text-stone-800">{ef.l}</span></button>)}</div></div>
      case 'coldWaterSensation': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How do you feel about cold water for bathing?</Label><div className="space-y-3">{[{v:'love',l:'Love it',d:'Very refreshing'},{v:'tolerate',l:'Can tolerate it'},{v:'dislike',l:'Dislike it'},{v:'hate',l:'Can\'t stand it'}].map(cw => <button key={cw.v} onClick={() => handleInputChange('coldWaterSensation', cw.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.coldWaterSensation === cw.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.coldWaterSensation === cw.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.coldWaterSensation === cw.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><div><div className="font-medium text-stone-800">{cw.l}</div><div className="text-sm text-stone-500">{cw.d}</div></div></button>)}</div></div>
      case 'hotWaterSensation': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How do you feel about hot water for bathing?</Label><div className="space-y-3">{[{v:'love',l:'Love it',d:'Very soothing'},{v:'tolerate',l:'Can tolerate it'},{v:'dislike',l:'Dislike it'},{v:'hate',l:'Can\'t stand it'}].map(hw => <button key={hw.v} onClick={() => handleInputChange('hotWaterSensation', hw.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.hotWaterSensation === hw.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.hotWaterSensation === hw.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.hotWaterSensation === hw.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><div><div className="font-medium text-stone-800">{hw.l}</div><div className="text-sm text-stone-500">{hw.d}</div></div></button>)}</div></div>
      case 'weatherPreference': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Preferred weather?</Label><div className="grid grid-cols-3 gap-3">{[{v:'hot',l:'Hot',icon:Flame},{v:'cold',l:'Cold',icon:Wind},{v:'moderate',l:'Moderate',icon:Sun}].map(wp => <button key={wp.v} onClick={() => handleInputChange('weatherPreference', wp.v)} className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${formData.weatherPreference === wp.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><wp.icon className="w-6 h-6 text-[#4a7c59]" /><span className="font-medium text-stone-800">{wp.l}</span></button>)}</div></div>
      case 'bodyTemperature': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Your body temperature tendency</Label><div className="space-y-3">{[{v:'always-hot',l:'Always feel hot'},{v:'normal',l:'Usually comfortable'},{v:'always-cold',l:'Always feel cold'}].map(bt => <button key={bt.v} onClick={() => handleInputChange('bodyTemperature', bt.v)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${formData.bodyTemperature === bt.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.bodyTemperature === bt.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.bodyTemperature === bt.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-medium text-stone-800">{bt.l}</span></button>)}</div></div>
      case 'alcohol': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Alcohol consumption</Label><div className="grid grid-cols-4 gap-3">{['Never', 'Rarely', 'Weekly', 'Daily'].map(a => <button key={a} onClick={() => handleInputChange('alcohol', a)} className={`py-4 rounded-xl border-2 font-medium transition-all ${formData.alcohol === a ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{a}</button>)}</div></div>
      case 'smoking': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Smoking habit</Label><div className="grid grid-cols-3 gap-3">{['Non-smoker', 'Occasional', 'Regular'].map(s => <button key={s} onClick={() => handleInputChange('smoking', s)} className={`py-4 rounded-xl border-2 font-medium transition-all ${formData.smoking === s ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{s}</button>)}</div></div>
      case 'stressLevel': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Stress level (1-5)</Label><div className="flex gap-3">{[1,2,3,4,5].map(level => <button key={level} onClick={() => handleInputChange('stressLevel', String(level))} className={`flex-1 py-5 rounded-xl border-2 transition-all font-bold text-xl ${formData.stressLevel === String(level) ? 'border-red-400 bg-red-50 text-red-500' : 'border-stone-200 hover:border-red-200'}`}>{level}</button>)}</div><div className="flex justify-between text-sm text-stone-400"><span>Relaxed</span><span>Stressed</span></div></div>
      case 'energyLevel': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Energy level throughout the day (1-5)</Label><div className="flex gap-3">{[1,2,3,4,5].map(level => <button key={level} onClick={() => handleInputChange('energyLevel', String(level))} className={`flex-1 py-5 rounded-xl border-2 transition-all font-bold text-xl ${formData.energyLevel === String(level) ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#4a7c59]' : 'border-stone-200 hover:border-[#4a7c59]/30'}`}>{level}</button>)}</div><div className="flex justify-between text-sm text-stone-400"><span>Low</span><span>High</span></div></div>
      case 'waterIntake': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Daily water intake</Label><div className="grid grid-cols-4 gap-3">{['<1L', '1-2L', '2-3L', '3L+'].map(wi => <button key={wi} onClick={() => handleInputChange('waterIntake', wi)} className={`py-4 rounded-xl border-2 font-medium transition-all ${formData.waterIntake === wi ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{wi}</button>)}</div></div>
      case 'surgeries': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Any previous surgeries?</Label><Textarea value={formData.surgeries} onChange={(e) => handleInputChange('surgeries', e.target.value)} placeholder="List any surgeries or type 'None'" className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'medications': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Current medications?</Label><Textarea value={formData.medications} onChange={(e) => handleInputChange('medications', e.target.value)} placeholder="List medications or type 'None'" className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'familyHistory': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Family medical history</Label><Textarea value={formData.familyHistory} onChange={(e) => handleInputChange('familyHistory', e.target.value)} placeholder="e.g., Diabetes, hypertension, obesity..." className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'allergies': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Known allergies?</Label><Textarea value={formData.allergies} onChange={(e) => handleInputChange('allergies', e.target.value)} placeholder="Food, drug, or environmental allergies, or type 'None'" className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'selectedPackage': return <div className="space-y-4"><Label className="text-stone-700 font-medium text-lg">Which package would you like?</Label><div className="space-y-3">{[{v:'basic',l:'Basic Fit',p:'N47,350',d:'Full Body Reveal Test + Personalized Analysis Report'},{v:'dual',l:'Dual Choice',p:'N70,251.30',d:'Full Test + 2-Week Follow-Up + Meal Plan'},{v:'flexi',l:'FlexiPick',p:'N113,740',d:'Everything in Dual + Monthly Check-Ins + Priority Support'}].map(pkg => <button key={pkg.v} onClick={() => handleInputChange('selectedPackage', pkg.v)} className={`w-full text-left p-5 rounded-xl border-2 transition-all ${formData.selectedPackage === pkg.v ? 'border-[#4a7c59] bg-[#f0f7f1]' : 'border-stone-200 hover:border-stone-300'}`}><div className="flex items-center justify-between mb-1"><div className="flex items-center gap-3"><div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.selectedPackage === pkg.v ? 'border-[#4a7c59]' : 'border-stone-300'}`}>{formData.selectedPackage === pkg.v && <div className="w-2.5 h-2.5 rounded-full bg-[#4a7c59]" />}</div><span className="font-bold text-stone-800">{pkg.l}</span></div><span className="font-bold text-[#4a7c59]">{pkg.p}</span></div><p className="text-sm text-stone-500 ml-8">{pkg.d}</p></button>)}</div></div>
      case 'targetWeight': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Your target weight (kg)</Label><Input type="number" value={formData.targetWeight} onChange={(e) => handleInputChange('targetWeight', e.target.value)} placeholder="e.g., 60" className="h-14 text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'timelineMonths': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">How many months to reach your goal?</Label><div className="grid grid-cols-6 gap-3">{['1', '2', '3', '4', '5', '6'].map(m => <button key={m} onClick={() => handleInputChange('timelineMonths', m)} className={`py-4 rounded-xl border-2 font-semibold transition-all ${formData.timelineMonths === m ? 'border-[#4a7c59] bg-[#f0f7f1] text-[#2d5a3d]' : 'border-stone-200 hover:border-stone-300'}`}>{m}m</button>)}</div></div>
      case 'goals': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">What do you want to achieve?</Label><Textarea value={formData.goals} onChange={(e) => handleInputChange('goals', e.target.value)} placeholder="Weight loss target, body composition goals, better metabolism..." className="min-h-[120px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'healthChallenges': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Any health challenges?</Label><Textarea value={formData.healthChallenges} onChange={(e) => handleInputChange('healthChallenges', e.target.value)} placeholder="Health conditions, pains, or concerns..." className="min-h-[120px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'pastAttempts': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">Past weight loss attempts</Label><Textarea value={formData.pastAttempts} onChange={(e) => handleInputChange('pastAttempts', e.target.value)} placeholder="What have you tried? What worked or didn't?" className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      case 'motivation': return <div className="space-y-3"><Label className="text-stone-700 font-medium text-lg">What motivates you to change?</Label><Textarea value={formData.motivation} onChange={(e) => handleInputChange('motivation', e.target.value)} placeholder="What drives you to take this step now?" className="min-h-[100px] text-lg border-stone-200 rounded-xl focus:border-[#4a7c59]" /></div>
      default: return null
    }
  }

  if (submitted) {
    const savedPkg = localStorage.getItem('selectedPackage') || ''
    const pkgName = savedPkg === 'basic' ? 'Basic Fit' : savedPkg === 'dual' ? 'Dual Choice' : savedPkg === 'flexi' ? 'FlexiPick' : 'your selected package'
    const pkgPrice = savedPkg === 'basic' ? 'N47,350' : savedPkg === 'dual' ? 'N70,251.30' : savedPkg === 'flexi' ? 'N113,740' : ''
    return (
      <div className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4a7c59] to-[#d4a843] rounded-full flex items-center justify-center mx-auto mb-8 breathe">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Thank You{formData.name ? `, ${formData.name}` : ''}!</h2>
            <p className="text-stone-500 mb-6 max-w-md mx-auto leading-relaxed">
              Your Body Review Test has been submitted successfully. Your personalized solution is just a step away.
            </p>

            <div className="bg-[#f0f7f1] rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-bold text-[#2d5a3d] mb-3 text-center">What Happens Next</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p className="text-stone-600 text-sm">Our team will review your test and prepare your personalized body analysis.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p className="text-stone-600 text-sm">You will receive your results and next steps via email at <strong className="text-stone-800">{formData.email || 'the email you provided'}</strong> or phone at <strong className="text-stone-800">{formData.phone || 'the number you provided'}</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#4a7c59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p className="text-stone-600 text-sm">Based on your <strong className="text-stone-800">{pkgName}</strong> package{pkgPrice ? ` (${pkgPrice})` : ''}, we will schedule your full Body Reveal Test and begin your transformation journey.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#fef9e8] rounded-xl p-4 mb-6 max-w-md mx-auto">
              <p className="text-[#8b6914] font-medium text-sm">
                Please expect to hear from us within <strong>24-48 hours</strong>.
              </p>
            </div>

            <div className="border-t border-stone-100 pt-6 max-w-md mx-auto">
              <p className="text-sm text-stone-500 mb-3">Need help or have questions?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://whatsapp.com/channel/0029VbCdFl0EquiJRVt8aF2h" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 rounded-full px-6">
                    Join Our WhatsApp
                  </Button>
                </a>
                <a href="tel:0911518568">
                  <Button className="bg-[#2d5a3d] hover:bg-[#1e3d28] text-white rounded-full px-6">
                    Call Us: 0911518568
                  </Button>
                </a>
              </div>
              <p className="text-xs text-stone-400 mt-3">info.healthyliving.help@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4a7c59] to-[#d4a843] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            {savedIndicator && (
              <div className="flex items-center gap-1 text-xs text-[#4a7c59] flex-shrink-0">
                <Save className="w-3 h-3" /><span className="font-medium">Saved</span>
              </div>
            )}
          </div>
          <div className="flex justify-between text-sm text-stone-400">
            <span>Step {currentStep + 1} of {quizSteps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* One-time warning - only show on first step */}
        {currentStep === 0 && (
          <div className="mb-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <p className="text-base font-bold text-amber-800">Please read before starting</p>
              <p className="text-sm text-amber-700 mt-2 leading-relaxed">This Body Review Test can only be taken <strong className="text-amber-900">once</strong>. Your answers are used to create a personalized body analysis specifically for you. Please answer every question as <strong className="text-amber-900">accurately and honestly</strong> as possible. Take your time — there is no rush. Ensure every detail is correct before submitting.</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="slide-in-right" key={currentStep}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#f0f7f1] rounded-2xl mb-4">
              {(() => { const Icon = quizSteps[currentStep].icon; return <Icon className="w-7 h-7 text-[#4a7c59]" /> })()}
            </div>
            <p className="text-[#d4a843] text-sm font-medium mb-1">{quizSteps[currentStep].subtitle}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">{quizSteps[currentStep].title}</h2>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-5">
                {quizSteps[currentStep].fields.map(field => <div key={field}>{renderField(field)}</div>)}
              </div>

              {submitError && <div className="mt-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">{submitError}</div>}

              <div className="mt-8 flex gap-3">
                {currentStep > 0 && <Button onClick={handlePrev} variant="outline" className="h-14 px-6 border-2 border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl"><ChevronLeft className="w-4 h-4" /></Button>}
                {currentStep < quizSteps.length - 1 ? (
                  <Button onClick={handleNext} className="flex-1 h-14 bg-[#2d5a3d] hover:bg-[#1e3d28] text-white rounded-xl shadow-lg">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 h-14 bg-gradient-to-r from-[#2d5a3d] to-[#4a7c59] hover:from-[#1e3d28] hover:to-[#2d5a3d] text-white rounded-xl shadow-lg disabled:opacity-70">
                    {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</> : <><CheckCircle2 className="w-5 h-5 mr-2" />Submit My Body Review</>}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-1.5 mt-6">
            {quizSteps.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'bg-[#4a7c59] w-6' : i < currentStep ? 'bg-[#4a7c59]/40 w-1.5' : 'bg-stone-200 w-1.5'}`} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
