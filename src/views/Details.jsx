import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api, imgUrl } from '../services/api'
import '../styles/pokeDetails.css'

const Details = () => {
const { id } = useParams()

const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    api.get(`pokemon/${id}`)
      .then( async (res) => {
        async function getSpecies(url) {
          const species = await fetch(url)
          const { flavor_text_entries : texts } = await species.json()
          let details = []
          for (const { flavor_text : text, language } of texts) {
            if(language.name === 'en') {
              details.push(text.replace(/\n/g).toLowerCase())
            }
          }
          return details[10]
        }
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map( x => x.type.name ),
          abilities: res.data.abilities.map( x => x.ability.name ),
          stats: res.data.stats.map( x => ({
            name: x.stat.name,
            base: x.base_stat
          })),
          details: await getSpecies(res.data.species.url)
        })
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  const { name } = pokemon
  const img = imgUrl.replace('{id}', id)

  return (
    <div className='details'>
      <div className='det-data'>
        <h2 className='det-name'>{name}</h2>
        <img className='det-img' src={img} alt={pokemon.name} /><br />
        <div className='det-container'>
        <div className='det-types'>
          Type : {
          pokemon?.types?.map((a, i) => (
            <p key={i+1}>{a}</p>
            ))
          }
        </div>
        <div className='det-abilities'>
          Abilities : {
          pokemon?.abilities?.map((a, i) => (
            <p key={i+1}>{a}</p>
            ))
          }
        </div>
        <div className='det-stats'>
          Stats : {
          pokemon?.stats?.map((a, i) => (
            <p key={i+1}>{a.name} : {a.base}</p>
            ))
          }
        </div>
          <div className='det-descrip'>{pokemon.details}</div>
        </div>
      </div>
    </div>
  )
}

export default Details
