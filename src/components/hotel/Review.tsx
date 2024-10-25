import useReview from './hooks/useReview'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import { useCallback } from 'react'
import Spacing from '../shared/Spacing'
import ListRow from '../shared/ListRow'
import { format } from 'date-fns'
import useUser from '@hooks/auth/useUser'
import Button from '@shared/Button'
import TextField from '@shared/TextField'

export default function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading } = useReview({ hotelId })
  const user = useUser()

  // 함수가 컴포넌트를 그려주는 식으로
  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/message_open-64.png"
            alt="review"
          />
          <Spacing size={16} />
          <Text typography="t6">
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해 보세요 !
          </Text>
        </Flex>
      )
    }
    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            left={
              review.user.photoURL != null ? (
                <img src={review.user.photoURL} alt="" width={40} height={40} />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={review.userId === user?.uid ? <Button>삭제</Button> : null}
          />
        ))}
      </ul>
    )
  }, [reviews, user])

  if (isLoading === true) return null

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField />
          <Spacing size={6} />
          <Flex justify={'flex-end'}>
            <Button disabled={true}>작성</Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}