
import { useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import GenreFilter from "./components/GenreFilter";
import Loading from "./components/Loading";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies from movies.json
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.BASE_URL}movies.json`
        );

        setMovies(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((previousWatchlist) => {
      const alreadyAdded = previousWatchlist.some(
        (item) => item.id === movie.id
      );

      if (alreadyAdded) {
        return previousWatchlist;
      }

      return [...previousWatchlist, movie];
    });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist((previousWatchlist) =>
      previousWatchlist.filter(
        (movie) => movie.id !== movieId
      )
    );
  };

  // Filter movies by genre
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter(
          (movie) => movie.genre === selectedGenre
        );

  return (
    <div className="app-container">

      {/* Header */}
      <header>
        <h1>🎬 Tamil Movie Watchlist</h1>
        <p>
          Discover Tamil movies and create your own watchlist!
        </p>
      </header>

      <main>

        {/* Movies Section */}
        <section className="movies-section">

          <h2>Explore Tamil Movies</h2>

          {/* Genre Filter */}
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />

          {/* Loading */}
          {loading && <Loading />}

          {/* Error */}
          {!loading && error && (
            <p className="error-message">{error}</p>
          )}

          {/* Movie Cards */}
          {!loading && !error && (
            <>
              {filteredMovies.length === 0 ? (
                <p className="empty-message">
                  No movies found in this genre.
                </p>
              ) : (
                <div className="movie-grid">

                  {filteredMovies.map((movie) => {
                    const isAdded = watchlist.some(
                      (item) => item.id === movie.id
                    );

                    return (
                      <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        genre={movie.genre}
                        year={movie.year}
                        rating={movie.rating}
                        image={`${import.meta.env.BASE_URL}${movie.image.replace(/^\/+/, "")}`}
                        onAdd={() => addToWatchlist(movie)}
                        isAdded={isAdded}
                      />
                    );
                  })}

                </div>
              )}
            </>
          )}

        </section>

        {/* Watchlist Section */}
        <Watchlist
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
        />

      </main>

    </div>
  );
}

export default App;
