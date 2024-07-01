import "./pokemonCard.css"
import {useEffect, useState} from "react";
import axios from "axios";


function PokemonCard({url}) {

    const [pokemon, setPokemon] = useState(null);
    const [loaded, toggleLoaded] = useState(false);
    const [error, toggleError] = useState(false);

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
                setPokemon(response.data);
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
        {error && <p className="error-message">Sorry er is iets misgegaan!</p>}
        {loaded ?
            <div className="pokemon-card">
                <h1>{pokemon.name}</h1>
                <div className="image-container">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}/>
                </div>
                <p><strong>Moves:</strong> {pokemon.moves.length}</p>
                <p><strong>Weight:</strong> {pokemon.weight}</p>
                <h2>Abilities:</h2>
                <ul>
                    {pokemon.abilities.map((ability) => (
                        <li className="pokemon-abilities" key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div> : <div className="loading-message">Loading...</div>}
    </>
}

export default PokemonCard;