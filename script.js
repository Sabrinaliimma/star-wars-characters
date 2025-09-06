const mainContent = document.getElementById('main-content');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');

let characters = [];
let currentPage = 1;
const itemsPerPage = 12;
let totalPages = 1;

// Mostrar modal com detalhes do personagem
function showModal(character) {
  modal.style.visibility = 'visible';
  modalContent.innerHTML = `
    <div class="character-image" style="background-image: url('${character.image || "./assets/default-character.jpg"}')"></div>
    <h2 class="character-details">${character.name}</h2>
    <p class="character-details"><strong>Espécie:</strong> ${character.species || 'Desconhecida'}</p>
    <p class="character-details"><strong>Planeta natal:</strong> ${character.homeworld || 'Desconhecido'}</p>
    <p class="character-details"><strong>Altura:</strong> ${character.height || 'Desconhecida'} cm</p>
    <p class="character-details"><strong>Peso:</strong> ${character.mass || 'Desconhecido'} kg</p>
  `;
}

// Fechar modal
function hideModal() {
  modal.style.visibility = 'hidden';
}

// Renderiza a página atual
function renderPage() {
  mainContent.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = characters.slice(start, end);

  pageItems.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('cards');

    const imageUrl = character.image || './assets/default-character.jpg';
    card.style.backgroundImage = `url('${imageUrl}')`;

    card.innerHTML = `
      <div class="character-name-bg">
        <span class="character-name">${character.name}</span>
      </div>
    `;

    card.addEventListener('click', () => showModal(character));
    mainContent.appendChild(card);
  });

  // Atualiza estado dos botões
  backButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  backButton.style.visibility = currentPage === 1 ? 'hidden' : 'visible';
  nextButton.style.visibility = currentPage === totalPages ? 'hidden' : 'visible';
}

// Eventos dos botões
backButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

// Consumir Akabab API
fetch('https://akabab.github.io/starwars-api/api/all.json')
  .then(res => res.json())
  .then(data => {
    characters = data;
    totalPages = Math.ceil(characters.length / itemsPerPage);
    renderPage();
  })
  .catch(err => console.error('Erro ao carregar personagens:', err));

