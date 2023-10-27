// Selecciona los botones y el párrafo
const botones = document.querySelectorAll("button");
const entrada = document.getElementById("entrada");

const entradaAnterior = {letra:"", categoria: ""};
const entradaActual = {letra:"", categoria: ""};

const numeros = ["0", "1", "2","3","4","5","6","7","8","9"];
const operadores = ["x", "/", "+", "-"];
const punto = ["."];
const abreParentesis = ["("];
const cierraParentesis = [")"];
const especiales = ["C", "B", "="];

const contadorParentesis = 0;
var estado = "correcto";

const estructura = {
    numero: ["n", "o", ".", ")"],
    operador: ["n", "("],
    abreParentesis: ["n", "("],
    cierraParentesis: ["o", ")"],
    punto: ["n"]
};  


// Agrega un evento de clic a cada botón
botones.forEach(boton => {
  boton.addEventListener("click", () => {

    entradaAnterior.letra = entradaActual.letra;
    entradaAnterior.categoria = entradaActual.categoria;

    const contenido = boton.querySelector("span").textContent;

    entradaActual.letra = contenido;
    entradaActual.categoria = identificarCategoria(entradaActual.letra);
    

    entrada.textContent = entrada.textContent + contenido;

    //console.log("Letra:", entradaActual.letra);
    //console.log("Categoría:", entradaActual.categoria);

    let continuar = verificarReglas();
    if(continuar=== true){

    }else{
        console.log(continuar);
    }
  });
});

function identificarCategoria(caracter){
    /*if(numeros.some(numero => numero === caracter) === true){
        return "n";
    }else if(caracter.some(operadores) === true){
        return "o";
    }else if(caracter.some(punto) === true){
        return ".";
    }else if(caracter.some(abreParentesis) === true){
        return "(";
    }else if(caracter.some(cierraParentesis) === true){
        return ")";
    }else if(caracter.some(especiales) === true){
        return "especial";
    }*/


    if (numeros.some(numero => numero === caracter)) {
        return "n";
    } else if (operadores.some(operador => operador === caracter)) {
        return "o";
    } else if (punto.some(p => p === caracter)) {
        return ".";
    } else if (abreParentesis.some(parentesis => parentesis === caracter)) {
        return "(";
    } else if (cierraParentesis.some(parentesis => parentesis === caracter)) {
        return ")";
    } else if (especiales.some(especial => especial === caracter)) {
        return "especial";
    }
    
}

function verificarReglas(){
    /*if(entradaAnterior.categoria === "n"){
        if(!estructura.numero.includes(entradaActual.categoria)){
            estado = "incorrecto";
            return "Se esperaba: Numero u Operador";
        }
    }else if(entradaAnterior.categoria === "o"){
        if(estructura.operador.some(numero => numero !== entradaActual.categoria)){
            estado = "incorrecto";
            return "Se esperaba: Numero o (";
        }
    }else if(entradaAnterior.categoria === "("){
        if(estructura.abreParentesis.some(numero => numero !== entradaActual.categoria)){
            estado = "incorrecto";
            return "Se esperaba: Numero o (";
        }
    }else if(entradaAnterior.categoria === ")"){
        if(estructura.cierraParentesis.some(numero => numero !== entradaActual.categoria)){
            estado = "incorrecto";
            return "Se esperaba: Operador o )";
        }
    }else if(entradaAnterior.categoria === "."){
        if(estructura.punto.some(numero => numero !== entradaActual.categoria)){
            estado = "incorrecto";
            return "Se esperaba: Numero";
        }
    }*/



    if (entradaAnterior.categoria === "n") {
        if (!estructura.numero.includes(entradaActual.categoria)) {
            estado = "incorrecto";
            return "Se esperaba: Numero u Operador";
        }
    } else if (entradaAnterior.categoria === "o" || entradaAnterior.categoria === "(") {
        if (!estructura.operador.includes(entradaActual.categoria)) {
            estado = "incorrecto";
            return "Se esperaba: Numero o (";
        }
    } else if (entradaAnterior.categoria === ")") {
        if (!estructura.operador.includes(entradaActual.categoria)) {
            estado = "incorrecto";
            return "Se esperaba: Operador o )";
        }
    } else if (entradaAnterior.categoria === ".") {
        if (!estructura.punto.includes(entradaActual.categoria)) {
            estado = "incorrecto";
            return "Se esperaba: Numero";
        }
    }
    
    return true;
}