import './App.css'
import PokemonCard from "./components/pokemon-details/PokemonCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [pokemons, setPokemons] = useState(null);
    const [loaded, toggleLoaded] = useState(false);
    const [error, toggleError] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");

    useEffect(() => {
        toggleLoaded(false);
        toggleError(false);
        const controller = new AbortController();
        const getPokemons = async () => {
            try {
                const response = await axios.get(`${url}`,
                    {
                        signal: controller.signal,
                    });
                setPokemons(response.data);
                return function cleanup() {
                    controller.abort();
                }
            } catch (error) {
                toggleError(true);
            } finally {
                toggleLoaded(true);

            }
        }
        getPokemons();
    }, [url]);

    return (
        <>
            <div className="outer-content-container">
                <div className="inner-content-container">
                    <img src="../src/assets/Pokémon.svg" alt="Pokemon Logo"/>
                </div>
                <div className="inner-content-container">
                    <button className="button" type="button" disabled={!pokemons || pokemons.previous == null} onClick={() => {
                        setUrl(pokemons.previous);
                    }}>Vorige
                    </button>
                    <button className="button" type="button" disabled={!pokemons || pokemons.next == null} onClick={() => {
                        setUrl(pokemons.next);
                    }}>Volgende
                    </button>
                </div>
                <div className="inner-content-container">
                    <section className="pokemon-container">
                        {!loaded && <div className="loading-message">Loading...</div>}
                        {error && <p className="error-message">Sorry er is iets misgegaan!</p>}
                        {loaded && !error && pokemons.results.map((result) => {
                            return <PokemonCard
                                key={result.url}
                                url={result.url}
                                name={result.name}
                            />
                        })
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default App;
