function MovieCard({
  id,
  title,
  genre,
  year,
  rating,
  image,
  onAdd,
  isAdded
}) {
  return (
    <div className="movie-card">

      <img
        className="movie-poster"
        src={image}
        alt={`${title} movie poster`}
      />

      <h3>{title}</h3>

      <p>Genre: {genre}</p>

      <p>Year: {year}</p>

      <p>Rating: {rating}</p>

      <button
        onClick={() => onAdd(id)}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>

    </div>
  );
}

export default MovieCard;