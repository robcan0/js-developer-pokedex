// API NAMESPACE
const pokeApi = {}

// RESPONSE PARSER
const parseResponse = r => { if (!r.ok) throw new Error(`HTTP error: ${r.status}`); return r.json() }

// POKEMON DETAIL CONVERTER
function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.primaryType = type

    pokemon.sprite = pokemonDetail.sprites.other?.dream_world?.front_default
        ?? pokemonDetail.sprites.front_default
        ?? ''

    return pokemon
}

// GET POKEMON DETAIL
pokeApi.getPokemonDetail = (pokemonEntry) => {
    return fetch(pokemonEntry.url)
        .then(parseResponse)
        .then(convertPokeApiDetailToPokemon)
}

// GET POKEMON LIST
pokeApi.fetchPokemon = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(parseResponse)
        .then((data) => data.results)
        .then((pokemonResults) => pokemonResults.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.allSettled(detailRequests))
        .then((results) => results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value)
        )
}