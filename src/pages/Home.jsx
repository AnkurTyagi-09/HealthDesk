import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import StatsSection from '../components/StatsSection'
import Banner from '../components/Banner'



const Home = () => {
  return (
    <div className='container mx-auto'>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <StatsSection/>
      <Banner/>
    </div>
  )
}

export default Home