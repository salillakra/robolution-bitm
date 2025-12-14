'use client'

import React from 'react'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import DarkVeil from '@/components/DarkVeil'
import Image from 'next/image'

// Define types for better type safety
interface Socials {
  linkedin?: string | null
  instagram?: string | null
  facebook?: string | null
  email?: string | null
}

interface Member {
  id: string | number
  name: string
  title: string
  image?: any
  socials?: Socials
  category: string
  year?: string
  order?: number
}

interface TeamPageClientProps {
  members: Member[]
}

const MemberCard = ({ member }: { member: Member }) => {
  if (!member) return null

  // Helper to determine image source
  let imageSrc = ''
  if (member.image && typeof member.image === 'object' && member.image.url) {
    imageSrc = member.image.url
  }

  return (
    <div className="group relative flex flex-col items-center py-6 m-2 md:m-4 w-full max-w-[280px] sm:w-60 md:w-64 h-auto bg-white/5 backdrop-blur-md shadow-xl rounded-3xl transform transition-all duration-300 hover:scale-105 border border-white/10 hover:bg-white/10">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={member.name}
            fill
            className="rounded-full border-2 border-white/20 shadow-lg object-cover scale-95 group-hover:scale-100 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-full border-2 border-white/20 shadow-lg bg-gray-800 flex items-center justify-center text-4xl font-bold text-white/20">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <p className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300 text-center px-2">
        {member.name}
      </p>
      <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300 text-center mb-4 px-2">
        {member.title}
      </p>
      <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
        {member.socials?.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0077B5] transition-colors duration-200 text-2xl"
          >
            <FaLinkedin />
          </a>
        )}
        {member.socials?.instagram && (
          <a
            href={member.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#E4405F] transition-colors duration-200 text-2xl"
          >
            <FaInstagram />
          </a>
        )}
        {member.socials?.facebook && (
          <a
            href={member.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1877F2] transition-colors duration-200 text-2xl"
          >
            <FaFacebook />
          </a>
        )}
        {member.socials?.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="text-gray-400 hover:text-[#FED853] transition-colors duration-200 text-2xl"
          >
            <IoIosMail />
          </a>
        )}
      </div>
    </div>
  )
}

const renderMemberRow = (members: Member[], keyPrefix: string) => {
  if (!members || members.length === 0) return null
  return (
    <div className="flex flex-wrap justify-center items-stretch gap-6 py-4">
      {members.map((member) => (
        <MemberCard key={`${keyPrefix}-${member.id}`} member={member} />
      ))}
    </div>
  )
}

const HeroSection = () => (
  <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden mb-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
    <div className="relative z-10 text-center px-4">
      <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-white/50">
        The Minds Behind Innovation
      </p>
      <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-4 px-4">
        Our Team
      </h2>
      <p className="text-base md:text-2xl text-white/60 max-w-2xl mx-auto px-4">
        Meet the passionate individuals driving Robolution forward
      </p>
    </div>
  </div>
)

// const TimelineSection = () => (
//   <div className="w-full py-20 bg-white/5 mx-auto max-w-6xl rounded-3xl border border-white/10 my-20 p-8 md:p-12 flex flex-col items-center backdrop-blur-md">
//     <div className="text-center mb-12">
//       <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-4">Our Journey</p>
//       <h3 className="text-4xl md:text-5xl font-bold text-white">Evolution of Excellence</h3>
//     </div>
//     <div className="grid md:grid-cols-3 gap-6 w-full">
//       <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center md:text-left">
//         <div className="text-4xl font-bold text-white mb-3">2001</div>
//         <h4 className="text-xl font-bold text-white mb-2">Foundation</h4>
//         <p className="text-white/60">
//           Robolution was established as BIT Mesra&apos;s official robotics club
//         </p>
//       </div>
//       <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center md:text-left">
//         <div className="text-4xl font-bold text-white mb-3">2021</div>
//         <h4 className="text-xl font-bold text-white mb-2">Perfect Score</h4>
//         <p className="text-white/60">Achieved 100/100 in 3D design analysis at ABU ROBOCON</p>
//       </div>
//       <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center md:text-left">
//         <div className="text-4xl font-bold text-white mb-3">2025</div>
//         <h4 className="text-xl font-bold text-white mb-2">Future Forward</h4>
//         <p className="text-white/60">
//           Leading innovation hub, hosting workshops and building future tech
//         </p>
//       </div>
//     </div>
//   </div>
// )

