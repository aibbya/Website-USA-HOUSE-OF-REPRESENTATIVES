console.log("probando");
/* VARIABLES GENERALES */
var stadistic = {
  "numberOfDemocrats": 0,
}


var membersHouse = dataHouse.results[0].members;
var membersSenate = dataSenate.results[0].members;
// var democrats = 
var republicans = selectData().filter(item => item.party == "R");
var independents = selectData().filter(item => item.party == "I");
/* var democrats = ; */
// var democratsVotes = sumaVotes(democrats).toFixed(2);
var republicansVotes = sumaVotes(republicans).toFixed(2);
var independentsVotes = sumaVotes(independents).toFixed(2);
var diezPorcent = Math.round(selectData().length * 0.10);
var dataSort = selectData().sort(function (a, b) {
  if (a.missed_votes > b.missed_votes) {
    return 1;
  }
  if (a.missed_votes < b.missed_votes) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var menoresMisses = menores10(dataSort);
var mayoresMisses = mayores10(dataSort);

stadistic.numberOfDemocrats = [selectData().filter(item => item.party == "D")].length;

// democrats.map(element => {element.votes_with_party_pct});

/* COMANDOS PARA PRUEBA */

/* console.log(selectData());
console.log(democrats);
console.log(democrats.length);
// console.table(table1)
console.log(democratsVotes);
console.log((typeof (democratsVotes)));
console.log(diezPorcent);
// console.log(parseInt(topTen));
// console.log((typeof(topTen)));
console.log(dataSort);
console.log(independents);
console.log(menores10(dataSort));


array.reduce((count, ))


 */
/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°  ARRAYS DE ESTADISTICAS °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// selecciona la data a usar
function selectData() {

  if (document.getElementById("estadisticaGralSENATE")) {
    return membersSenate;
  } else {
    return membersHouse;
  }
}

//   % Voted w/ Party

function sumaVotes(array) {
  let suma = (0);

  for (let i = 0; i < array.length; i++) {
    suma = suma + array[i].votes_with_party_pct;
  }
  return suma / array.length;

  /* no anda
   data.forEach(element => { 
       suma += element.votes_with_party_pct;
       */
};

// Ordenar Sort






// top 10 menores

function menores10(data) {
  var menores = [];
  for (let x = 0; x < diezPorcent; x++)
    menores.push(data[x]);
  return menores;
};



// top 10 mayores

function mayores10(data) {
  var mayores = [];
  aux = [];
  for (var x = data.length - 1; x >= data.length - diezPorcent; x--)
    mayores.push(data[x]);

  if (mayores[mayores.length - 1].missed_votes === data[x + 1].missed_votes) {
    mayores.push(data[x + 1]);

    

  }
  return mayores;
  console.log("Mayores:" + JSON.stringify(mayores));
};
console.log(mayores10(dataSort));




//  loyalty

// ZONA DE PRUEBAS------------------

var arrayPrueba = [1, 3, 5.2, 6.5, 4];
var arrayObjects = [

]

// console.log(sumaVotes(arrayPrueba));
// console.log(1.6 + 4);

// var democratsVotes= Array.from(democrats).map(element => element.votes_with_party_pct);



/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°       TABLAS            °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// tabla1 datos generales
var mytable1 = "<thead > <tr><th> Party </th><th> N° of Reps </th> <th> % Voted w/ Party </th> </thead>";
mytable1 += "<tbody>";
mytable1 += "<tr> <td> Democrats </td> <td>" + stadistic.numberOfDemocrats + "</td> <td>"  /*+democratsVotes+*/ + "</td> </tr>";
mytable1 += "<tr> <td> Republicans </td> <td>" + republicans.length + "</td> <td>" + republicansVotes + " </td> </tr>";
if (independents != 0) {
  mytable1 += "<tr> <td> Independents </td> <td>" + independents.length + "</td> <td>" + independentsVotes + "</td> </tr>"
};
console.log(mytable1);
mytable1 += "<tr> <td> TOTAL </td> <td>" + parseInt(stadistic.numberOfDemocrats + republicans.length + independents.length) + "</td> <td>" + parseFloat(/* democratsVotes + */ republicansVotes + independentsVotes).toFixed(2) + "</td> </tr></tbody>"

// tabla1 print
document.getElementById('table1').innerHTML = mytable1;


// table2
function table2(array) {
  var mytable2 = "<thead > <tr><th> Name </th><th> N° of Misses Votes </th> <th> % Misses Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable2 += "<tr>";
    if (element.middle_name === null) {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable2 += "<td>" + element.missed_votes + "</td>";

    mytable2 += "<td>" + element.missed_votes_pct + "% </td> </tr>";

  });
  mytable2 += "</tbody>";
  return mytable2;
}



// table2 print
document.getElementById('table2').innerHTML = table2(mayoresMisses);

/* ME QUEDA PENDIENTE:
1- verificar cuales son los menores y cuales son los mayores, si estoy mostrando la data que corresponde
2- arreglar la funcion del top para que tome el valor del diezPorcent */