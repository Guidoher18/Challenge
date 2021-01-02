dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
isMutant(dna);

//CHALLENGE MUTANTES - DESAFÍO NIVEL 1 - JS

// Devuelve true si es dna "mutante", es decir que contiene 2 o más cadenas, en horizontal, vertical o diagonal con 4 letras seguidas (A,T,G,C)
// Por ej.: dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
function isMutant(dna) {
  var cantCadenasMutantes = 0;

  //Análisis "Horizontal" de la Secuencia
  function analisisHorizontal(dna) {

    //Devuelve "true" si el string posee 4 letras iguales y consecutivas. Ej.: "AAAAGT"
    //Se asume que secuencia.length >= 4
    function cadenaMutante(secuencia) {

      let letras = secuencia.split("");
      let cuatroIguales = false;

      function compararLetras(a, b, c, d) {
        if (a === b && b === c && c === d) {
          cuatroIguales = true;
        }
      }

      for (i = 0; i < letras.length - 3; i++) {
        if (cuatroIguales === true) {
          break;
        }

        compararLetras(
          letras[i],
          letras[i + 1],
          letras[i + 2],
          letras[i + 3]
        );
      }

      return cuatroIguales;
    }

    for (j = 0; j < dna.length; j++) {
      if (cantCadenasMutantes >= 2) {
        break;
      }
      if (cadenaMutante(dna[j]) === true) {
        cantCadenasMutantes += 1;
      }
    }
  }

  //Análisis "Vertical" de la Secuencia
  var caracteresSeparados = [];

  function generarDnaVertical(dna) {
    //Devuelve un array con las palabras que se forman en vertical
    //input["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
    //dividirCaracteres
    //output ["ACTACT","TATGCC","GGAACA","CTTACC","GGGGTT","ACTGAG"]

    function dividirCaracteres(dna) {
      /*input  ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        output [  ["A", "T", "G", "C", "G", "A"],
                  ["C", "A", "G", "T", "G", "C"],
                  ["T", "T", "A", "T", "G", "T"],
                  ["A", "G", "A", "A", "G", "G"],
                  ["C", "C", "C", "C", "T", "A"],
                  ["T", "C", "A", "C", "T", "G"]  ]*/
      let z = [];
      let w = [];

      for (x of dna) {
        w = x.split("");
        z.push(w);
      }

      return z;
    }

    caracteresSeparados = dividirCaracteres(dna);

    let nuevaCadenaArray = [];

    let dnaVertical = "";
    let arrayVerticales = [];

    for (k = 0; k < caracteresSeparados.length; k++) {
      for (l = 0; l < caracteresSeparados.length; l++) {
        nuevaCadenaArray.push(caracteresSeparados[l][k]);
      }

      for (m of nuevaCadenaArray) {
        dnaVertical = dnaVertical + m;
      }
      arrayVerticales.push(dnaVertical);
      dnaVertical = "";
      nuevaCadenaArray = [];
    }
    return arrayVerticales;
  }

  //Análisis "Diagonal" de la Secuencia
  function generarDnaDiagonal() {
    //Devuelve un array con las palabras que se forman en las diagonales >=4 letras
    let coordenadasIniciales = [[0, 0]];
    let coordenadasCompletas = [];
    let palabraDiagonal = "";
    let arrayDiagonal = [];

    for (a = 1; a < caracteresSeparados.length - 3; a++) {
      coordenadasIniciales.push([0, a]);
      coordenadasIniciales.push([a, 0]);
    }

    for (d of coordenadasIniciales) {
      let control = d[1];

      switch (d[0]) {
        case 0: //x = 0 tienen que llegar hasta y = length - 1 triángulo inferior
          control = d[1];
          break;
        default:
          // x <> 0 tiene que llegar hasta  x = length - 1 triángulo superior
          control = d[0];
          break;
      }

      let indice = 0;
      coordenadasCompletas.push(d);

      while (control < caracteresSeparados.length - 1) {
        coordenadasCompletas.push([
          coordenadasCompletas[indice][0] + 1,
          coordenadasCompletas[indice][1] + 1,
        ]);
        control += 1;
        indice += 1;
      }

      for (t of coordenadasCompletas) {
        palabraDiagonal = palabraDiagonal + caracteresSeparados[t[1]][t[0]];
      }

      arrayDiagonal.push(palabraDiagonal);
      coordenadasCompletas = [];
      palabraDiagonal = "";
    }

    return arrayDiagonal;
  }

  if (dna.length >= 2) {
    analisisHorizontal(dna);

    if (dna.length >= 4 && cantCadenasMutantes < 2) {
      analisisHorizontal(generarDnaVertical(dna));

      if (cantCadenasMutantes < 2) {
        analisisHorizontal(generarDnaDiagonal());
      }
    }
  } else {
    console.log("No es posible analizar secuencias con menos de 2 cadenas.");
  }

  //Resultado: ¿Es un mutante?
  if (cantCadenasMutantes >= 2) {
    return true;
  } else {
    return false;
  }
}