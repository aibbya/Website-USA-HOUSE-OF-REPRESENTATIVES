var pagUrl= "";
if (document.getElementById("senate_data")){
  var pagUrl = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} else {
 var pagUrl = 'https://api.propublica.org/congress/v1/113/house/members.json'
};

var datos = new Vue({
  el: '#app',
  data: {
    pagUrl : pagUrl,
    members: [],
    democrats : [],
    republicans : [],
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

  },
  methods: {
    // FUNCION PARA TRAER LA DATA Y LLENAR MIS DATOS GENERALES
    traeData: fetch(pagUrl, {
      headers : {
        'X-API-Key': 'D2sQEk1LttT9w8Vydx7vfZZtD3Cag10zupr6TxbL'
      }}).then( function (laRespuesta) {
        return laRespuesta.json()
      }).then(function (dataGral) {
        datos.members = dataGral.results[0].members;
        datos.democrats = datos.members.filter(item => item.party == "D"),
        datos.republicans = datos.members.filter(item => item.party == "R")
        datos.numberOfDemocrats = datos.democrats.length;
        datos.numberOfRepublicans = datos.members.filter(item => item.party == "R").length;
        datos.numberOfIndependents = datos.members.filter(item => item.party == "I").length;
        datos.total = parseInt(datos.numberOfDemocrats + datos.numberOfIndependents + datos.numberOfRepublicans);
        datos.democratsVotes = sumaVotes(democrats);
        // A PARTIR DE ACA ESTA COMENTADO PORQUE LA FUNCION ANTERIOR ESTA DANDO ERROR Y EL RESTO HAY QUE CHEQUERARLO
        // datos.republicansVotes = (sumaVotes(republicans));
        // datos.independentsVotes = (sumaVotes(independents));
        // datos.total_average = (sumaVotes(datos.members)).toFixed(2);
        // datos.mostAttdatos.endance = menores10(ordenarA(datos.members));
        // datos.leastAttendance = mayores10(ordenarA(datos.members));
        // datos.least_loyal = topMenosLoyalty(ordenarL(datos.members));
        // datos.most_loyal = topMostLoyalty(ordenarL(datos.members));

      }).catch(function (error) { 
        alert("no carga") 
      }).catch((error)=> console.error("Error de Fetch")),
      
      
    // FUNCION PARA OBTERNER PORCENTAJE DE VOTOS POR PARTIDO
    sumaVotes :  (function (array) {
      let suma = (0);
      for (let i = 0; i < array.length; i++) {
        suma = suma + array[i].votes_with_party_pct;
        console.log(suma)
      }
      console.log(typeof(suma));
      if (suma > -1) {
        return suma / array.length;
      } else { return suma}
      
    }),
       
    } // aca termina methods
    
})

/* PENDIENTES: 
    1- la funcion sumaVotes tiene error, debo reviar que pasa.
    2- cuando llamo en html los algun dato en una etiqueta tr o td no me muestra< los datos, los datos si estan porque si lo llamo en <p> si los muestra.
    3- el html tiene varias etiquetas de pruebas, PENDIENTE.
    4- verificar exactamente  que pide la task y en que pag. se debe trabajar.
    */
