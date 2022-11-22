import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

export const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png'
