import Top5Products from '../components/Top5Products'
import Top5Categories from '../components/Top5Categories'
type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
    <Top5Categories/>
    <Top5Products/>
    </>
  )
}

export default HomePage;