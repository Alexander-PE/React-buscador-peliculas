import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const antSearch = useRef('')

  const getMovies = async () => {
    try {
      if (search === antSearch.current) return
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      antSearch.current = search
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { movies, getMovies, loading, error }
}
