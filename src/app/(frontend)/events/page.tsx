import { getPayload } from 'payload'
import config from '@/payload.config'
import EventsPageClient from './page.client'

export const revalidate = 3600

export default async function EventsPage() {
  const payload = await getPayload({ config })

  const { docs: events } = await payload.find({
    collection: 'events',
    limit: 100, // Adjust limit as needed
    sort: '-eventDate', // Sort by eventDate descending
  })

  return <EventsPageClient events={events} />
}
