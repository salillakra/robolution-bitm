import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import TeamPageClient from './TeamPageClient'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Teamspage() {
  const payload = await getPayload({ config })
  const { docs: allMembers } = await payload.find({
    collection: 'team-members',
    limit: 1000,
    sort: 'order',
  })

  // Transform the data to match the client component's expected format
  const members = allMembers.map((doc: any) => ({
    id: doc.id,
    name: doc.name,
    title: doc.role,
    image: doc.image,
    socials: doc.socials,
    category: doc.category,
    order: doc.order,
  }))

  return <TeamPageClient members={members} />
}
