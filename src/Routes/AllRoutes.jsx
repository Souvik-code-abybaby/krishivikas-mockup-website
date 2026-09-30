import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from '../pages/Home'
import EMIPage from '../pages/Emi'
import ComparePage from '../pages/Compare'
import Header from '../components/common/Header'
import Footer from '../components/Footer/Footer'
import ProfilePage from '../pages/Profile'
import CategoryPage from '../pages/Category'
import ProductPage from '../pages/Product'
import AppDownloadPopup from '../components/common/AppDownloadPopup'

const AllRoutes = () => {
  return (
    <div>
      <Routes><Route path='/' element={<><Header/><HomePage/><AppDownloadPopup/><Footer/></>}/>
   <Route path='/emi' element={<><Header/><EMIPage/><AppDownloadPopup/><Footer/></>}/> 
      <Route path='/compare' element={<><Header/><ComparePage/><AppDownloadPopup/><Footer/></>}/>
      <Route path='/category' element={<><Header/><CategoryPage/><AppDownloadPopup/><Footer/></>}/>
          <Route path='/profile' element={<><Header/><ProfilePage/><AppDownloadPopup/>
          <Footer/></>}/>
          <Route path='/product' element={<><Header/><ProductPage/><AppDownloadPopup/><Footer/></>}/></Routes>
    </div>
  )
}

export default AllRoutes;
