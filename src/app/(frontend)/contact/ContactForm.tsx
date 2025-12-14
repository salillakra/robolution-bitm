'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface ContactFormProps {
  formId: number
}

export default function ContactForm({ formId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch(`/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData: [
            {
              field: 'name',
              value: formData.name,
            },
            {
              field: 'email',
              value: formData.email,
            },
            {
              field: 'subject',
              value: formData.subject,
            },
            {
              field: 'message',
              value: formData.message,
            },
          ],
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        const error = await response.json()
        setSubmitStatus('error')
        setErrorMessage(error.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('An error occurred. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/70">
          Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/40 h-12 rounded-xl"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/70">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/40 h-12 rounded-xl"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white/70">
          Subject *
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/40 h-12 rounded-xl"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-white/70">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="Tell us more..."
          className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/40 rounded-xl p-4 resize-none focus:outline-none transition-all"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          ✓ Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          ✗ {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 gap-2 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
