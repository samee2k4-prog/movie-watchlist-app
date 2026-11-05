
function GenreFilter({ selectedGenre, onGenreChange }) {
  const genres = ["All", "Action", "Comedy", "Drama"];

  return (
    <div className="genre-filter">
      <h2>Filter by Genre</h2>

      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={
              selectedGenre === genre ? "active-genre" : ""
            }
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
