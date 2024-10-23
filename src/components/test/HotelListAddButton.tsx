import { doc, collection, writeBatch } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'

import Button from '@shared/Button'
import { HOTEL, HOTEL_NAMES, IMAGES, EVENTS, ROOMS } from '@/mock/data'

function random(min: number, max: number) {
  // min에서 max까지의 임의의 값을 return하는 util함수
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function HotelListAddButton() {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, idx) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: random(130000, 200000),
        starRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[idx] != null && { events: EVENTS[idx] }),
      }
    })
    hotels.forEach((hotel) => {
      // 계층을 가진 구조. collection 첫번째 인자에 유의할 것.
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))

      batch.set(hotelDocRef, hotel)

      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))
        batch.set(subDocRef, room)
      })
    })
    batch.commit()
  }

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}
