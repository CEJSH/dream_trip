import { useParams } from 'react-router-dom'
import useHotel from '@components/hotel/hooks/useHotel'
import Carousel from '@components/hotel/Carousel'

import Top from '@shared/Top'
import Contents from '@components/hotel/Contents'
import Rooms from '@components/hotel/Rooms'
import Map from '@components/hotel/Map'

export default function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  console.log('data', data)
  console.log('isLoading', isLoading)

  if (data == null || isLoading) return <div>Loading...</div>

  const { name, comment, images, contents, location } = data

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
    </div>
  )
}
