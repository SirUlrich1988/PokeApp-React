import { useState } from 'react'

const Search = ({ setDataFound, setDataFiltered }) => {
  const [inputValue, setInputValue] = useState('')

  const handlerSearch = ({ value }) => {
    setInputValue(value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setDataFound(inputValue)
    setInputValue('')
    setDataFiltered(null)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
      className='search-input'
        type='search'
        value={inputValue}
        onChange={({ target }) => handlerSearch(target)}
        placeholder='type name or id'
      />
    </form>
  )
}

export default Search
