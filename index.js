const cardContainer = document.getElementById('card');
const pesquisaForm = document.getElementById('pesquisa');
const pesquisaInput = document.getElementById('pesquisaNome');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');
const modalCaracteristica = document.getElementById('modal-caracteristica')
const modalInformacao = document.getElementById('modal-informacao')
const modal =  new bootstrap.Modal(document.getElementById('modal'))

let page = 1;

function buscarCaracteristicas(personagem) {
    axios.get(`https://rickandmortyapi.com/api/character?page=${personagem}`)
        .then(response => {
            const caracteristica = response.data.results;

            cardContainer.innerHTML = '';

            caracteristica.forEach(character => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = 
                 `
                    <div class="card">
                        <img src="${character.image}" class="card-img-top" alt="${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">Status: ${character.status}</p>
                            <p class="card-text">Species: ${character.species}</p>
                        </div>
                    </div>
                `;
            cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

pesquisaForm.addEventListener('submit', event => {
    event.preventDefault();

    const pesquisaNomeP = pesquisaInput.value;

    if (pesquisaNomeP !== '') {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${pesquisaNomeP}`)
            .then(response => {
                const caracteristica = response.data.results;

                cardContainer.innerHTML = '';

                caracteristica.forEach(character => {
                    const card = document.createElement('div');
                    card.className = 'col-md-4 mb-4';
                    card.innerHTML = `
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text">Status: ${character.status}</p>
                                <p class="card-text">Species: ${character.species}</p>
                                <button class="btn btn-success" onclick="abrirModal('${character.species}', '${character.name}')"
                                 >Abrir</button>
                            </div>
                        </div>
                    `;
                    cardContainer.appendChild(card);
                });
            })
           
    }
});

btnAnterior.addEventListener('click', () => {
    if (page > 1) {
        page--;
        buscarCaracteristicas(page);
    }
});

btnProximo.addEventListener('click', () => {
    page++;
    buscarCaracteristicas(page);

});

buscarCaracteristicas(page);
  


function abrirModal(specie, name) {
    modalCaracteristica.innerHTML = specie;
    modalInformacao.innerHTML = name;
    modal.show();
}

function fecharModal() {
    modal.hide();
}


