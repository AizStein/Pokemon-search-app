import { useState } from "react";
import "./App.css";
import Pokemon, { PokemonProps } from "./components/Pokemon";
import Pokemon_img from "./assets/pokemon.png";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [fetchData, setFetchData] = useState<PokemonProps | null>(null);
  const [error, setError] = useState("");

  const searchHandler = () => {
    if (!searchValue.trim()) {
      setError("Please enter a Pokémon name.");
      return;
    }
    setError("");
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue.trim().toLowerCase()}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Pokémon not found.");
        }
        return res.json();
      })
      .then((data: PokemonProps) => {
        setFetchData(data);
        setSearchValue("");
      })
      .catch((err) => {
        setError(err.message);
        setFetchData(null);
      });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    searchHandler();
  };

  return (
    <>
      <header>
        <img src={Pokemon_img} alt="pokemon" />
      </header>
      <body>
        <main>
          <form className="search" onSubmit={submitHandler}>
            <input
              type="text"
              name="search"
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {error && <p className="error">{error}</p>}
          {fetchData ? (
            <Pokemon {...fetchData} />
          ) : (
            <p className="empty">No Pokémon data</p>
          )}
        </main>
      </body>
    </>
  );
}

export default App;
