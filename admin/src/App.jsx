import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from'react-router-dom'
import AddItems from './pages/Add/AddItems'
import ListItems from './pages/List/ListItems'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddItems url={url}/>} />
          <Route path='/list' element={<ListItems url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App