import React from "react";
import MovieCard from "./MovieCard";

const MovieList = props => {
  console.log(props);

  return (
    <div>
      <div className="movie-list">
        {props.movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            director={movie.director}
            metascore={movie.metascore}
            stars={movie.stars}
          />
        ))}
      </div>
    </div>
  );
};
export default MovieList;
