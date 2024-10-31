import InfiniteScroll from 'react-infinite-scroll-component'

import useHotels from '@components/hotelList/hooks/useHotels'
import Top from '@shared/Top'
import HotelItem from '@/components/hotelList/HotelItem'
import { Fragment } from 'react'
import Spacing from '@shared/Spacing'
import useLike from '@hooks/like/useLike'
import withSuspense from '@shared/hocs/withSuspense'

function HotelListPage() {
  const { data: likes, mutate: like } = useLike()
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => {
            return (
              <Fragment key={hotel.id}>
                <HotelItem
                  hotel={hotel}
                  isLike={Boolean(
                    likes?.find((like) => like.hotelId === hotel.id),
                  )}
                  onLike={like}
                />
                {hotels.length - 1 === idx ? null : (
                  <Spacing
                    size={8}
                    backgroundColor="gray100"
                    style={{ margin: '20px 0' }}
                  />
                )}
              </Fragment>
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
export default withSuspense(HotelListPage, {
  fallback: <div>호텔 리스트 불러오는 중...</div>,
})
