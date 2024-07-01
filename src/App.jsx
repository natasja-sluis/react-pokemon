import './App.css'
import PokemonCard from "./components/pokemon-details/PokemonCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [pokemons, setPokemons] = useState([]);
    const [loaded, toggleLoaded] = useState(false);
    const [error, toggleError] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    const [disablePreviousBtn, toggleDisablePreviousBtn] = useState(true);
    const [disableNextBtn, toggleDisableNextBtn] = useState(false);

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
                toggleLoaded(true);
                return function cleanup() {
                    controller.abort();
                }
            } catch (error) {
                toggleError(true);
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
                    <button className="button" type="button" disabled={disablePreviousBtn} onClick={() => {
                        setUrl(pokemons.previous);
                    }}>Vorige
                    </button>
                    <button className="button" type="button" disabled={disableNextBtn} onClick={() => {
                        setUrl(pokemons.next);
                    }}>Volgende
                    </button>
                </div>
                <div className="inner-content-container">
                    <section className="pokemon-container">
                        {error && <p className="error-message">Sorry er is iets misgegaan!</p>}
                        {loaded ? pokemons.results.map((result) => {
                            return <PokemonCard
                                key={result.url}
                                url={result.url}
                                name={result.name}
                            />
                        }) : <div className="loading-message">Loading...</div>
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default App;
