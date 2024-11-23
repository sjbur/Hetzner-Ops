import { useState, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

interface LazyImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
}

export function LazyImage({
  src,
  alt,
  width = '100%',
  height = 'auto',
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
    }
  }, [src])

  if (isLoading) {
    return <Skeleton variant="rectangular" width={width} height={height} />
  }

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      sx={{
        width,
        height,
        objectFit: 'cover',
      }}
      loading="lazy"
    />
  )
}
