import { useEffect, useState, useRef } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // prevent validation on first render
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('No se puede buscar pelicula con menos de 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
