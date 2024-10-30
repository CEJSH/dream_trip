import { parse } from 'qs'
import { useEffect } from 'react'
import useReservation from '@components/reservation/hooks/useReservation'
import Summary from '@components/reservation/Summary'
import Spacing from '@components/shared/Spacing'
import Form from '@components/reservation/Form'
import addDelimiter from '@utils/addDelimiter'

export default function ReservationPage() {
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  ) as {
    startDate: string
    endDate: string
    nights: string
    roomId: string
    hotelId: string
  }

  useEffect(() => {
    // 값들 중 하나라도 유실이 되었다면
    if (
      [startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [])

  const { data, isLoading } = useReservation({ hotelId, roomId })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

  const handleSubmit = () => {}

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}
