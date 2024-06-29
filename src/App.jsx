import './App.css'
import PokemonDetails from "./components/pokemon-details/PokemonDetails.jsx";

function App() {

    return (
        <>
            <div className="outer-content-container">
                <div className="inner-content-container">
                    <img src="../src/assets/Pokémon.svg" alt="Pokemon Logo"/>
                </div>
                <div className="inner-content-container">
                    <button className="button" type="button">Vorige</button>
                    <button className="button" type="button">Volgende</button>
                </div>

                <div className="inner-content-container">
                    <section className="pokemon-container">
                        <PokemonDetails/>
                        <PokemonDetails/>
                        <PokemonDetails/>
                    </section>
                </div>


            </div>

        </>
    )
}

export default App
