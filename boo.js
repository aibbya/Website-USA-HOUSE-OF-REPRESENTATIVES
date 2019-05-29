var pagUrl = "";
if (document.getElementById("senate_data")) {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
  var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var miembros = [];
var datos = new Vue({
  el: '#app',
  data: {
    pagUrl: pagUrl,
    members: [],
    democrats: [],
    republicans: [],
    numberOfDemocrats: 57,
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

  },
  methods: {
    // FUNCION PARA TRAER LA DATA Y LLENAR MIS DATOS GENERALES
    traeData: function () {
      fetch(pagUrl, {
        headers: {
          'X-API-Key': 'D2sQEk1LttT9w8Vydx7vfZZtD3Cag10zupr6TxbL'
        }
      }).then(function (laRespuesta) {
        return laRespuesta.json()
      }).then(function (dataGral) {
        datos.members = dataGral.results[0].members;
        miembros = dataGral.results[0].members;
        datos.democrats = miembros.filter(item => item.party == "D");
        datos.republicans = miembros.filter(item => item.party == "R")
        datos.numberOfDemocrats = datos.democrats.length;
        datos.numberOfRepublicans = miembros.filter(item => item.party == "R").length;
        datos.numberOfIndependents = miembros.filter(item => item.party == "I").length;
        datos.total = parseInt(datos.numberOfDemocrats + datos.numberOfIndependents + datos.numberOfRepublicans);
        datos.democratsVotes = datos.sumaVotes(datos.democrats);
        console.log(datos.democratsVotes);

        // A PARTIR DE ACA ESTA COMENTADO PORQUE LA FUNCION ANTERIOR ESTA DANDO ERROR Y EL RESTO HAY QUE CHEQUERARLO
        datos.republicansVotes = datos.sumaVotes(republicans);
        datos.independentsVotes = datos.sumaVotes(independents);
        datos.total_average = datos.sumaVotes(datos.members).toFixed(2);
        datos.mostAttendance = datos.menores10(ordenarA(datos.members));
        datos.leastAttendance = datos.mayores10(ordenarA(datos.members));
        datos.least_loyal = datos.topMenosLoyalty(ordenarL(datos.members));
        datos.most_loyal = datos.topMostLoyalty(ordenarL(datos.members));
      }).catch((error) => console.error("Error de Fetch"))
    },
    // FUNCION PARA OBTERNER PORCENTAJE DE VOTOS POR PARTIDO
    sumaVotes: function (array) {
      let suma = (0);
      for (let i = 0; i < array.length; i++) {
        suma = suma + array[i].votes_with_party_pct;
        console.log(suma)
      }
      console.log(typeof (suma));
      if (suma > -1) {
        return suma / array.length;
      } else {
        return suma
      }

    },
  } // aca termina methods
});
datos.traeData();
/* PENDIENTES: 
    1- agregar funciones que calcule las otras funciones.