import { getReviews } from '@remote/review'
import { useQuery } from 'react-query'

export default function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )
  return { data, isLoading }
}
