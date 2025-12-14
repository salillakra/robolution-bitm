import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import TeamPageClient from './TeamPageClient'
import type { TeamMember } from '@/payload-types'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Teamspage() {
  const payload = await getPayload({ config })
  const { docs: allMembers } = await payload.find({
    collection: 'team-members',
    limit: 1000,
    sort: 'order',
  })

  // Transform the data to match the client component's expected format
  const members = allMembers.map((doc: TeamMember) => {
    const imageData = typeof doc.image === 'object' && doc.image !== null ? doc.image : null
    return {
      id: doc.id,
      name: doc.name,
      title: doc.role,
      image: imageData ? { url: imageData.url || '', alt: imageData.alt } : null,
      socials: doc.socials,
      category: doc.category,
      order: doc.order ?? undefined,
    }
  })

  return <TeamPageClient members={members} />
}
