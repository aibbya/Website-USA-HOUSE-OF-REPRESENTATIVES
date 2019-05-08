console.log("probando");
/* VARIABLES GENERALES */

var membersHouse = dataHouse.results[0].members;
var membersSenate = dataSenate.results[0].members;
// var democrats = 
var republicans = selectData().filter(item => item.party == "R");
var independents = selectData().filter(item => item.party == "I");
/* var democrats = ; */
var democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
console.log(typeof(democratsVotes));
var republicansVotes = parseFloat(sumaVotes(republicans));
var independentsVotes = parseFloat(sumaVotes(independents));
var diezPorcent = Math.round(selectData().length * 0.10);
var dataSort = selectData().sort(function (a, b) {
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var menoresMisses = menores10(dataSort);
var mayoresMisses = mayores10(dataSort);

// DATA JSON..... ----------------------



stadistic.mostAttendance = mayores10(dataSort);
stadistic.leastAttendance = menores10(dataSort);
console.log(stadistic.mostAttendance);
 
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
°  FUNCIONES °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// selecciona la data a usar
function selectData() {

  if (document.getElementById("estadisticaGralSENATE")) {
    return membersSenate;
  } else {
    return membersHouse;
  }
}
// Miembros por partido
function members (array, value){array.filter(item => item.party == value).length
  
}
console.log(members(selectData(),"D"))
//   % Voted w/ Party

function sumaVotes(array) {
  let suma = (0);
  for (let i = 0; i < array.length; i++) {
    suma = suma + array[i].votes_with_party_pct;
  }
  return suma / selectData().length;   
};

// Ordenar Sort esta dentro de la variable dataSort

// top 10 menores

function menores10(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);
  
    while (menores[menores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
      menores.push(data[x]);
      x++
    } 
  return menores;
};


// top 10 mayores

function mayores10(data) {
  var mayores = [];
  for (var x = data.length -1; x >= data.length - diezPorcent; x--){
    mayores.push(data[x]);}
    console.log(data[x]);
    console.log(data[x+1]);
    console.log(mayores[mayores.length-1]);
      
  while (mayores[mayores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);
    
  }  
  // if (mayores[mayores.length - 1].missed_votes_pct === data[x + 2].missed_votes_pct) {
    // mayores.push(data[x + 2]);
   
  //  console.log(data[x + 2]);
   
  return mayores;
  
};


//  loyalty

// ZONA DE PRUEBAS------------------

var arrayPrueba = [1, 3, 5.2, 6.5, 4];
var arrayObjects = [

]

// console.log(sumaVotes(arrayPrueba));
// console.log(1.6 + 4);

// var democratsVotes= Array.from(democrats).map(element => element.votes_with_party_pct);

// ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡FIN ZONA DE PRUEBAS!!!!!!!!!

/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°       TABLAS            °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// tabla1 datos generales
var mytable1 = "<thead > <tr><th> Party </th><th> N° of Reps </th> <th> % Voted w/ Party </th> </thead>";
mytable1 += "<tbody>";
mytable1 += "<tr> <td> Democrats </td> <td>" + stadistic.numberOfDemocrats + "</td> <td>" +democratsVotes.toFixed(2) + " % </td> </tr>";
mytable1 += "<tr> <td> Republicans </td> <td>" + republicans.length + "</td> <td>" + republicansVotes.toFixed(2) + " % </td> </tr>";
if (independents != 0) {
  mytable1 += "<tr> <td> Independents </td> <td>" + independents.length + "</td> <td>" + independentsVotes.toFixed(2) + " % </td> </tr>"
};
// console.log(mytable1);
mytable1 += "<tr> <td> TOTAL </td> <td>" + parseInt(stadistic.numberOfDemocrats + republicans.length + independents.length) + "</td> <td>" + parseFloat(democratsVotes + republicansVotes + independentsVotes).toFixed(2) + " % </td> </tr></tbody>"

// tabla1 print
document.getElementById('table1').innerHTML = mytable1;


// tables TOPS
function tableTOPS(array) {
  var mytable2 = "<thead > <tr><th> Name </th><th> Missed Votes</th> <th> % Missed Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable2 += "<tr>";
    if (element.middle_name === null) {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable2 += "<td>" + element.missed_votes + "</td>";

    mytable2 += "<td>" + element.missed_votes_pct + "% </td> </tr>";
    
    // mytable2 += "<td>" + element.total_votes + "</td>";

    // mytable2 += "<td>" + element.votes_with_party_pct + "% </td> </tr>";
  });
  mytable2 += "</tbody>";
  return mytable2;
}

// ATTENDANCE table2 LEAST comprometidos print
document.getElementById('table2').innerHTML = tableTOPS(mayoresMisses);

// ATTENDANCE table3 MOST comprometidos print
document.getElementById('table3').innerHTML = tableTOPS(menoresMisses);

/* ME QUEDA PENDIENTE:
1- hacer las paginas de loyalty
2- crear la data JSON de estadisticas 
3- hacer las tablas de loyalty, quiero que la funcion tablaTOPS me arme tambien las tablas loyalty
4- debo agregar los titulos de las tablas
5- verificar si anda los datos colocados en stadistic
NOTA: el html de loyal se esta armando con la dala de house porque es diferente el id principal*/


