import { getReviews, removeReview, writeReview } from '@remote/review'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import useUser from '@hooks/auth/useUser'
import { stringify } from 'querystring'
// useMutation을 활용하여 액션을 정의한다,

export default function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  // async await을 사용하여 성공적으로 리뷰 작성시 true를 반환하도록 한다.
  // 성공적으로 끝났다면 목록을 갱신해준다.
  // mutateAsync는 프라미스를 반환 => 사용처에서 흐름 제어 가능

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      // 새로운 리뷰데이터를 만듭니다.
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }
      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ reviewId, hotelId }: { reviewId: string; hotelId: string }) => {
      return removeReview({ reviewId, hotelId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )
  return { data, isLoading, write, remove }
}
