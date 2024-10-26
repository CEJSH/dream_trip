import {
  query,
  doc,
  collection,
  orderBy,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { Review } from '@models/review'
import { store } from './firebase'
import { User } from '@/models/user'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  const reviewSnapshot = await getDocs(reviewQuery)
  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  // 리뷰 캐시학
  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const 캐시된유저 = userMap[review.id]

    if (캐시된유저 == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )
      const user = userSnapshot.data() as User
      userMap[review.userId] = user

      results.push({ ...review, user })
    } else {
      results.push({ ...review, user: 캐시된유저 })
    }
  }
  return results
}
// review의 아이디는 생성이후 부여되므로 omit 타입을 부여한다
// 호텔의 서브컬렉션으로 들어가는 것이므로 호텔을 먼저 찾아준다
export function writeReview(review: Omit<Review, 'id'>) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  return setDoc(reviewRef, review)
}

// 삭제하고 싶은 리뷰의 아이디, 호텔의 아이디 총 두개의 인자를 받는다.
export function removeReview({
  reviewId,
  hotelId,
}: {
  reviewId: string
  hotelId: string
}) {
  // 호텔을 먼저 찾고 삭제할 대상을 찾아야 한다
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW), reviewId)

  return deleteDoc(reviewRef)
}
