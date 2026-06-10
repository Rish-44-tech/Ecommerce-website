import { Routes,Route } from 'react-router';
import Home from './Pages/Home.jsx';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/checkout' element={<Checkout/>}></Route>
    </Routes>
  )
}

export default App
