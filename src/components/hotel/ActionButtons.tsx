import { CopyToClipboard } from 'react-copy-to-clipboard'
import Flex from '@shared/Flex'
import { css } from '@emotion/react'

import useShare from '@hooks/useShare'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { Hotel } from '@models/hotel'
import useLike from '@hooks/like/useLike'

export default function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare()
  const { data: likes, mutate: like } = useLike()

  const { name, comment, mainImageUrl, id } = hotel

  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id))

  return (
    <Flex css={containerStyles}>
      <Button
        label="찜하기"
        onClick={() => {
          like({ hotel: { name, mainImageUrl, id } })
        }}
        iconUrl={
          isLike
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
            : 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/heart-64.png'
        }
      />
      <Button
        label="공유하기"
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Dream Trip에서 보기',
          })
        }}
        iconUrl={
          'https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-64.png'
        }
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          alert('링크가 복사되었습니다.')
        }}
      >
        <Button
          label="링크복사"
          iconUrl={
            'https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/paste-clipboard-copy-64.png'
          }
        />
      </CopyToClipboard>
    </Flex>
  )
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string
  iconUrl: string
  onClick?: () => void
}) {
  return (
    <Flex direction="column" align="center" onClick={onClick}>
      <img src={iconUrl} alt="" width={30} height={30} />
      <Spacing size={8} style={{ minHeight: '6px' }} />
      <Text typography="t7">{label}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`
