import "./pokemonDetails.css"
import {useEffect, useState} from "react";
import axios from "axios";

function PokemonDetails() {

    const [pokemons, setPokemons] = useState(null);
    const [loaded, toggleLoaded] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        toggleLoaded(false);
        toggleError(false);
        const controller = new AbortController();
        const getPokemons = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto",
                    {
                        signal: controller.signal,
                    });
                setPokemons(response.data);
                console.log(response.data);
                toggleLoaded(true);
                return function cleanup() {
                    controller.abort();
                }
            } catch (error) {
                toggleError(true);
            }
        }
        getPokemons();


    }, []);

    return <>
        {loaded &&
            <div className="pokemon-card">
                <h1>{pokemons.name}</h1>
                <div className="image-container">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
                        alt="Ditto"/>
                </div>
                <h2>Abilities:</h2>
                <ul>
                    {pokemons.abilities.map((pokemon) => (
                        <li key={pokemon.id}>{pokemon.ability.name}</li>
                    ))}
                </ul>
                <h2>Moves:</h2>
                <ul>
                    {pokemons.moves.map((pokemon) => (
                        <li key={pokemon.id}>{pokemon.move.name}</li>
                    ))}
                </ul>
                <p>Weight: {pokemons.weight}</p>
            </div>
        }
        {error && <p className="error-message">Sorry er is iets misgegaan!</p>}
    </>
}

export default PokemonDetails;