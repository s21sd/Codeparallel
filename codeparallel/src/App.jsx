import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Editorpage from './pages/Editorpage'
function App() {

  return (
    <>
      <Toaster position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor/:roomId' element={<Editorpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
