import { Link } from 'react-router-dom'
import { imgUrl } from '../services/api'

const PrintPokemon = ({ pokemon, pokemons, pokemonFiltered, page, itemPerPage }) => {
  return (
    <div className='container'>
      {/* mostramos el resultado de la busqueda de un solo pokemon */}
      {
        pokemon.map(pokemon => {
          const img = imgUrl.replace('{id}', pokemon.id)
          return (
            <Link to={`/pokedex/${pokemon.id}`} key={pokemon.id}>
              <div>
                <img src={img} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            </Link>
          )
        })
      }
      {/* mostramos la primera llamada y nos traemos los primeros 20 pokemon */}
      {
        pokemons.map(pokemon => {
          const id = pokemon.url.split('/').at(-2)
          const img = imgUrl.replace('{id}', id)
          return (
            <Link to={`/pokedex/${id}`} key={id}>
              <div>
                <img src={img} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            </Link>
          )
        })
      }
      {/* mostramos los pokemon filtrados por el tipo */}
      {
        pokemonFiltered.slice(page * itemPerPage, itemPerPage * (page + 1)).map(({ pokemon }) => {
          const id = pokemon.url.split('/').at(-2)
          const img = imgUrl.replace('{id}', id)
          return (
            <Link to={`/pokedex/${id}`} key={id}>
              <div>
                <img src={img} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default PrintPokemon
