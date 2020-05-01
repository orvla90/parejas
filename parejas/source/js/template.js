// link carta sin voltear
const carta_bocaabajo = 'source/img/clave.svg';
//Creamos lista de todas las cartas 
const cartas = ['source/img/acordeon.svg','source/img/arpa.svg','source/img/bateria.svg','source/img/bongos.svg','source/img/flauta.svg','source/img/guitarra.svg','source/img/maracas.svg','source/img/piano.svg','source/img/saxofon.svg','source/img/violin.svg','source/img/xilofono.svg'];
// crea una lista, que es una lista con tantas cartas como columnas
const crear_fila = (columnas) => {
	lista_inicial = [];
	n_col=0;
	while(n_col< columnas){
		n_col++;
		lista_inicial.push({element: 'col'+n_col, src:carta_bocaabajo});
	}
	return lista_inicial;
}
//creamos un tablero de dimensiones filas x columnas
const crear_tablero = (filas, columnas) => {
	const fila = crear_fila(columnas);
	tablero = [];
	n_fil = 0;
	while(n_fil<filas){
		n_fil++;
		tablero.push({id:'fil'+n_fil, img:fila})
	}
	return {dimensiones:tablero};
}
//Creamos tablero de las cartas vueltas
const tablero_juego = (filas, columnas) => {
	let n_cartas = filas*columnas;
	let posibles_cartas = [];
	let contador=0;
	while(contador<n_cartas/2){
		posibles_cartas.push(cartas[contador]);
		contador++;
	}
	cartas_a_elegir=[]
	posibles_cartas.forEach((element) => {
		cartas_a_elegir.push(element);
		cartas_a_elegir.push(element);});
	let i=1;
	let col_actual=0;
	let tablero=[];
	let fila=[];
	while(i<=cartas_a_elegir.length){
		if(cartas_a_elegir.length==1){
				i=2;
			}
		let pos_aleatoria = Math.floor(Math.random()*cartas_a_elegir.length);
		if(col_actual < columnas){
			fila.push(cartas_a_elegir[pos_aleatoria]);
			//elimina elementos .splice(pos_inicio, numero de posiciones que elimina);
			cartas_a_elegir.splice(pos_aleatoria, 1);
			col_actual++;
			//console.log('fila:');
			//console.log(fila);
		}else if(col_actual>=columnas){
			tablero.push(fila);
			fila=[];
			col_actual=0;
			//console.log('tablero:');
			//console.log(tablero);
		}
	}
	//console.log('tablero:');
	//console.log(tablero);
	tablero.push(fila);
	return tablero;
}
let cartas_jugadas = 0;
let carta_volteada = '';
const jugar_carta = () => {
	console.log(cartas_jugadas, imagen_seleccionada, fila_seleccionada, columna_seleccionada);
	if(cartas_jugadas == 0){
		imagen_seleccionada.src = tablero_juego_actual[fila_seleccionada][columna_seleccionada];
		cartas_jugadas++;
		carta_volteada = imagen_seleccionada;
		carta.removeEventListener('click', jugar_carta);
		return '';
	}else if (cartas_jugadas == 1 && tablero_juego_actual[fila][columna] == carta_volteada.src){
		imagen_seleccionada.src = tablero_juego_actual[fila][columna];
		cartas_jugadas=0;
		carta_volteada='';
		carta.removeEventListener('click', jugar_carta);
		return '';
	}else{
		imagen_seleccionada.src = tablero_juego_actual[fila][columna];
		cartas_jugadas=0;
		carta_volteada.addEventListener('click', jugar_carta);

		
		setTimeout(()=>{carta.src=carta_bocaabajo;carta_volteada.src=carta_bocaabajo;carta_volteada='';}, 2000)
		return '';
	}
}
const empezarJuego = (filas, columnas) => {
	/*let fila_seleccionada = 0;
	let columna_seleccionada = 0;
	let imagen_seleccionada = '';*/
	const tablero_juego_actual = tablero_juego(filas,columnas);
	//Seleccionamos el elemento donde esta el codigo handlebars
	const source = document.getElementById('tablero').innerHTML;
	//Compilamos el codigo para procesarlo
	const template = Handlebars.compile(source);
	//creamos el tablero deseado
	const context = crear_tablero(filas,columnas);
	//Pasamos el tablero al codigo compilado
	const html = template(context);
	//Seleccionamos el lugar donde vamos a poner el tablero y lo cambiamos por el mismo
	document.getElementById('tablero_inicial').innerHTML = html;


	const todas_filas = document.getElementById('tablero').querySelectorAll('div');

	todas_filas.forEach((fila) => {
		let fila_seleccionada=fila.id[3];
		const imagenes = fila.querySelectorAll('img');
		imagenes.forEach( (imagen) => {
			let columna_seleccionada=imagen.id[3];
			let imagen_seleccionada=imagen;
			imagen.addEventListener('click', jugar_carta);
		})
	})






	//seleccionamos la fila 1
/*	const fila1 = document.getElementById('fil1');
	//seleccionamos todas las imagenes de la fila 1
	const imgs_fi1a1 = fila1.querySelectorAll('img');
	//Creamos un onclick para cada img de la fila 1
	
	console.log(tablero_juego_actual);
	imgs_fi1a1.forEach( (img) =>{
		img.onclick = ()=>{
			jugar_carta(tablero_juego_actual, img, 0, img.id[3]-1);
		}})
		//()=> {
			//img.style.backgroundColor = 'lightgrey';
			//img.src = tablero_juego_actual[0][img.id[3]-1];
			
	//});
	const fila2 = document.getElementById('fil2');
	//seleccionamos todas las imagenes de la fila 1
	const imgs_fi1a2 = fila2.querySelectorAll('img');
	//Creamos un onclick para cada img de la fila 1
	imgs_fi1a2.forEach( (img2) =>{
		img2.onclick = ()=> {
			//img2.style.backgroundColor = 'lightgrey';
			//img2.src = tablero_juego_actual[1][img2.id[3]-1];
		}
	});
	const fila3 = document.getElementById('fil3');
	//seleccionamos todas las imagenes de la fila 1
	const imgs_fi1a3 = fila3.querySelectorAll('img');
	//Creamos un onclick para cada img de la fila 1
	imgs_fi1a3.forEach( (img3) =>{
		img3.onclick = ()=> {
			//img3.style.backgroundColor = 'lightgrey';
			//img3.src = tablero_juego_actual[2][img3.id[3]-1];
		}
	});

	*/
}

empezarJuego(3,4);
