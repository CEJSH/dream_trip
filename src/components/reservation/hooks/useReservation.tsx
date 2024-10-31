import { getHotelWithRoom } from '@remote/hotel'
import { useQuery, useMutation } from 'react-query'
import { useAlertContext } from '@contexts/AlertContext'
import { makeReservation } from '@remote/reservation'
import { Reservation } from '@models/reservation'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.avaliableCount === 0) {
          open({
            title: '객실이 매진되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  const { mutateAsync } = useMutation(
    (newReservation: Reservation) => makeReservation(newReservation),
    {
      onError: () => {
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  return { data, isLoading, makeReservation: mutateAsync }
}

export default useReservation
