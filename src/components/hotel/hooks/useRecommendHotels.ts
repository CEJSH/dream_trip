import { getRecommendHotels } from '@remote/hotel'
import { useQuery } from 'react-query'

export default function useRecommendHotels({
  hotelIds,
}: {
  hotelIds: string[]
}) {
  return useQuery(
    ['recommendHotels', JSON.stringify(hotelIds)],
    () => getRecommendHotels(hotelIds),
    {
      enabled: hotelIds.length > 0,
    },
  )
}
