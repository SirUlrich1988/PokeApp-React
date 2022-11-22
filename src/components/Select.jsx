const Select = ({ types, setDataFiltered }) => {
  return (
    <select className="poke-selec" onChange={({ target }) => setDataFiltered(target.value)}>
      <option value='all'>All</option>
      {
        types.map(type => {
          const id = type.url.split('/').at(-2)
          return <option key={id} value={id}>{type.name}</option>
        })
      }
    </select>
  )
}

export default Select