export default function TeamPageClient({ members }: TeamPageClientProps) {
  // Group members according to the new structure
  const grouped = {
    presidents: {
      president: [] as Member[],
      vicePresident: [] as Member[],
      jointPresident: [] as Member[],
    },
    design: [] as Member[],
    management: [] as Member[],
    treasurer: [] as Member[],
    embedded: [] as Member[],
    mechanical: [] as Member[],
    cadInventory: {
      cad: [] as Member[],
      inventoryCoord: [] as Member[],
      inventoryManager: [] as Member[],
    },
    workshopSponsorship: {
      webMaster: [] as Member[],
      workshop: [] as Member[],
      sponsorship: [] as Member[],
    },
    executives: [] as Member[],
  }

  members.forEach((m: Member) => {
    switch (m.category) {
      case 'president':
        grouped.presidents.president.push(m)
        break
      case 'vice_president':
        grouped.presidents.vicePresident.push(m)
        break
      case 'joint_president':
        grouped.presidents.jointPresident.push(m)
        break
      case 'design_head':
        grouped.design.push(m)
        break
      case 'management_head':
        grouped.management.push(m)
        break
      case 'treasurer':
        grouped.treasurer.push(m)
        break
      case 'embedded_head':
        grouped.embedded.push(m)
        break
      case 'mechanical_head':
        grouped.mechanical.push(m)
        break
      case 'cad_lead':
        grouped.cadInventory.cad.push(m)
        break
      case 'inventory_coord':
        grouped.cadInventory.inventoryCoord.push(m)
        break
      case 'inventory_manager':
        grouped.cadInventory.inventoryManager.push(m)
        break
      case 'web_master':
        grouped.workshopSponsorship.webMaster.push(m)
        break
      case 'workshop_coord':
        grouped.workshopSponsorship.workshop.push(m)
        break
      case 'sponsorship_head':
        grouped.workshopSponsorship.sponsorship.push(m)
        break
      case 'executive_member':
        grouped.executives.push(m)
        break
    }
  })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans relative overflow-x-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <DarkVeil />
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-4">Meet The Team</p>
          </div>
        </div>

        <section className="my-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white/90 mb-12 tracking-wide uppercase border-b border-white/10 pb-4">
            PRESIDENTS
          </h2>

          <div className="space-y-12">
            {/* President - Center */}
            {renderMemberRow(grouped.presidents.president, 'president')}

            {/* Vice President and Joint President - Side by side */}
            <div className="flex flex-wrap justify-center gap-6">
              {renderMemberRow(grouped.presidents.vicePresident, 'vice-president')}
              {renderMemberRow(grouped.presidents.jointPresident, 'joint-president')}
            </div>
          </div>
        </section>

        <section className="my-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 tracking-wide uppercase border-b border-white/10 pb-4">
            DESIGN
          </h2>
          {renderMemberRow(grouped.design, 'design')}

          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 mt-16 tracking-wide uppercase border-b border-white/10 pb-4">
            MANAGEMENT
          </h2>
          {renderMemberRow(grouped.management, 'management')}
        </section>

        <section className="my-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 tracking-wide uppercase border-b border-white/10 pb-4">
            TREASURER
          </h2>
          {renderMemberRow(grouped.treasurer, 'treasurer')}

          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 mt-16 tracking-wide uppercase border-b border-white/10 pb-4">
            EMBEDDED LEAD
          </h2>
          {renderMemberRow(grouped.embedded, 'embedded')}
        </section>

        <section className="my-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 tracking-wide uppercase border-b border-white/10 pb-4">
            MECHANICAL LEAD
          </h2>
          {renderMemberRow(grouped.mechanical, 'mechanical')}

          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 mt-16 tracking-wide uppercase border-b border-white/10 pb-4">
            CAD & INVENTORY
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {renderMemberRow(grouped.cadInventory.inventoryCoord, 'inventory-coord')}
            {renderMemberRow(grouped.cadInventory.cad, 'cad-lead')}
            {renderMemberRow(grouped.cadInventory.inventoryManager, 'inventory-manager')}
          </div>
        </section>

        <section className="my-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 tracking-wide uppercase border-b border-white/10 pb-4">
            WORKSHOP & SPONSORSHIP
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {renderMemberRow(grouped.workshopSponsorship.webMaster, 'web-master')}
            {renderMemberRow(grouped.workshopSponsorship.workshop, 'workshop')}
            {renderMemberRow(grouped.workshopSponsorship.sponsorship, 'sponsorship')}
          </div>

          <h2 className="text-3xl font-bold text-center text-white/90 mb-12 mt-16 tracking-wide uppercase border-b border-white/10 pb-4">
            EXECUTIVES
          </h2>
          {renderMemberRow(grouped.executives, 'executives')}
        </section>

        {/* <TimelineSection /> */}
      </div>
    </div>
  )
}
