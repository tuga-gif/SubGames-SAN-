const gameList = document.getElementById("game-list");
const addGameForm = document.getElementById("addGameForm");

// Função para carregar os jogos do localStorage
function loadGames() {
    const games = JSON.parse(localStorage.getItem("games")) || [];
    games.forEach(game => displayGame(game));
}

// Função para exibir um jogo na lista
function displayGame(game) {
    const gameItem = document.createElement("div");
    gameItem.classList.add("game-item");

    // Imagens
    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("images-container");
    game.images.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        imagesContainer.appendChild(img);
    });

    gameItem.appendChild(imagesContainer);

    // Informações do jogo
    const gameInfo = document.createElement("div");
    gameInfo.classList.add("game-info");

    const title = document.createElement("h3");
    title.textContent = game.name;
    gameInfo.appendChild(title);

    const description = document.createElement("p");
    description.textContent = game.description;
    gameInfo.appendChild(description);

    const price = document.createElement("p");
    price.textContent = `Preço: ${game.price}`;
    gameInfo.appendChild(price);

    const credits = document.createElement("p");
    credits.textContent = `Créditos: ${game.credits}`;
    gameInfo.appendChild(credits);

    const linkButton = document.createElement("a");
    linkButton.href = game.link;
    linkButton.classList.add("button");
    linkButton.textContent = "Ir para o Jogo";
    gameInfo.appendChild(linkButton);

    gameItem.appendChild(gameInfo);

    gameList.appendChild(gameItem);
}

// Função para adicionar um novo jogo
addGameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const gameName = document.getElementById("gameName").value;
    const gameDescription = document.getElementById("gameDescription").value;
    const gamePrice = document.getElementById("gamePrice").value;
    const gameCredits = document.getElementById("gameCredits").value;
    const gameLink = document.getElementById("gameLink").value;

    const gameImages = document.getElementById("gameImageFile").files;
    const gameVideo = document.getElementById("gameVideoFile").files[0];

    const imagesUrls = [];
    Array.from(gameImages).forEach(image => {
        imagesUrls.push(URL.createObjectURL(image)); // Criando URLs temporárias das imagens
    });

    const game = {
        name: gameName,
        description: gameDescription,
        price: gamePrice,
        credits: gameCredits,
        link: gameLink,
        images: imagesUrls,
        video: gameVideo ? URL.createObjectURL(gameVideo) : null
    };

    // Recupera os jogos existentes do localStorage e adiciona o novo jogo
    const games = JSON.parse(localStorage.getItem("games")) || [];
    games.push(game);

    // Armazena novamente no localStorage
    localStorage.setItem("games", JSON.stringify(games));

    // Exibe o jogo na página
    displayGame(game);

    // Limpa o formulário
    addGameForm.reset();
});

// Carrega os jogos ao abrir a página
window.addEventListener("load", loadGames);
