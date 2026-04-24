[Available in English](./README.md)

# Pokédex

Uma aplicação web de Pokédex responsiva e acessível, construída com HTML, CSS e JavaScript puros. Este projeto passou por uma evolução contínua, de um protótipo simples baseado em scripts até uma SPA modular e pronta para produção, com tema escuro, busca, modal de detalhes e reprodução de áudio.

---

## Descrição do Projeto

Este projeto consome a [PokéAPI](https://pokeapi.co/) para exibir cards de Pokémon com cores baseadas nos tipos, paginação e modais detalhados. Foi desenvolvido de forma iterativa, com cada fase introduzindo melhorias significativas em arquitetura, qualidade de código, acessibilidade e experiência do usuário.

O projeto serve como uma demonstração prática de como uma aplicação frontend evolui de um código de nível iniciante até padrões de produção, sem o uso de frameworks ou ferramentas de build.

---

## Screenshots

<table>
  <tr>
    <td><img src="./assets/screenshots/Light_ModePK.png" alt="Light Mode" width="100%"></td>
    <td><img src="./assets/screenshots/Dark_ModePK.png" alt="Dark Mode" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>Light Mode</b></td>
    <td align="center"><b>Dark Mode</b></td>
  </tr>
</table>

<table>
  <tr>
    <td><img src="./assets/screenshots/Modal_Light-PK.png" alt="Light Mode" width="100%"></td>
    <td><img src="./assets/screenshots/Modal_Dark-PK.png" alt="Dark Mode" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><b>Light Mode</b></td>
    <td align="center"><b>Dark Mode</b></td>
  </tr>
</table>

---

## Funcionalidades

### Funcionalidades Principais
- Exibe cards de Pokémon com nome, número, badges de tipo e sprite
- Cores de fundo dos cards baseadas no tipo (18 tipos)
- Carregamento paginado com botão **Load More**

### Funcionalidades Adicionadas ao Longo da Evolução
- **Busca** — filtra por nome, ID ou tipo em tempo real
- **Destaque na busca** — os termos encontrados são realçados com `<mark>` nos resultados
- **Clique no badge de tipo** — clicar em um badge dispara automaticamente uma busca por aquele tipo
- **Modal de detalhes** — elemento nativo `<dialog>` que exibe os detalhes do Pokémon ao clicar no card
- **Reprodução de áudio** — toca o grito do Pokémon ao abrir o modal; clique no card para reproduzir novamente
- **Toggle de som** — ativa/desativa o áudio dentro do modal
- **Tema escuro** — sistema de temas completo com persistência via `localStorage` e fallback por `prefers-color-scheme`
- **Toggle animado de Pokébola** — gira ao passar o mouse; transforma-se em Ultra Ball no tema escuro
- **Grid responsivo** — adapta-se de 1 a 8 colunas conforme os breakpoints
- **Acessibilidade** — skip link, atributos `aria-*`, estilos `focus-visible`, navegação por teclado
- **Pokédex estendida** — ampliada dos 151 originais para todos os 1025 Pokémon

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura semântica, `<dialog>`, `<header>`, `<main>`, `<footer>` |
| CSS3 | Custom properties, Grid, layout responsivo, transições |
| Vanilla JavaScript (ES6+) | Class fields, `Promise.allSettled`, `async/await`, módulos |
| [PokéAPI](https://pokeapi.co/) | Dados dos Pokémon (nomes, tipos, sprites) |
| [PokeAPI Cries](https://github.com/PokeAPI/cries) | Gritos dos Pokémon em áudio (.ogg) |
| Normalize.css | Reset de CSS entre navegadores |
| Google Fonts — Roboto | Tipografia |
| Font Awesome 6 | Ícones do modal (fechar, som) |

---

## Estrutura do Projeto

```
/
├── index.html
└── assets/
    ├── screenshots/
    │   ├── Light_ModePK.png
    │   ├── Dark_ModePK.png
    │   ├── Modal_Light-PK.png
    │   └── Modal_Dark-PK.png
    ├── css/
    │   ├── colors.css       # Custom properties de CSS: cores de tipo e tokens de UI
    │   ├── global.css       # Body, header, footer, layout
    │   ├── pokedex.css      # Estilos do grid e dos cards de Pokémon
    │   ├── modal.css        # Estilos do dialog e do card no modal
    │   ├── search.css       # Estilos do input de busca e dos destaques
    │   └── dark-mode.css    # Overrides do tema escuro e componente Pokébola
    └── js/
        ├── pokemonModel.js  # Definição da classe Pokemon
        ├── pokeApi.js       # Fetch da API e mapeamento de dados
        ├── main.js          # Renderização da lista, paginação, reset de estado
        ├── modal.js         # Abertura/fechamento do modal, reprodução de áudio
        ├── search.js        # Filtragem de busca, pré-carregamento de dados
        └── darkMode.js      # Toggle de tema e persistência

        
```

---

## Instalação

Não é necessária nenhuma etapa de build nem o uso de gerenciador de pacotes.

```bash
git clone https://github.com/your-username/pokedex.git
cd pokedex
```

Abra o `index.html` diretamente no navegador, ou sirva localmente:

```bash
# Usando Python
python -m http.server 8080

# Usando Node.js (npx)
npx serve .
```

Em seguida, acesse `http://localhost:8080`.

> **Observação:** A aplicação busca dados da PokéAPI. É necessária uma conexão com a internet.

---

## Como Usar

| Ação | Resultado |
|---|---|
| Rolar a página / clicar em **Load More** | Carrega o próximo lote de Pokémon |
| Digitar na barra de busca | Filtra por nome, número ou tipo em tempo real |
| Clicar em um badge de tipo | Dispara uma busca pelo tipo selecionado |
| Clicar em um card de Pokémon | Abre o modal de detalhes e toca o grito do Pokémon |
| Clicar em qualquer lugar do card dentro do modal | Reproduz o grito novamente |
| Clicar no ícone de som | Ativa/desativa o áudio |
| Clicar na Pokébola (canto superior direito) | Alterna entre os temas claro e escuro |
| Clicar no título **Pokédex** | Volta ao estado inicial |
| Pressionar `Escape` (com o modal fechado) | Volta ao estado inicial |

---

## Evolução do Código

O projeto evoluiu ao longo de duas fases distintas.

### Fase 1 — Protótipo

- Um único `index.html` com referências `<script>` inline e sem `defer`
- Três arquivos JS sem separação clara de responsabilidades
- `innerHTML +=` para renderização da lista (causa um re-parse completo do DOM a cada adição)
- `Promise.all` para fetches paralelos (uma falha cancelava todo o lote)
- Cores de tipo como regras CSS simples com valores hex fixos no código
- Um único arquivo CSS com todas as regras misturadas
- Sem tratamento de erros nas respostas dos fetches
- Limitado aos 151 Pokémon originais
- Sem nenhuma consideração de acessibilidade

### Fase 2 — SPA Refatorada

- Seis módulos JS, cada um com uma única responsabilidade
- Seis arquivos CSS, cada um com escopo definido
- `insertAdjacentHTML('beforeend', ...)` substitui `innerHTML +=`
- `Promise.allSettled` com filtragem somente de resultados bem-sucedidos — resiliente a falhas parciais na API
- Custom properties de CSS substituem todos os valores de cor fixos no código
- `defer` em todos os scripts; ordem de carregamento garantida
- Tratamento de erros HTTP via função centralizada `parseResponse`
- `MAX_RECORDS` estendido para 1025
- Revisão completa de acessibilidade: skip link, `aria-busy`, `aria-live`, `role="button"`, `tabindex`, `focus-visible`

---

## Destaques da Refatoração

### Convenções de Nomenclatura
| Antes | Depois | Motivo |
|---|---|---|
| `type` | `primaryType` | Evita colisão com palavra reservada do DOM; mais descritivo |
| `pokemon.photo` | `pokemon.sprite` | Alinhado à terminologia da PokéAPI |
| `pokemonList` | `pokemon-list` (id HTML) | kebab-case consistente para ids HTML |
| `loadMoreButton` | `load-more-button` (id HTML) | Mesma convenção aplicada em todo o projeto |
| `getPokemons` | `fetchPokemon` | Pokémon é invariável no plural; prefixo `fetch` sinaliza chamada de rede assíncrona |

### Sintaxe e Semântica
- `class Pokemon { type; types = []; photo; }` → `class Pokemon { primaryType = null; types = []; sprite = null; }` — valores padrão explícitos como `null` documentam a intenção
- `<ol>` substituído por `<ul>` — a lista não tem ordem significativa; `<ol>` implicava uma sequência relevante
- `<section>` substituído por `<main>` — papel de landmark correto para o conteúdo principal
- Cores de tipo migradas de `.fire { background-color: #ee7f30 }` para `--type-fire: #ee7f30` com `.fire { background-color: var(--type-fire) }` — fonte única de verdade, facilita a criação de temas

### Modularização
Cada arquivo JS agora possui exatamente uma responsabilidade:
- `pokemonModel.js` — apenas a estrutura de dados
- `pokeApi.js` — apenas rede e mapeamento
- `main.js` — apenas renderização da lista e paginação
- `modal.js` — apenas ciclo de vida do dialog e áudio
- `search.js` — apenas lógica de filtragem e feedback visual
- `darkMode.js` — apenas estado do tema e persistência

### Resiliência
`Promise.all` foi substituído por `Promise.allSettled`:
```js
// Antes — um fetch com falha rejeita todo o lote
.then(requests => Promise.all(requests))

// Depois — fetches com falha são silenciosamente ignorados
.then(requests => Promise.allSettled(requests))
.then(results => results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
)
```

---

## Desafios e Melhorias

- **Sprites `dream_world`** — alguns Pokémon (especialmente da Gen 5 em diante) retornam `null` para o SVG do dream world. A implementação atual usa nullish coalescing (`??`) para fazer fallback para `front_default`, evitando elementos de imagem quebrados.
- **Pré-carregamento da busca** — carregar todos os 1025 Pokémon ao focar no campo de busca introduz um delay de ~1–2s no primeiro uso. Um estado de carregamento no placeholder do input reduz a latência percebida.
- **Comunicação entre módulos** — sem um module bundler, `window.convertPokemonToListItem` e `window.resetToHomeState` são expostos como globais. Essa é uma troca conhecida para evitar `import/export` sem uma etapa de build.
- **Política de autoplay de áudio** — navegadores bloqueiam áudio sem interação do usuário. `NotAllowedError` e `AbortError` são capturados e suprimidos; todos os demais erros de áudio são registrados no console.

---

## Melhorias Futuras

### Modal — About
- [ ] Espécie, status lendário e status mítico do Pokémon
- [ ] Habilidades, cor, forma e itens segurados

### Modal — Details
- [ ] Peso, altura e EXP base
- [ ] Status com barras de progresso estilizadas conforme a cor do header do modal

### Modal — Moves
- [ ] Lista de movimentos com métodos de aprendizado

### Modal — Locations
- [ ] Habitat, áreas do Pal Park, condições e métodos de encontro, e áreas de localização

### Modal — Games
- [ ] Geração, taxa de crescimento, gatilhos de evolução, versões e entradas da Pokédex

### Modal — Evolutions
- [ ] Cadeia evolutiva completa com apenas o Pokémon atual destacado como ativo

### Geral
- [ ] Lista de favoritos persistida no `localStorage`
- [ ] Painel de filtros por geração, tipo ou faixa de estatísticas
- [ ] Scroll infinito como alternativa ao botão Load More
- [ ] Substituir os globais `window.*` por módulos ES nativos (`type="module"`)
- [ ] Service Worker para suporte offline e cache de assets
- [ ] Testes unitários para `pokeApi.js` e a lógica de filtragem de busca
- [ ] Pipeline de CI/CD com GitHub Actions para linting e deploy

---

## Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).

Os dados e assets de Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/) e são propriedade da Nintendo / Game Freak. Este projeto não possui nenhuma afiliação ou endosso da Nintendo.

---

## Créditos

Este projeto foi desenvolvido com o apoio da plataforma [DIO (Digital Innovation One)](https://github.com/digitalinnovationone), sob orientação do desenvolvedor [Renan Johannsen de Paula.](https://github.com/RenanJPaula)