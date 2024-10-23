import { useParams } from 'react-router-dom'
import useHotel from '@components/hotel/hooks/useHotel'
import Carousel from '@components/hotel/Carousel'

import Top from '@shared/Top'
import Contents from '@/components/hotel/Contents'

export default function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  console.log('data', data)
  console.log('isLoading', isLoading)

  if (data == null || isLoading) return <div>Loading...</div>

  const { name, comment, images, contents } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <Contents contents={contents} />
    </div>
  )
}
