import useHotels from '@components/hotelList/hooks/useHotels'

function HotelListPage() {
  const { data: hotels } = useHotels()
  console.log('hotels', hotels)
  return <div>HotelList</div>
}
export default HotelListPage
