import { GalleryClient } from '@/components/GalleryClient'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Gallery as GalleryType, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Gallery | Robolution - BIT Mesra',
  description:
    'Explore our visual journey through innovation, competitions, and memorable moments at Robolution, the official robotics club of BIT Mesra.',
}

interface TransformedGalleryImage {
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

async function getGalleryImages(): Promise<TransformedGalleryImage[]> {
  try {
    const payload = await getPayload({ config })

    const gallery = await payload.find({
      collection: 'gallery',
      where: {
        active: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    const transformedImages: TransformedGalleryImage[] = gallery.docs.map((item: GalleryType) => {
      const image = typeof item.image === 'number' ? null : (item.image as Media)

      return {
        id: item.id.toString(),
        title: item.title,
        image: image
          ? {
              url: image.url || '',
              alt: image.alt || item.title,
              width: image.width || undefined,
              height: image.height || undefined,
            }
          : {
              url: '',
              alt: item.title,
            },
        category: item.category || undefined,
      }
    })

    return transformedImages
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return <GalleryClient images={images} />
}
