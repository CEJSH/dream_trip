import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  image: string
}

export default function SEO({ title, description, image }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="DreamTrip" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="260" />
      <meta property="og:image:height" content="260" />
      <meta property="og:description" content="여행의 시작은 DreamTrip 에서" />
      <meta property="og:locale" content="ko_KR" />
    </Helmet>
  )
}
