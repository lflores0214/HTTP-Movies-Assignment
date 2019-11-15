import React  from "react";
import axios from "axios";

const Movie = props => {
  const movie = props.movies.find(
    thing => `${thing.id}` === props.match.params.id
  );

  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  };
  
  const item = props.movies.find(
    movie => `${movie.id}` === props.match.params.id
  );

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${item.id}`)
      .then(response => {
        props.updateMovies(response.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };
  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const { title, director, metascore, stars, id } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars &&
          stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))}
      </div>
      <button className="save-button" onClick={() => saveMovie()}>
        Save
      </button>
      <button
        className="edit-button"
        onClick={() => props.history.push(`/update-movie/${id}`)}
      >
        {" "}
        Update Movie
      </button>
      <button className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
};

export default Movie;
