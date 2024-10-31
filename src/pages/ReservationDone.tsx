import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'

export default function ReservationDonePage() {
  const navigate = useNavigate()
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string
  }
  return (
    <div>
      <Spacing size={80} />
      <Flex direction="column" align="center">
        <img
          alt="plane"
          src="https://cdn1.iconfinder.com/data/icons/travel-line-good-life/512/plane-512.png"
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text typography="t4" bold>
          {hotelName}
        </Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 리스트
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}
