import { api } from '../services/api'

const Navigation = ({ page, setPage, maxPages, prev, next, isActiveNav, isFiltering, setPokemons, setPrev, setNext }) => {
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

  const prevDiseable = isFiltering ? (page - 1) < 0 : prev === null
  const nextDisable = isFiltering ? (page + 1) >= maxPages : next === null

  return (
    <div>
      {
        isActiveNav &&
          <div className='poke-nav'>
            <button
              onClick={() => isFiltering ? setPage((page - 1) % maxPages) : handlerPrev(prev)}
              disabled={prevDiseable}
            ><box-icon name='chevrons-left' animation='burst' ></box-icon>
            </button>

            <button
              onClick={() => isFiltering ? setPage((page + 1) % maxPages) : handlerNext(next)}
              disabled={nextDisable}
            ><box-icon name='chevrons-right' animation='burst' ></box-icon>
            </button>
          </div>
      }
      {
        isFiltering && <p>{page + 1} of {maxPages}</p>
      }
    </div>
  )
}

export default Navigation
