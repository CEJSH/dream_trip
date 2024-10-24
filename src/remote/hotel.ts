import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  getDoc,
  doc,
  startAfter,
  where,
  documentId,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants'

import { store } from './firebase'
import { Hotel } from '@models/hotel'

export async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  //pageParams가 없다는 것은 최초의 호출, 있다면 스크롤을 내렸을 때의(다음페이지에 대한) 요청!
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  const hotelsSnapshot = await getDocs(hotelsQuery)

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return {
    items,
    lastVisible,
  }
}

export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id))

  return {
    id,
    ...snapshot.data(),
  } as Hotel
}

export async function getRecommendHotels(hotelIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    where(documentId(), 'in', hotelIds),
  )

  const snapshot = await getDocs(recommendQuery)
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )
}
