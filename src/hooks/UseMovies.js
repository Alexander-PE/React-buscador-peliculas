import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const antSearch = useRef('')

  const getMovies = useCallback(async ({ search }) => {
    try {
      if (search === antSearch.current) return
      setLoading(true)
      setError(null)
      antSearch.current = search
      const newMovies = await searchMovies({ search })

      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // sort movies by title avoiding re-render when sort or movies change (useMemo is a hook that allows to memoize a value)
  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
