import { getPayload } from 'payload'
import config from '@/payload.config'
import HomeClient from '@/components/HomeClient'
import type { Sponsor, Media, Gallery as GalleryType } from '@/payload-types'

interface TransformedSponsor {
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

async function getSponsors(): Promise<TransformedSponsor[]> {
  try {
    const payload = await getPayload({ config })

    const sponsors = await payload.find({
      collection: 'sponsors',
      where: {
        active: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    // Transform the data to match the expected format
    const transformedSponsors: TransformedSponsor[] = sponsors.docs.map((sponsor: Sponsor) => {
      const logo = typeof sponsor.logo === 'number' ? null : (sponsor.logo as Media)

      return {
        id: sponsor.id.toString(),
        name: sponsor.name,
        logo: logo
          ? {
              url: logo.url || '',
              alt: logo.alt || sponsor.name,
              width: logo.width || undefined,
              height: logo.height || undefined,
            }
          : {
              url: '',
              alt: sponsor.name,
            },
        website: sponsor.website || undefined,
        description: sponsor.description || undefined,
        active: sponsor.active ?? true,
        order: sponsor.order ?? 0,
      }
    })

    return transformedSponsors
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }
}

async function getGalleryImages(): Promise<TransformedGalleryImage[]> {
  try {
    const payload = await getPayload({ config })

    // Get featured gallery images for homepage preview
    const gallery = await payload.find({
      collection: 'gallery',
      where: {
        and: [
          {
            active: {
              equals: true,
            },
          },
          {
            featured: {
              equals: true,
            },
          },
        ],
      },
      sort: 'order',
      limit: 6,
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

export default async function Page() {
  const sponsors = await getSponsors()
  const galleryImages = await getGalleryImages()

  return <HomeClient sponsors={sponsors} galleryImages={galleryImages} />
}
