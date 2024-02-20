import './App.css'
import Navbar from './Components/Navbar'
import ItemListContainer from './Components/ItemListContainer'
import { Route, Routes } from 'react-router-dom'
import ItemDetailContainer from './Components/ItemDetailContainer'
import Contact from './Components/Contact'
import Formulario from './Components/Formulario'
import { ContextProvider } from './context/Context'

function App() {
  // let routes = {
  //   home: '/',
  //   category: '/product/category',
  //   detail: 'detail/id'
  // }
  return (
    <div className='App'>
      <ContextProvider>
      <Navbar/>
      {/* <Formulario/> */}
      <Routes>
        <Route path='/' element={<ItemListContainer/>}/>
        <Route path='/products/:category' element={<ItemListContainer/>}/>
        <Route path='/product/:id' element={<ItemDetailContainer/>}/>
        <Route path='/contact' element={<Contact/>} />
      </Routes>
      </ContextProvider>
    </div>
  )
}

export default App
