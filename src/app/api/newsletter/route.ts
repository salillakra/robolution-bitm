import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'newsletter',
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 400 },
      )
    }

    // Create new subscription
    await payload.create({
      collection: 'newsletter',
      data: {
        email: email.toLowerCase(),
        active: true,
        subscribedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ message: 'Successfully subscribed to newsletter' }, { status: 200 })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
