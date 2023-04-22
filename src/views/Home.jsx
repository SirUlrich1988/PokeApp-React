import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setName } from '../app/modules/setNameSlice'
import '../styles/home.css'

const Home = () => {
  const [value, setValue] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setName(value))
    setValue('')
    navigate('/pokedex')
  }

  return (
    <div className='grid--container'>
      <div className='container--home--img'>
      <img className='home__img' src="https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-PNG-Pic.png" alt="logo pokemon" />
      </div>
      <h1 className='home-title'> Welcome, Trainer</h1>
      <p className='home-p'> Please enter your name and press enter to start the adventure.</p>

      <form onSubmit={onSubmit}>
        <input className='home-input'
          type='text'
          value={value}
          onChange={({ target }) => setValue(target.value)}
          placeholder='Enter your name'
        />
      </form>
    </div>
  )
}

export default Home
