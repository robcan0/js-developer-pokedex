// DOM REFERENCES
const pokemonListElement = document.getElementById('pokemon-list')
const loadMoreButton = document.getElementById('load-more-button')

// GLOBAL REFERENCES
window.pokemonListElement = pokemonListElement
window.loadMoreButton = loadMoreButton

// CONSTANTS
const MAX_RECORDS = 1025
const LIMIT = 10
let offset = 0

// POKEMON LIST ITEM FACTORY
window.convertPokemonToListItem = (pokemon, term = '') => {
    const name = term
        ? pokemon.name.replace(new RegExp(`(${term})`, 'gi'), '<mark>$1</mark>')
        : pokemon.name
    return `<li class="pokemon-card ${pokemon.primaryType}" role="button" tabindex="0" data-id="${pokemon.number}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${name}</span>
        <div class="detail" aria-hidden="true">
            <ul class="types">${pokemon.types.map(t => `<li class="type ${t}">${t}</li>`).join('')}</ul>
            ${pokemon.sprite ? `<img src="${pokemon.sprite}" alt="${pokemon.name} sprite" loading="lazy">` : ''}
        </div>
    </li>`
}

// LOAD POKEMON ITEMS
function loadPokemonItems(offset, limit) {
    loadMoreButton.textContent = 'Loading...'
    loadMoreButton.disabled = true
    pokemonListElement.setAttribute('aria-busy', 'true')
    return pokeApi.fetchPokemon(offset, limit)
        .then(pokemon => pokemonListElement.insertAdjacentHTML('beforeend', pokemon.map(p => window.convertPokemonToListItem(p)).join('')))
        .finally(() => {
            pokemonListElement.setAttribute('aria-busy', 'false')
            loadMoreButton.textContent = 'Load More'
            loadMoreButton.disabled = false
        })
}

// INITIAL LOAD
loadPokemonItems(offset, LIMIT).catch(console.error)

// LOAD MORE HANDLER
loadMoreButton.addEventListener('click', () => {
    offset += LIMIT
    const remaining = MAX_RECORDS - offset
    loadPokemonItems(offset, Math.min(remaining, LIMIT))
        .then(() => { if (remaining <= LIMIT) loadMoreButton.style.display = 'none' })
        .catch(console.error)
})

// RESET TO HOME STATE
window.resetToHomeState = () => {
    const searchInput = document.getElementById('pokemon-search-input')
    const noResults = document.getElementById('no-results-message')
    if (searchInput) searchInput.value = ''
    if (noResults) noResults.hidden = true
    document.getElementById('pokemon-modal')?.close()
    loadMoreButton.style.display = ''
    loadMoreButton.disabled = false
    offset = 0
    pokemonListElement.innerHTML = ''
    loadPokemonItems(0, LIMIT)
}

// NAVIGATION EVENT LISTENERS
document.querySelector('header h1')?.addEventListener('click', window.resetToHomeState)
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('pokemon-modal').open) window.resetToHomeState()
})