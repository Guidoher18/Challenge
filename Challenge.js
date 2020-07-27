//CHALLENGE MUTANTES - DESAFÍO NIVEL 1 - JS
function isMutant(dna) {
  // Por ej.: dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
  // Devuelve true si es dna "mutante", es decir que contiene 2 o más cadenas, en horizontal, vertical o diagonal con 4 letras seguidas (A,T,G,C)
  if (dna.length >= 4) {
    var cant_cadenas_mutantes = 0;

    function secuencia_igual(secuencia) {
      //Devuelve "true" si el string posee 4 letras iguales y consecutivas
      // "AAAAGT" -> true, "AAAGAT" -> false

      var letras = secuencia.split("");
      var cuatro_iguales = false;

      function comparar_son_iguales(a, b, c, d) {
        if (a === b && b === c && c === d) {
          cuatro_iguales = true;
        }
      }

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

      return cuatro_iguales;
    }

    //Análisis "Horizontal" de la Secuencia
    function analisisHorizontal(dna) {
      for (j = 0; j < dna.length; j++) {
        if (cant_cadenas_mutantes >= 2) {
          break;
        }
        if (secuencia_igual(dna[j]) === true) {
          cant_cadenas_mutantes += 1;
        }
      }
    }

    analisisHorizontal(dna);

    //Análisis "Vertical" de la Secuencia
    function dividir_caracteres(dna) {
      /*input  ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        output [  ["A", "T", "G", "C", "G", "A"],
                  ["C", "A", "G", "T", "G", "C"],
                  ["T", "T", "A", "T", "G", "T"],
                  ["A", "G", "A", "A", "G", "G"],
                  ["C", "C", "C", "C", "T", "A"],
                  ["T", "C", "A", "C", "T", "G"]  ]*/
      var z = [];
      var w = [];

      for (x of dna) {
        w = x.split("");
        z.push(w);
      }

      return z;
    }

    var caracteres = [];

    function generar_dna_vertical(dna) {
      //Devuelve un array con las palabras que se forman en vertical
      //input["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
      //ver f(x) dividir_caracteres
      //output ["ACTACT","TATGCC","GGAACA","CTTACC","GGGGTT","ACTGAG"]

      var nueva_cadena_array = [];
      var dna_vertical = "";
      var array_verticales = [];

      for (k = 0; k < caracteres.length; k++) {
        for (l = 0; l < caracteres.length; l++) {
          nueva_cadena_array.push(caracteres[l][k]);
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

    if (cant_cadenas_mutantes < 2) {
      caracteres = dividir_caracteres(dna);
      analisisHorizontal(generar_dna_vertical(dna));
    }

    //Análisis "Diagonal" de la Secuencia
    function generar_dna_diagonal(dna) {
      //Devuelve un array con las palabras que se forman en las diagonales >=4 letras
      var coordenadas_iniciales = [[0, 0]];
      var coordenadas_completas = [];
      var palabra_diagonal = "";
      var array_diagonal = [];

      for (a = 1; a < caracteres.length - 3; a++) {
        coordenadas_iniciales.push([0, a]);
        coordenadas_iniciales.push([a, 0]);
      }

      for (d of coordenadas_iniciales) {
        var control = d[1];

        switch (d[0]) {
          case 0: //x = 0 tienen que llegar hasta y = length - 1 triángulo inferior
            control = d[1];
            break;
          default:
            // x <> 0 tiene que llegar hasta  x = length - 1 triángulo superior
            control = d[0];
            break;
        }

        var indice = 0;
        coordenadas_completas.push(d);

        while (control < caracteres.length - 1) {
          coordenadas_completas.push([
            coordenadas_completas[indice][0] + 1,
            coordenadas_completas[indice][1] + 1,
          ]);
          control += 1;
          indice += 1;
        }

        for (t of coordenadas_completas) {
          palabra_diagonal = palabra_diagonal + caracteres[t[1]][t[0]];
        }

        array_diagonal.push(palabra_diagonal);
        coordenadas_completas = [];
        palabra_diagonal = "";
      }
      return array_diagonal;
    }

    if (cant_cadenas_mutantes < 2) {
      analisisHorizontal(generar_dna_diagonal(dna));
    }

    //Resultado: ¿Es un mutante?
    if (cant_cadenas_mutantes >= 2) {
      return true;
    } else {
      return false;
    }
  }
}
