
const source = document.getElementById('tablero').innerHTML;

const template = Handlebars.compile(source);
const context = {dimensiones: 
	[[{numero:1}, {numero:2}], [{numero:2}, {numero:4}], [{numero:4}, {numero:1}]]};

const html = template(context);

document.getElementById('title').innerHTML = html;

