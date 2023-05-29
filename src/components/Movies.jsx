// eslint-disable-next-line no-unused-vars
function ListOfMovies ({ movies }) {
  return (
    <ul className="movies">
      {
        movies.map(movie => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

// eslint-disable-next-line no-unused-vars
function NoMoviesResults () {
  return (
    <p>No se encontraron resultados para esta busqueda</p>
  )
}

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return (hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />)
}
