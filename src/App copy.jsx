import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

function App () {
  const [inputValue, setInputValue] = useState('')
  const [dataFound, setDataFound] = useState(null)
  const [dataFiltered, setDataFiltered] = useState(null)

  const [pokemon, setPokemon] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [pokemonFiltered, setPokemonFilterd] = useState([])
  const [types, setTypes] = useState([])
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)

  const [isActiveNav, setIsActiveNav] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  const [page, setPage] = useState(0)
  const [maxPages, setMaxPages] = useState(0)

  const itemPerPage = 10

  useEffect(() => {
    api.get('type')
      .then(res => {
        setTypes(res.data.results)
      })
      .catch(err => console.log(err))

    if (dataFiltered && dataFiltered !== 'all') {
      setIsActiveNav(true)
      setIsFiltering(true)
      api.get(`type/${dataFiltered}`)
        .then(res => {
          setPokemonFilterd(res.data.pokemon)
          setMaxPages(Math.ceil(res.data.pokemon.length / itemPerPage))

          setPokemons([])
          setPokemon([])
          setDataFound(null)
        })
        .catch(err => console.log(err))
    } else if (dataFound) {
      setIsActiveNav(false)
      setIsFiltering(false)
      setDataFiltered(null)
      setPage(0)
      api.get(`pokemon/${dataFound}`)
        .then(res => {
          const obj = { ...res.data }
          setPokemon([obj])

          setPokemonFilterd([])
          setPokemons([])
        })
        .catch(err => console.log(err))
    } else {
      setIsActiveNav(true)
      setIsFiltering(false)
      api.get('pokemon')
        .then(res => {
          setPokemons(res.data.results)
          setNext(res.data.next)
          setPrev(res.data.previous)
          setPokemon([])
          setPokemonFilterd([])
        })
        .catch(err => console.log(err))
    }
  }, [dataFiltered, dataFound])

  const handlerPrev = (prev) => {
    api.get(prev).then(res => {
      setPokemons(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
    }).catch(err => console.log(err))
  }

  const handlerNext = (next) => {
    api.get(next).then(res => {
      setPokemons(res.data.results)
      setNext(res.data.next)
      setPrev(res.data.previous)
    }).catch(err => console.log(err))
  }

  const handlerSearch = ({ value }) => {
    setInputValue(value)
  }

  const onsubmit = (e) => {
    e.preventDefault()
    setDataFound(inputValue)
    setInputValue('')
    setDataFiltered(null)
  }

  const prevDiseable = isFiltering ? (page - 1) < 0 : prev === null
  const nextDisable = isFiltering ? (page + 1) >= maxPages : next === null

  return (
    <div className='App'>

      <h2>Pokemons of PokeApi v2</h2>

      <h3>Find for id or name:</h3>
      <form onSubmit={onsubmit}>
        <input
          type='search'
          value={inputValue}
          onChange={({ target }) => handlerSearch(target)}
          placeholder='type name or id'
        />
      </form>

      <p>Or</p>

      <h3>Filter for type:</h3>
      <select onChange={({ target }) => setDataFiltered(target.value)}>
        <option value='all'>All</option>
        {
          types.map(type => {
            const id = type.url.split('/')
            const idx = id.at(-2)
            return <option key={idx} value={idx}>{type.name}</option>
          })
        }
      </select>

      {/* mostramos el resultado de la busqueda de un solo pokemon */}
      {
        pokemon.map(pokemon => {
          return (
            <div key={pokemon.name}>
              <p>{pokemon.name}</p>
            </div>
          )
        })
      }

      {/* mostramos la primera llamada y nos traemos los primeros 20 pokemon */}
      {
        pokemons.map(pokemon => {
          return (
            <div key={pokemon.name}>
              <p>{pokemon.name}</p>
            </div>
          )
        })
      }

      {/* mostramos los pokemon filtrados por el tipo */}
      {
        pokemonFiltered.slice(page * itemPerPage, itemPerPage * (page + 1)).map(({ pokemon }) => {
          return (
            <div key={pokemon.name}>
              <p>{pokemon.name}</p>
            </div>
          )
        })
      }

      {
        isActiveNav &&
          <div>
            <h2>Pagination:</h2>
            <button
              onClick={() => isFiltering ? setPage((page - 1) % maxPages) : handlerPrev(prev)}
              disabled={prevDiseable}
            >prev
            </button>

            <button
              onClick={() => isFiltering ? setPage((page + 1) % maxPages) : handlerNext(next)}
              disabled={nextDisable}
            >next
            </button>
          </div>
      }

      {
        isFiltering && <p>{page + 1} of {maxPages}</p>
      }

    </div>
  )
}

export default App
