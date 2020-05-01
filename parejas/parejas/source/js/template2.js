document.addEventListener('DOMContentLoaded', () => {

  //guardamos la carta_bocaabajo
  const carta_bocaabajo = 'source/img/clave.svg';
  //creamos lista con los object de todas las cartas
  const all_cards = [{name: 'Acordeon', src:'source/img/acordeon.svg'},
      {name: 'Acordeon', src:'source/img/acordeon.svg'},
      {name: 'Arpa', src:'source/img/arpa.svg'},
      {name: 'Arpa', src:'source/img/arpa.svg'},
      {name: 'Bateria', src:'source/img/bateria.svg'},
      {name: 'Bateria', src:'source/img/bateria.svg'},
      {name: 'Bongos', src:'source/img/bongos.svg'},
      {name: 'Bongos', src:'source/img/bongos.svg'},
      {name: 'Flauta', src:'source/img/flauta.svg'},
      {name: 'Flauta', src:'source/img/flauta.svg'},
      {name: 'Guitarra', src:'source/img/guitarra.svg'},
      {name: 'Guitarra', src:'source/img/guitarra.svg'},
      {name: 'Maracas', src:'source/img/maracas.svg'},
      {name: 'Maracas', src:'source/img/maracas.svg'},
      {name: 'Piano', src:'source/img/piano.svg'},
      {name: 'Piano', src:'source/img/piano.svg'},
      {name: 'Saxofon', src:'source/img/saxofon.svg'},
      {name: 'Saxofon', src:'source/img/saxofon.svg'},
      {name: 'Violin', src:'source/img/violin.svg'},
      {name: 'Violin', src:'source/img/violin.svg'},
      /*{name: 'Xilofono', src:'source/img/xilofono.svg'},
      {name: 'Xilofono', src:'source/img/xilofono.svg'}*/];
  const grid = document.getElementById('grid');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let card_list = [];

  //Create board
  function createBoard() {
    let id = this.getAttribute('id');
    let size = Number(id[0])*Number(id[2]);
    for (let i = 0; i < size; i++) {
      card_list.push(all_cards[i]);
    }
    card_list.sort(()=>Math.random()-0.5);
    const tableros = document.getElementById('tablero_inicial');
    tableros.style.display = 'none';
    for (let i = 0; i < size; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', carta_bocaabajo);
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }

  function checkForMatch() {
    let cards = document.querySelectorAll('img');
    if(cardsChosen[0] !== cardsChosen[1]){
      cards[cardsChosenId[0]].setAttribute('src', carta_bocaabajo);
      cards[cardsChosenId[1]].setAttribute('src', carta_bocaabajo);
    }else{
      cards[cardsChosenId[0]].removeEventListener('click', flipCard);
      cards[cardsChosenId[1]].removeEventListener('click', flipCard);
      cardsWon.push(cards[cardsChosenId[0]]);
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === card_list.length/2) {
      alert('You found them all!!!');
      location.reload();
    }
  }

  function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(card_list[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', card_list[cardId].src);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  const board1 = document.getElementById('2x3');
  board1.addEventListener('click', createBoard);
  const board2 = document.getElementById('3x4');
  board2.addEventListener('click', createBoard);
  const board3 = document.getElementById('4x4');
  board3.addEventListener('click', createBoard);
  const board4 = document.getElementById('4x5');
  board4.addEventListener('click', createBoard);
})