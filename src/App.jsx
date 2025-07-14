import Header from './components/header';
import Home from './components/Home';
import Paginator from './components/Paginator';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css'

function App() {

  const [resultPaginator, setPaginator] = useState('')

  const updateResult = (result) => {
    let newResult = [...resultPaginator]
    newResult.push(result)
    setPaginator(newResult)
  }


  return (
    <div className='App'>
      <Header />
      <Home onAddPage={updateResult} />
      
      <div className='container'>
        <Outlet />
      </div>
    </div>

  )
}

export default App
