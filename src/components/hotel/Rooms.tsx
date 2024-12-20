import qs from 'qs'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import addDelimiter from '@utils/addDelimiter'
import { useAlertContext } from '@contexts/AlertContext'

import useRooms from './hooks/useRoom'
import useUser from '@hooks/auth/useUser'

export default function Rooms({ hotelId }: { hotelId: string }) {
  const navigate = useNavigate()
  const { open } = useAlertContext()
  const { data } = useRooms({ hotelId })
  const user = useUser()

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold typography="t4">
          객실정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const 마감임박인가 = room.avaliableCount === 1
          const 매진인가 = room.avaliableCount === 0

          // 쿼리스트링을 이욯아여 정보를 저장하도록 한다

          const params = qs.stringify(
            {
              roomId: room.id,
              hotelId,
            },
            { addQueryPrefix: true },
          )

          return (
            <ListRow
              key={room.id}
              left={
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName} 의 객실 이미지`}
                  css={imageStyles}
                />
              }
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {마감임박인가 === true ? (
                        <>
                          <Spacing size={6} direction="horizontal" />
                          <Tag backgroundColor="red">마감임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subTitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불가능' : '환불불가',
                  )}
                />
              }
              right={
                <Button
                  size="medium"
                  disabled={매진인가}
                  onClick={() => {
                    if (user == null) {
                      // 로그인전
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => {
                          navigate('/signin')
                        },
                      })
                      return
                    }
                    navigate(`/schedule${params}`)
                  }}
                >
                  {매진인가 === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: '40px 0';
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`
