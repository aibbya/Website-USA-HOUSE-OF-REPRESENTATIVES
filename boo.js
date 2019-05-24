if (document.getElementById("senate_data")){
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
 var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var app = new Vue({
  el: '#app',
  data: {
    numberOfDemocrats: 0,
    numberOfIndependents: 0,
    numberOfRepublicans: 0,
    total: 0,
    democratsVotes: 0,
    republicansVotes: 0,
    independentsVotes: 0,
    total_average: 0,
    leastAttendance: [],
    mostAttendance: [],
    least_loyal: [],
    most_loyal: [],

  },aibya
  methods: {
    traeData: (function () {
      fetch(pagUrl, {
        headers: {
          'X-API-Key': 'D2sQEk1LttT9w8Vydx7vfZZtD3Cag10zupr6TxbL'
        }
      }).then(function (respuesta) {
        return respuesta.json()
      }).then(function (datos) {
        console.table(datos.results[0].members)
      })
    })(),

  }
})