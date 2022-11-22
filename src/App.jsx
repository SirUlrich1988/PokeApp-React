import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Pokedex from './views/Pokedex'
import Details from './views/Details'
import NotFound from './views/NotFound'
import PrivateRoutes from './routes/PrivateRoutes'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path='pokedex' element={<Pokedex />} />
        <Route path='pokedex/:id' element={<Details />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
