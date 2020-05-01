//guardamos la carta_bocaabajo
const carta_bocaabajo = 'source/img/clave.svg';
//creamos lista con los object de todas las cartas
const card_list = [{id:1, name: 'Acordeon', src:'source/img/acordeon.svg'},
{id:2, name: 'Arpa', src:'source/img/arpa.svg'},
{id:3, name: 'Bateria', src:'source/img/bateria.svg'},
{id:4, name: 'Bongos', src:'source/img/bongos.svg'},
{id:5, name: 'Flauta', src:'source/img/flauta.svg'},
{id:6, name: 'Guitarra', src:'source/img/guitarra.svg'},
{id:7, name: 'Maracas', src:'source/img/maracas.svg'},
{id:8, name: 'Piano', src:'source/img/piano.svg'},
{id:9, name: 'Saxofon', src:'source/img/saxofon.svg'},
{id:10, name: 'Violin', src:'source/img/violin.svg'},
{id:11, name: 'Xilofono', src:'source/img/xilofono.svg'}]

class Field {
  constructor(row, col) {
    this.dimensions = [row, col];
    this.cards = [];
    this.board = [];
    this.flip_cards = ['', ''];
    this.num_flip_cards = 0;
  }
  //get the place of the cards
  get_cards(){
    let num_cards = this.dimensions[0]*this.dimensions[1]/2;
    let cards = [];
    for (var i = 0; i < num_cards; i++) {
      cards.push(card_list[i]);
      cards.push(card_list[i]);
    }
    cards.sort(()=>Math.random()<0.5);
    this.cards = Array(this.dimensions[0]);
    let count = 0;
    for (var i = 0; i < this.dimensions[0]; i++) {
      this.cards[i] = Array(this.dimensions[1]);
      for (var j = 0; j < this.dimensions[1]; j++) {
        this.cards[i][j] = cards[count];
        count++;
      }
    }
    return this.cards;
  }
  //get the board with all the cards facedown
  get_starting_board(){
    this.board = Array(this.dimensions[0])
    for (var i = 0; i < this.dimensions[0]; i++) {
      this.board[i] = {id: i, img:[]};
      for (var j = 0; j < this.dimensions[1]; j++) {
          this.board[i].img.push({id: j, src: carta_bocaabajo});
      }
    }
  }
  //Compare two cards
  compare_cards(){
    return(this.flip_cards[0].name === this.flip_cards[1].name)
  }
  //Flip a card
  flip_card(row, col){
    return(this.cards[row][col]);
  }
}

//Seleccionamos el elemento donde esta el codigo handlebars
const source = document.getElementById('tablero').innerHTML;
//Compilamos el codigo para procesarlo
const template = Handlebars.compile(source);
//creamos el tablero deseado
const tablero_juego = new Field(3,4);
tablero_juego.get_cards();
tablero_juego.get_starting_board();
const context = {tablero: tablero_juego.board};
//Pasamos el tablero al codigo compilado
const html = template(context);
//Seleccionamos el lugar donde vamos a poner el tablero y lo cambiamos por el mismo
document.getElementById('tablero_inicial').innerHTML = html;
