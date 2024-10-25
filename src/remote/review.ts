import {
  query,
  doc,
  collection,
  orderBy,
  getDocs,
  getDoc,
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
