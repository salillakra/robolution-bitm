'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Camera, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface GalleryImage {
  id: string
  title: string
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  category?: string
}

interface GalleryPreviewProps {
  images: GalleryImage[]
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-white/5 to-black" />
      <div className="absolute top-1/4 right-1/4 w-125 h-125 bg-white/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-125 h-125 bg-white/10 blur-[150px] rounded-full animate-pulse" />

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.4em] text-white/50 font-semibold mb-4">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Gallery</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="h-px w-40 mx-auto bg-linear-to-r from-transparent via-white/40 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            Captured{' '}
            <span className="bg-linear-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
              Moments
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            A glimpse into our journey of innovation, collaboration, and technological excellence
          </motion.p>
        </div>

        {/* Enhanced Gallery Grid with Bento-style Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {images.map((image, index) => {
            // Create varied sizes for more dynamic layout
            const isLarge = index === 0 || index === 3
            const gridClass = isLarge
              ? 'md:col-span-2 md:row-span-2 aspect-square'
              : 'aspect-square'

            return (
              <motion.div
                key={image.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`relative ${gridClass} rounded-3xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer`}
              >
                {/* Image with enhanced effects */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={image.image.url}
                    alt={image.image.alt || image.title}
                    fill
                    className="object-cover"
                    sizes={
                      isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'
                    }
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                {image.category && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-4 z-10"
                  >
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                      {image.category}
                    </span>
                  </motion.div>
                )}

                {/* Hover Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                {/* Multi-layer Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" />
                <div className="absolute inset-0 bg-linear-to-bl from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform translate-x-full group-hover:-translate-x-full delay-100" />

                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button className="gap-3 bg-linear-to-r from-white via-gray-100 to-white text-black shadow-2xl shadow-white/30 hover:shadow-white/50 rounded-full px-12 py-8 text-lg font-bold transition-all duration-500 hover:scale-105 active:scale-95 group relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/50 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="relative z-10 flex items-center gap-3">
                Explore Full Gallery
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Button>
          </Link>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-white/40 text-sm"
          >
            <span className="font-semibold">{images.length}+</span> moments captured
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
