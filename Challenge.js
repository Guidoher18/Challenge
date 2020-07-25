function isMutant(dna) {
  var cant_cadena_mutante = 0;

  function secuencia_igual(secuencia) {
    //A partir de un string, devuelve "true" si hay 4 letras iguales y consecutivas
    // "AAAAGT" -> true, "AAAGAT" -> false, "AAA" -> false

    var letras = secuencia.split("");
    var cuatro_iguales = false;

    function comparar_son_iguales(a, b, c, d) {
      if (a === b && b === c && c === d) {
        cuatro_iguales = true;
      }
    }

    if (letras.length > 3) {
      for (i = 0; i < letras.length - 4; i++) {
        comparar_son_iguales(
          letras[i],
          letras[i + 1],
          letras[i + 2],
          letras[i + 3]
        );
        if (cuatro_iguales === true) {
          break;
        }
      }
    }

    return cuatro_iguales;
  }

  //Análisis "Horizontal" de la Secuencia
  function analisisHorizontal(dna) {
    for (j = 0; j < dna.length; j++) {
      if (cant_cadena_mutante >= 2) {
        break;
      }
      if (secuencia_igual(dna[j]) === true) {
        cant_cadena_mutante += 1;
      }
    }
  }

  analisisHorizontal(dna);

  //Análisis "Vertical" de la Secuencia
  function generar_dna_vertical(dna) {
    var z = [];
    var w = [];
    var nueva_cadena_array = [];
    var dna_vertical = "";
    var array_verticales = [];

    for (x of dna) {
      w = x.split("");
      z.push(w);
    }

    for (k = 0; k < z.length; k++) {
      for (l = 0; l < z.length; l++) {
        nueva_cadena_array.push(z[l][k]);
      }
      for (m of nueva_cadena_array) {
        dna_vertical = dna_vertical + m;
      }
      array_verticales.push(dna_vertical);
      dna_vertical = "";
      nueva_cadena_array = [];
    }

    return array_verticales;
  }

  analisisHorizontal(generar_dna_vertical(dna));


  //Resultado
  if (cant_cadena_mutante >= 2) {
    return true;
  } else {
    return false;
  }
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
