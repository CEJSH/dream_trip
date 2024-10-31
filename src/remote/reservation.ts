import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants'
import { store } from './firebase'

import { Reservation } from '@models/reservation'
import { Room } from '@models/room'

export async function makeReservation(newReservation: Reservation) {
  // 잔여객실수를 알기위해 먼저 호텔에 대한 정보를 가져온다.

  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const 지금잔여객실수 = room.avaliableCount

  if (지금잔여객실수 === 0) {
    throw new Error('no room')
  }

  // 두개가 함께 완료되어야 하는 상황이니 promiseAll을 사용한다.

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: 지금잔여객실수 - 1,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}
