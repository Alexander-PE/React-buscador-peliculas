import { useRef, useState, useCallback } from 'react' // permite crear una referencia mutable persistente durante el ciclo de vida
import debounce from 'just-debounce-it'
import './App.css'

// eslint-disable-next-line no-unused-vars
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  const inputRef = useRef()
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
    // this is a UNcontrolled form
    // teke the value of an input without any hook (THE INPUT MUST HAVE A NAME)
    // const fields = new window.FormData(e.target)
    // const search = fields.get('search')

    // take every input value without any hook (THE INPUTS MUST HAVE A NAME)
    // const { search } = Object.fromEntries(new window.FormData(e.target))

    // this is a controlled form (THE INPUT MUST HAVE A REF)
    // const value = inputRef.current.value
  }

  const handleSort = () => {
    setSort(!sort)
  }

  // this is a controlled form
  const handleChange = (e) => {
    const newsearch = e.target.value
    // if (newsearch.startsWith(' ')) return
    setSearch(newsearch)
    debouncedGetMovies(newsearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={search}
            ref={inputRef}
            type="text"
            name='search'
            placeholder='Avengers, Star Wars, Matrix' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Buscando peliculas...</p> : <Movies movies={movies} />}
      </main>
    </div >
  )
}

export default App
