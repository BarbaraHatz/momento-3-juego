// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const startGameBtn = document.getElementById('start-game');
const playAgainBtn = document.getElementById('play-again');
const gameBoard = document.getElementById('game-board');
const attemptsCount = document.getElementById('attempts-count');
const finalAttempts = document.getElementById('final-attempts');

// Estado del juego
let attempts = 0;
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

// Productos químicos
const products = [
    'Solvente',
    'Diluyente',
    'Fosfatizante',
    'Dieléctrico'
];

// Crear pares de cartas
const cards = [...products, ...products];

// Función para mezclar las cartas
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para crear las cartas en el tablero
function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffleCards([...cards]);
    
    shuffledCards.forEach((product, index) => {
        // Crear la carta
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.product = product;
        
        // Crear el frente de la carta
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        // Crear la imagen
        const img = document.createElement('img');
        img.src = 'imagenes/tambores.jpg';
        img.alt = product;
        
        // Crear el nombre del producto
        const productName = document.createElement('div');
        productName.className = 'product-name';
        productName.textContent = product;
        
        // Agregar elementos al frente
        cardFront.appendChild(img);
        cardFront.appendChild(productName);
        
        // Crear el reverso de la carta
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = '?';
        
        // Agregar frente y reverso a la carta
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        
        // Agregar evento de clic
        card.addEventListener('click', () => flipCard(card));
        
        // Agregar la carta al tablero
        gameBoard.appendChild(card);
    });
}

// Función para voltear una carta
function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        attempts++;
        attemptsCount.textContent = attempts;
        checkMatch();
    }
}

// Función para verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.product === card2.dataset.product;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === products.length) {
            setTimeout(endGame, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Función para crear confeti
function createConfetti() {
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#FF6347'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        // Remover el confeti después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Función para terminar el juego
function endGame() {
    finalAttempts.textContent = attempts;
    showScreen(resultsScreen);
    createConfetti();
}

// Función para mostrar una pantalla
function showScreen(screen) {
    [welcomeScreen, gameScreen, resultsScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Función para reiniciar el juego
function resetGame() {
    attempts = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    attemptsCount.textContent = '0';
    createBoard();
}

// Event Listeners
startGameBtn.addEventListener('click', () => {
    resetGame();
    showScreen(gameScreen);
});

playAgainBtn.addEventListener('click', () => {
    resetGame();
    showScreen(gameScreen);
}); 