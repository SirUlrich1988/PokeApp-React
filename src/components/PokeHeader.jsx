import React from 'react'
import '../styles/pokeHeader.css'

const PokeHeader = () => {
  return (
    <header className='red-rectangle-header'>
    <img className='header-img' src="https://falberthen.github.io/assets/img/posts/2022-02-12-pokedex/pokedex-logo.png" alt="" />
    <div className='black-rectangle-header'></div>
    <div className='circle-ext-header'>
      <div className="circle-int-header"></div>
    </div>
  </header>
  )
}

export default PokeHeader