console.log("probando");
/* VARIABLES GENERALES */

var membersHouse = dataHouse.results[0].members;
var membersSenate = dataSenate.results[0].members;
var republicans = selectData().filter(item => item.party == "R");
var independents = selectData().filter(item => item.party == "I");
var democrats = selectData().filter(item => item.party == "D")
var democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
var republicansVotes = parseFloat(sumaVotes(republicans));
var independentsVotes = parseFloat(sumaVotes(independents));
var dataSortAttendance = selectData().sort(function (a, b) {
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var dataSortLoyalty = selectData().sort(function (a, b) {
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return 1;
  }
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var diezPorcent = Math.round(selectData().length * 0.10);
var menoresMisses = menores10(dataSortAttendance);
var mayoresMisses = mayores10(dataSortAttendance);
var mostLoyalty = topMostLoyalty(dataSortLoyalty);
var menosLoyalty = topMenosLoyalty(dataSortLoyalty);
// DATA JSON..... ----------------------

var stadistic = {
  "numberOfDemocrats": 0,
  "numberOfIndependents": 0,
  "numberOfRepublicans": 0,
  "total": 0,
  "democratsVotes": 0,
  "republicansVotes": 0,
  "independentsVotes": 0,
  "total_average": 0,
  "leastAttendance": [],
  "mostAttendance": [],
  "least_loyal": [],
  "most_loyal": [],
};

function llenarStadistic() {
  stadistic.numberOfDemocrats = selectData().filter(item => item.party == "D").length;
  stadistic.numberOfRepublicans = selectData().filter(item => item.party == "R").length;
  stadistic.numberOfIndependents = selectData().filter(item => item.party == "I").length;
  stadistic.total = parseInt(stadistic.numberOfDemocrats + stadistic.numberOfIndependents + stadistic.numberOfRepublicans);
  stadistic.democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
  stadistic.republicansVotes = parseFloat(sumaVotes(republicans));
  stadistic.independentsVotes = parseFloat(sumaVotes(independents));
  stadistic.total_average = parseFloat(democratsVotes + republicansVotes + independentsVotes).toFixed(2);
  stadistic.mostAttendance = menores10(dataSortAttendance);
  stadistic.leastAttendance = mayores10(dataSortAttendance);
  stadistic.least_loyal = topMenosLoyalty(dataSortLoyalty);
  stadistic.most_loyal = topMostLoyalty(dataSortLoyalty);
}
// selecciona la data a usar
function selectData() {

  if (document.getElementById("estadisticaGralSENATE")) {
    return membersSenate;
  } else {
    return membersHouse;
  }
}
// Miembros por partido
function members(array, value) {
  array.filter(item => item.party == value).length

}

//   % Voted w/ Party

function sumaVotes(array) {
  let suma = (0);
  for (let i = 0; i < array.length; i++) {
    suma = suma + array[i].votes_with_party_pct;
  }
  return suma / selectData().length;
};
// Ordenar Sort esta dentro de la variable dataSortAttendance

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
  for (var x = data.length - 1; x >= data.length - diezPorcent; x--) {
    mayores.push(data[x]);
  }
  while (mayores[mayores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);
  }
  return mayores;
};

//  loyalty
function topMenosLoyalty(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);

  while (menores[menores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
    menores.push(data[x]);
    x++
  }
  return menores;
}

function topMostLoyalty(data) {
  var mayores = [];
  for (var x = data.length - 1; x >= data.length - diezPorcent; x--) {
    mayores.push(data[x]);
  }
  while (mayores[mayores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);  
  }
  return mayores;
}