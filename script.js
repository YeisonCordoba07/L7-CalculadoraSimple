// Selecciona los botones y el párrafo
const botones = document.querySelectorAll("button");
const entrada = document.getElementById("entrada");
const textoError = document.getElementById("error");

const entradaAnterior = { letra: "", categoria: "" };
const entradaActual = { letra: "", categoria: "" };

const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operadores = ["*", "/", "+", "-"];
const punto = ["."];
const abreParentesis = ["("];
const cierraParentesis = [")"];
const especiales = ["C", "<", "="];

var resultado = 0;
var contadorParentesis = 0;
var esValido = true;
var continuar = true;
var vectorOperacion = [];

const estructura = {
    numero: ["n", "o", ".", ")"],
    operador: ["n", "("],
    abreParentesis: ["n", "("],
    cierraParentesis: ["o", ")"],
    punto: ["n"]
};




function reiniciar(){
    entradaAnterior.letra = "";
    entradaAnterior.catergoria = "";
    entradaActual.letra = "";
    entradaActual.categoria = "";
    entrada.textContent = "";
    textoError.textContent = "";
    resultado = 0;
    contadorParentesis = 0;
    esValido = true;
    continuar = true;
}




// Agrega un evento de clic a cada botón
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        entradaAnterior.letra = entradaActual.letra;
        entradaAnterior.categoria = entradaActual.categoria;
        const contenido = boton.querySelector("span").textContent;
        entradaActual.letra = contenido;
        entradaActual.categoria = identificarCategoria(entradaActual.letra);


        if (entradaActual.categoria === "especial") {

            switch (entradaActual.letra) {
                case "C":
                    reiniciar();
                    break;
                case "<":
                    aux = entrada.textContent;
                    aux = aux.slice(0, -1);
                    entrada.textContent = aux;
                    break;
                case "=":
                    //resultado = eval(entrada.textContent);
                    //console.log("Resultado:", resutado);
                    if(contadorParentesis === 0 && esValido === true){

                        resultado = eval(entrada.textContent);
                        console.log("Resultado: ", resultado);

                        entrada.textContent = resultado;
                        entradaActual.letra = resultado;
                        entradaActual.categoria = "n";

                    }else{
                        esValido = false;
                        textoError.textContent = "Faltan parentesis";
                        console.log(textoError.textContent);
                    }
                    break;
                default:
                    let prueba = "Especial no identificado";
            }
        }else{
            entrada.textContent = entrada.textContent + contenido;
            //vectorOperacion.push(entrada.textContent);

            textoError.textContent = verificarReglas();
            if (textoError.textContent === true) {
    
            } else {
                console.log("Error: ", textoError.textContent);
            }
        }

        console.log("Letra:", entradaActual.letra);
        console.log("Categoría:", entradaActual.categoria);
    });
});





function identificarCategoria(caracter) {

    if (numeros.some(numero => numero === caracter)) {
        return "n";
    } else if (operadores.some(operador => operador === caracter)) {
        return "o";
    } else if (punto.some(p => p === caracter)) {
        return ".";
    } else if (abreParentesis.some(parentesis => parentesis === caracter)) {
        contadorParentesis = contadorParentesis + 1;
        return "(";
    } else if (cierraParentesis.some(parentesis => parentesis === caracter)) {
        contadorParentesis = contadorParentesis - 1;
        return ")";
    } else if (especiales.some(especial => especial === caracter)) {
        return "especial";
    }
}





function verificarReglas() {

    if (entradaAnterior.categoria === "n") {
        if (!estructura.numero.includes(entradaActual.categoria)) {
            esValido = false;
            return "Se esperaba: Numero u Operador";
        }
    } else if (entradaAnterior.categoria === "o" || entradaAnterior.categoria === "(") {
        if (!estructura.operador.includes(entradaActual.categoria)) {
            esValido = false;
            return "Se esperaba: Numero o (";
        }
    } else if (entradaAnterior.categoria === ")") {
        if (!estructura.operador.includes(entradaActual.categoria)) {
            esValido = false;
            return "Se esperaba: Operador o )";
        }
    } else if (entradaAnterior.categoria === ".") {
        if (!estructura.punto.includes(entradaActual.categoria)) {
            esValido = false;
            return "Se esperaba: Numero";
        }
    }

    return true;
}




// Operaciones
// function restar(numero1, numero2){
//     let numero1 = parseFloat(numero1);
//     let numero2 = parseFloat(numero2);

//     return numero1 - numero2; 
// }

// function sumar(numero1, numero2){
//     let numero1 = parseFloat(numero1);
//     let numero2 = parseFloat(numero2);

//     return numero1 + numero2; 
// }

// function multiplicar(numero1, numero2){
//     let numero1 = parseFloat(numero1);
//     let numero2 = parseFloat(numero2);

//     return numero1 * numero2; 
// }

// function dividir(numero1, numero2){
//     let numero1 = parseFloat(numero1);
//     let numero2 = parseFloat(numero2);

//     return numero1 / numero2; 
// }