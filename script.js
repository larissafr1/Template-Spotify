// Obtém a referência do elemento com o ID "greeting"
const greetingElement = document.getElementById("greeting");

// Obtém a hora atual
const currentDate = new Date();
const currentHour = currentDate.getHours();

// BOM DIA | BOA TARDE | BOA NOITE
const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlatlist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url ="http://localhost:3000/artists?name_like=${searchTerm}"

    // fetch: usado para fazer requisições de API
    fetch(url)
        .then((Response) => Response.json())
        .then((result) => displayResults(result)) 
}

function displayResults(result) {
    resultPlatlist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;        
    });

    // exibir
    resultsArtist.classList.remove('hidden');
}

// manipulação de eventos 
document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    // === vê se são iguais e do mesmo tipo
    if (searchTerm === '') {
        resultPlatlist.classList.add('hidden');
        resultsArtist.classList.remove('hidden');

        // parar a execução porque não precisamos de mais nada para acontecer
        return;
    }

    requestApi(searchTerm);
})