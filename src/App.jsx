import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from './compornents/Card/Card';
import Navbar from './compornents/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokeData, setPokeData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokeData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setPrevURL(res.previous);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokeData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokeData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokeData(_pokeData);
  };

  const handlePrevPage =async () => { 
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (<h1>loading...</h1>) : (
          <div className='pokeCardContainer'>
            {pokeData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
      </div>
      <div className="btn">
        <button onClick={handlePrevPage}>prev</button>
        <button onClick={handleNextPage}>next</button>

      </div>
    </>
  );
}

export default App;
