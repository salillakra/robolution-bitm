'use client'
import React from 'react'
import Image, { ImageProps } from 'next/image'

interface CldImageProps extends Omit<ImageProps, 'src'> {
  src: string
}

const CldImage = ({ src, alt, ...props }: CldImageProps) => {
  // Simple fallback: If it starts with http or /, use it.
  // Otherwise, use a placeholder.
  const isUrl = src.startsWith('http') || src.startsWith('/')

  // Real usage would require process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  // defaulting to a placeholder service if not a URL.
  const imageUrl = isUrl ? src : `https://placehold.co/400x400/222/FFF?text=${src}`

  return (
    <Image
      src={imageUrl}
      alt={alt || 'Team Member'}
      {...props}
      unoptimized // Important for external URLs without specific loader config
    />
  )
}

export default CldImage
