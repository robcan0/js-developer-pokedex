// DOM REFERENCES
const modal = document.getElementById('pokemon-modal')
const audio = new Audio()
let soundEnabled = true

// MODAL UPDATER
const renderModal = (pokemon) => {
    const pokemonCard = modal.querySelector('.pokemon-card')
    pokemonCard.className = `pokemon-card ${pokemon.primaryType}`
    pokemonCard.querySelector('.number').textContent = `#${pokemon.number}`
    document.getElementById('modal-pokemon-name').textContent = pokemon.name
    pokemonCard.querySelector('.types').innerHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')
    const pokemonImage = modal.querySelector('.modal-image')
    pokemonImage.src = pokemon.sprite
    pokemonImage.alt = `${pokemon.name} sprite`

    // AUDIO PLAYBACK
    if (soundEnabled) {
        audio.pause()
        audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.number}.ogg`
        audio.play().catch(error => {
            if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') console.warn('Audio playback failed:', error)
        })
    }
    if (!modal.open) modal.showModal()
}

// OPEN POKEMON MODAL
const openPokemonModal = async (pokemonCard) => {
    try {
        const pokemonId = +pokemonCard.dataset.id
        const pokemon = (typeof pokemonSearchState !== 'undefined' && pokemonSearchState.all.find(entry => entry.number === pokemonId))
            || (await pokeApi.fetchPokemon(pokemonId - 1, 1))[0]
        if (pokemon) renderModal(pokemon)
    } catch (error) { console.error('Failed to load pokemon details', error) }
}

// POKEMON LIST EVENT LISTENERS
window.pokemonListElement.addEventListener('click', (event) => {
    const pokemonCard = event.target.closest('.pokemon-card')
    if (pokemonCard) openPokemonModal(pokemonCard)
})
window.pokemonListElement.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    const pokemonCard = event.target.closest('.pokemon-card')
    if (pokemonCard) { event.preventDefault(); openPokemonModal(pokemonCard) }
})

// MODAL EVENT LISTENERS
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close() })
modal.addEventListener('close', () => audio.pause())
modal.querySelector('.modal-close').addEventListener('click', () => modal.close())

// SOUND TOGGLE HANDLER
modal.querySelector('.sound-toggle').addEventListener('click', (event) => {
    soundEnabled = !soundEnabled
    event.currentTarget.querySelector('i').className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark'
    if (!soundEnabled) audio.pause()
})

// MODAL CARD SOUND REPLAY
modal.querySelector('.pokemon-card').addEventListener('click', (event) => {
    if (event.target.closest('button')) return
    if (soundEnabled && audio.src) {
        audio.currentTime = 0
        audio.play().catch(error => {
            if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') console.warn('Audio playback failed:', error)
        })
    }
})