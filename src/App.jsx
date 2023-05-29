import { useRef } from 'react' // permite crear una referencia mutable persistente durante el ciclo de vida
import './App.css'

// eslint-disable-next-line no-unused-vars
import { Movies } from './components/Movies.jsx'
import { UseMovies } from './hooks/UseMovies'
import { UseSearch } from './hooks/UseSearch'

function App () {
  const { search, setSearch, error } = UseSearch()
  const { movies } = UseMovies()
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ search })

    // this is a UNcontrolled form
    // teke the value of an input without any hook (THE INPUT MUST HAVE A NAME)
    // const fields = new window.FormData(e.target)
    // const search = fields.get('search')

    // take every input value without any hook (THE INPUTS MUST HAVE A NAME)
    // const { search } = Object.fromEntries(new window.FormData(e.target))

    // this is a controlled form (THE INPUT MUST HAVE A REF)
    // const value = inputRef.current.value
  }

  // this is a controlled form
  const handleChange = (e) => {
    // const newsearch = e.target.value
    // if (newsearch.startsWith(' ')) return
    setSearch(e.target.value)
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
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div >
  )
}

export default App
