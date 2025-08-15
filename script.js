const cardArray = [
    { name: 'gato', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPUmHFME2OT90zzWmgTEGM936sTNaAA1gPQ&s' },
    { name: 'gato', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPUmHFME2OT90zzWmgTEGM936sTNaAA1gPQ&s' },
    { name: 'cachorro', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91aI9dlb_uJxbvxJ6f3XI2Yro4WaS1rwndw&s' },
    { name: 'cachorro', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91aI9dlb_uJxbvxJ6f3XI2Yro4WaS1rwndw&s' },
    { name: 'papagaio', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRd7oIKu9MwRSovdMDnmM7jSlSYX9pWQXzpg&s' },
    { name: 'papagaio', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRd7oIKu9MwRSovdMDnmM7jSlSYX9pWQXzpg&s' },
    { name: 'peixe', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxv2xzfcAzP9ktBkYlLepiN60NBKBmz6VjGA&s' },
    { name: 'peixe', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxv2xzfcAzP9ktBkYlLepiN60NBKBmz6VjGA&s' },
    { name: 'cavalo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLOKrfAuEDyI45RJzJRFcVMHw1Df_mVIoLA&s' },
    { name: 'cavalo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLOKrfAuEDyI45RJzJRFcVMHw1Df_mVIoLA&s' },
    { name: 'coelho', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3dKxty7kb-EaT14LNQ3NDGzP9JcOQwAt1Sw&s' },
    { name: 'coelho', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3dKxty7kb-EaT14LNQ3NDGzP9JcOQwAt1Sw&s' },
    { name: 'leao', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-c1dnkkClbryR_wsNo2IHaFWOZ-bXqtEjg&s' },
    { name: 'leao', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-c1dnkkClbryR_wsNo2IHaFWOZ-bXqtEjg&s' },
    { name: 'vaca', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHLtqHcmN_pwMe40avTqmx7QMVjXlRehXtw&s' },
    { name: 'vaca', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHLtqHcmN_pwMe40avTqmx7QMVjXlRehXtw&s' }
];

const grid = document.getElementById('grid');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

// Embaralha as cartas
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.addEventListener('click', flipCard);

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        cardElement.append(front, back);
        grid.appendChild(cardElement);
    });
}

function flipCard() {
    const id = this.getAttribute('data-id');

    // Evita clicar duas vezes na mesma carta
    if (cardsChosenId.includes(id) || this.classList.contains('flip')) return;

    cardsChosen.push(cardArray[id].name);
    cardsChosenId.push(id);

    this.classList.add('flip');
    this.querySelector('.back').innerHTML =
        `<img src="${cardArray[id].img}" alt="${cardArray[id].name}">`;

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[firstId].removeEventListener('click', flipCard);
        cards[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[firstId].classList.remove('flip');
        cards[secondId].classList.remove('flip');
        cards[firstId].querySelector('.back').innerHTML = '';
        cards[secondId].querySelector('.back').innerHTML = '';
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
        alert('Parabéns! Você encontrou todos os pares!');
    }
}

// Inicializa o jogo
createBoard();
