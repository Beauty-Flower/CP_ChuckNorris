//Nome: Florbela Freitas Oliveira | RM: 99475

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = localStorage.getItem("FavoriteList");
    const JSONList = JSON.parse(list) || [];

    setFavorites(JSONList);
  });

  useEffect(() => {
    console.log("Getting joke...");
    getJoke();
  }, []);

  const getJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        setJoke(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleJoke = (joke) => {
    const newJoke = [...favorites];
    newJoke.push(joke);

    const stringList = JSON.stringify(newJoke);
    localStorage.setItem("FavoriteList", stringList);

    setFavorites(newJoke);
    setFavorite(true);
  };

  const deleteFavJoke = (favJoke) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      const newFavorites = favorites.filter((joke) => joke.id !== favJoke.id);
      const stringList = JSON.stringify(newFavorites);
      localStorage.setItem("FavoriteList", stringList);
      setFavorites(newFavorites);
    }
  };

  return (
    <div className="App">
      <h1>Chuck Norris</h1>

      <div className="Container">
        <div className="JokeContainer">
          <p key={joke.id} className="Joke">
            {joke.value}
          </p>
        </div>

        <div className="Favorite" onClick={() => handleJoke(joke)}>
          <img
            className="img"
            src={
              favorite
                ? "src/assets/favorito.png"
                : "src/assets/adicionar-aos-favoritos.png"
            }
            alt={favorite ? "Desfavoritar" : "Favoritar"}
          />
        </div>
      </div>

      <h1>Lista de favoritos</h1>

      {favorites.map((favorite) => (
        <ul>
          <li key={favorite.id}>{favorite.value}</li>

          <div className="Favorite" onClick={() => deleteFavJoke(favorite)}>
            <img className="img" src="src/assets/excluir.png" alt="Excluir" />
          </div>
        </ul>
      ))}
    </div>
  );
}

export default App;
