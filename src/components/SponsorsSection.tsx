'use client'

import React from 'react'
import Image from 'next/image'
import { LogoLoop, type LogoItem } from '@/components/LogoLoop'

interface Sponsor {
  id: string
  name: string
  logo: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  website?: string
  description?: string
  active: boolean
  order: number
}

interface SponsorsProps {
  sponsors: Sponsor[]
}

export const SponsorsSection: React.FC<SponsorsProps> = ({ sponsors }) => {
  // Filter active sponsors and sort by order
  const activeSponsors = sponsors
    .filter((sponsor) => sponsor.active)
    .sort((a, b) => a.order - b.order)

  // Convert sponsors to LogoItem format
  const logoItems: LogoItem[] = activeSponsors.map((sponsor) => ({
    src: sponsor.logo.url,
    alt: sponsor.name,
    href: sponsor.website,
    title: sponsor.name,
    width: sponsor.logo.width,
    height: sponsor.logo.height,
  }))

  if (logoItems.length === 0) {
    return null
  }

  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden border-y border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm uppercase tracking-[0.4em] text-white/50 font-semibold">
              Our Partners
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Powered by Innovation
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            We&apos;re proud to collaborate with industry leaders who share our vision for advancing
            robotics and technology education.
          </p>
        </div>

        {/* Logo Loop */}
        <div className="mb-20">
          <LogoLoop
            logos={logoItems}
            speed={60}
            direction="left"
            logoHeight={60}
            gap={48}
            pauseOnHover={true}
            fadeOut={true}
            scaleOnHover={true}
            className="mb-8"
            ariaLabel="Our sponsors and partners"
          />
        </div>

        {/* Sponsors Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/30"
                title={sponsor.description || sponsor.name}
              >
                <div className="aspect-video flex items-center justify-center relative">
                  <Image
                    src={sponsor.logo.url}
                    alt={sponsor.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    {sponsor.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Become a Sponsor</h3>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Join us in empowering the next generation of innovators. Partner with Robolution to
              make a lasting impact on robotics education.
            </p>
            <a
              href="mailto:pratyumnis@bitmesra.ac.in?subject=Sponsorship Inquiry"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
