import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [""]
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  
  
  const changeHandler = e => {
      e.persist();
    let value = e.target.value;
    if (e.target.value === "metascore") {
      value = parseInt(value, 10);
    }
    // if(e.target.name === "stars"){
    //     value = value.target.splice([","])
    // }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };


  useEffect(() => {
    if (props.movies.length > 0) {
      const newMovie = props.movies.find(
        movie => `${movie.id}` === props.match.params.id
      );
      setMovie(newMovie);
    }
  }, [props.movies, props.match.params.id]);


  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        props.updateMovies(response.data);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(error => console.log("ERROR", error));
  };

  return(
      <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
              <input 
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={movie.title}
              />
              <input 
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={movie.director}
              />
              <input 
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={movie.metascore}
              />
              <input 
              type="text"
              name="stars"
              onChange={changeHandler}
              placeholder="Stars"
              value={movie.stars}
              />
              <button type="submit" >Update Movie</button>
          </form>
      </div>
  )
};

export default UpdateForm;
