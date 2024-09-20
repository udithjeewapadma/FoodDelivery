import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from'react-router-dom'
import AddItems from './pages/Add/AddItems'
import ListItems from './pages/List/ListItems'
import Orders from './pages/Orders/Orders'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddItems/>} />
          <Route path='/list' element={<ListItems/>} />
          <Route path='/orders' element={<Orders/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App