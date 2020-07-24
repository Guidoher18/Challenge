var dna = []; //Contiene los strings de las secuencias de ADN


function secuencia_igual(secuencia) { //Devuelve true si hay 4 letras iguales en el string Por ej.: "AAAACG"
  var letras = secuencia.split("");
  var cuatro_iguales = false;

  function comparar_son_iguales(a, b, c, d) { 
    if (a === b && b === c && c === d) {
      cuatro_iguales = true;
    }
  }

  if (letras.length > 3) {
    for (i = 0; i < letras.length - 4; i++) {
      comparar_son_iguales(letras[i], letras[i + 1], letras[i + 2], letras[i + 3]);
      if (cuatro_iguales === true) {
        break; 
      } 
    } 
  }
  
  return cuatro_iguales;
}









/*
for (i = 0; i < letras.length - 4; i++) {
  if (comparar_son_iguales(letras[i], letras[i + 3])) {
    if (comparar_son_iguales(letras[i + 1], letras[i + 2])) {
      return true;
    }
    else {
      return false;
    }
  }
  else { 
    return false;
  }  
}
*/






/*function conteo_letra(secuencia) {
  //Cuenta cuántas veces aparece una letra en el string
  var letras = [];
  var A = 0;
  var T = 0;
  var G = 0;
  var C = 0;

  letras = secuencia[i].split(""); //Separo los caracteres

  for (j = 0; j < letras.legth; j++) {
    //Cuento las letras de cada string
    switch (letras[j]) {
      case "A":
        A++;
        break;
      case "a":
        A++;
        break;
      case "T":
        T++;
        break;
      case "t":
        T++;
        break;
      case "G":
        G++;
        break;
      case "g":
        G++;
        break;
      case "C":
        C++;
        break;
      case "c":
        C++;
        break;
    }
  }

  if (A === 4 || T === 4 || G === 4 || C === 4) {
    return true;
  }
}*/


