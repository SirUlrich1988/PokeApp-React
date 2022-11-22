import React from 'react'

const PokeStats = ({infoStat, color}) => {
  return (
    <li className='card__stat'>
    <h4 className='card__stat-title'>{infoStat.stat.name}</h4>
    <p className={`card__stat-value color-text-${color}`}>{infoStat.base_stat}</p>
  </li>
  )
}

export default PokeStats