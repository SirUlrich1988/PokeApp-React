import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import PokeHeader from '../components/PokeHeader'
import PrintPokemon from '../components/PrintPokemon'
import Search from '../components/Search'
import Select from '../components/Select'
import { api } from '../services/api'
import '../styles/pokedex.css'

const Pokedex = () => {
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

  const name = useSelector(state => state.name)
  const itemPerPage = 20

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

  return (
    <div className='pokedex'>
      <PokeHeader />
      <div className='poke-title'>
        <h2>👋🏻 Hi Trainer, {name || 'Trainer'}</h2>
      </div>

      <div className='poke-subt'>
        <p>Search for Pokémon by name or using the National Pokédex number.</p>
        <Search
          setDataFound={setDataFound}
          setDataFiltered={setDataFiltered}
        />
        <p>Use the advanced search to find Pokémon by type</p>
        <Select
          types={types}
          setDataFiltered={setDataFiltered}
        />
      </div>

      <Navigation
        page={page}
        setPage={setPage}
        maxPages={maxPages}
        prev={prev}
        next={next}
        isActiveNav={isActiveNav}
        isFiltering={isFiltering}
        setPokemons={setPokemons}
        setPrev={setPrev}
        setNext={setNext}
      />

      <PrintPokemon
        pokemon={pokemon}
        pokemons={pokemons}
        pokemonFiltered={pokemonFiltered}
        page={page}
        itemPerPage={itemPerPage}
      />
    </div>
  )
}

export default Pokedex
