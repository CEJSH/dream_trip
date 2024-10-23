import Flex from './Flex'
import { css } from '@emotion/react'
import Text from './Text'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import { SerializedStyles } from '@emotion/react'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}
export default function ListRow({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowLeftStyles = css`
  margin-right: 14px;
`
const listRowContentsStyles = css`
  flex: 1;
`

const listRowContainerStyles = css`
  padding: 8px 24px;
`

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function ListRowSkeleton() {
  return (
    <Flex as={'li'} css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        {
          <ListRow.Texts
            title={
              <>
                <Skeleton width={67} height={23} />
                <Spacing size={2} />
              </>
            }
            subTitle={<Skeleton width={85} height={20} />}
          />
        }
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      fill="none"
      height="20"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="20"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton
