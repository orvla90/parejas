const carta_bocaabajo = 'source/img/clave.svg';
let fila_empiece ='<div>';
let fila_final = '</div>';
const src_imagen =(link) => {
	return "<img src='"+link+"'>";
}
const tablero = (filas, columnas) => {
	n_col=0;
	let imgs = '';
	while (n_col<filas) {
		n_col++;
		imgs.append(src_imagen(carta_bocaabajo));
	}
	let fila_completa = fila_empiece + imgs + fila_final;
	console.log(fila_completa);
	return fila_completa*filas;
};
export *;