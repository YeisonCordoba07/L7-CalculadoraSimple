// Selecciona los botones y el párrafo
const botones = document.querySelectorAll("button");
const salidaPantalla = document.getElementById("entrada");
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
var vectorOperacion = [];
var esPrimeraEntrada = true;

const estructura = {
    numero: ["n", "o", ".", ")"],
    operador: ["n", "("],
    abreParentesis: ["n", "(", "o"],
    cierraParentesis: ["o", ")"],
    punto: ["n"]
};




function reiniciar(){
    entradaAnterior.letra = "";
    entradaAnterior.catergoria = "";
    entradaActual.letra = "";
    entradaActual.categoria = "";
    salidaPantalla.textContent = "";
    textoError.textContent = "";
    resultado = 0;
    contadorParentesis = 0;
    esValido = true;
    esPrimeraEntrada = true;
}




botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const contenidoBoton = boton.querySelector("span").textContent;

        console.log("contenido boton,", contenidoBoton);
        if(esPrimeraEntrada === true){

            switch (contenidoBoton){
                case ")":
                    esValido = false;
                    textoError.textContent = "No puede iniciar con )";
                break;
                case "*":
                    esValido = false;
                    textoError.textContent = "No puede iniciar con *";
                break;
                case "/":
                    esValido = false;
                    textoError.textContent = "No puede iniciar con /";
                break;
                case "+":
                    esValido = false;
                    textoError.textContent = "No puede iniciar con +";
                break;
                case ".":
                    esValido = false;

                    textoError.textContent = "No puede iniciar con .";
                break;

            }
            esPrimeraEntrada = false;
        }
            entradaAnterior.letra = entradaActual.letra;
            entradaAnterior.categoria = entradaActual.categoria;

            entradaActual.letra = contenidoBoton;
            entradaActual.categoria = identificarCategoria(entradaActual.letra);
        



        if (entradaActual.categoria === "especial") {

            switch (entradaActual.letra) {
                case "C":
                    reiniciar();
                    break;
                case "=":

                    if(contadorParentesis === 0 && esValido === true){

                        resultado = eval(salidaPantalla.textContent);
                        console.log("Resultado: ", resultado);

                        salidaPantalla.textContent = resultado;
                        entradaActual.letra = resultado;
                        entradaActual.categoria = "n";

                    }else{
                        esValido = false;
                        textoError.textContent = "Faltan parentesis";
                        console.log(textoError.textContent);
                    }
                    break;
                default:
                    break;       
            }
        }else{
            salidaPantalla.textContent = salidaPantalla.textContent + contenidoBoton;
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
            return "No puede haber un (";
        }
    } else if (entradaAnterior.categoria === "o") {
        if (!estructura.operador.includes(entradaActual.categoria)) {
            esValido = false;
            
            if(entradaActual.categoria === "o"){
                return "No puede haber otro operador seguido";
            }else if(entradaActual.categoria === "."){
                return "No puede haber un punto";
            }else if(entradaActual.categoria === ")"){
                return "No puede haber un )";
            }
            
            return "Se esperaba: Numero o (";
        }
    }else if (entradaAnterior.categoria === "(") {
        if (!estructura.abreParentesis.includes(entradaActual.categoria)) {
            esValido = false;

            if(entradaActual.categoria === ")"){
                return "No puede haber un )";
            }else if(entradaActual.categoria === "."){
                return "No puede haber un punto";
            }
            return "Se esperaba: Numero o (";
        }
    } else if (entradaAnterior.categoria === ")") {
        if (!estructura.cierraParentesis.includes(entradaActual.categoria)) {
            esValido = false;

            if(entradaActual.categoria === "n"){
                return "No puede haber un número seguido";
            }else if(entradaActual.categoria === "."){
                return "No puede haber un punto";
            }else if(entradaActual.categoria === "("){
                return "No puede haber un (.";
            }

            return "Se esperaba: Operador o )";
        }
    } else if (entradaAnterior.categoria === ".") {
        if (!estructura.punto.includes(entradaActual.categoria)) {
            esValido = false;
            return "Después de . solo puede ir un número";
        }
    }


    if(esValido === true){
        return "|";
    }
    return textoError.textContent;

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