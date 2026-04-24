// DOM REFERENCES
const searchInput = document.getElementById('pokemon-search-input')
const noResultsMessage = document.getElementById('no-results-message')

// SEARCH STATE
const pokemonSearchState = { all: [], isLoading: false }

// SEARCH DATA PRELOADER
searchInput.addEventListener('focus', async () => {
    if (pokemonSearchState.all.length || pokemonSearchState.isLoading) return
    pokemonSearchState.isLoading = true
    const savedPlaceholder = searchInput.placeholder
    searchInput.placeholder = "Who’s that Pokémon?"
    try {
        pokemonSearchState.all = await pokeApi.fetchPokemon(0, 1025)
    } catch (error) {
        console.error('Failed to pre-load search data:', error)
    } finally {
        pokemonSearchState.isLoading = false
        searchInput.placeholder = savedPlaceholder
        if (searchInput.value.trim()) searchInput.dispatchEvent(new Event('input'))
    }
})

// SEARCH INPUT HANDLER
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase()
    if (!searchTerm) { window.resetToHomeState(); return }
    window.loadMoreButton.style.display = 'none'
    if (pokemonSearchState.isLoading) return
    const matchingPokemon = pokemonSearchState.all.filter(pokemon =>
        pokemon.name.includes(searchTerm) ||
        pokemon.number.toString().includes(searchTerm) ||
        pokemon.types.some(type => type.includes(searchTerm))
    )
    window.pokemonListElement.innerHTML = matchingPokemon.map(pokemon => window.convertPokemonToListItem(pokemon, searchTerm)).join('')
    noResultsMessage.hidden = matchingPokemon.length > 0
})

// TYPE BADGE CLICK HANDLER
document.addEventListener('click', (event) => {
    const typeBadge = event.target.closest('.pokemon-card .type')
    if (!typeBadge) return
    event.stopPropagation()
    searchInput.value = typeBadge.textContent.trim()
    searchInput.dispatchEvent(new Event('focus'))
    searchInput.dispatchEvent(new Event('input'))
})