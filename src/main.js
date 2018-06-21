// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents= document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");

// // Eventos del dom
btnLima.addEventListener("click",()=>{
    // console.log(e.target.textContent);
    // document.getElementById('contenidoData').style.display="block";
    fetch ('../data/cohorts.json'). then (function (response) { 
        return response.json();
    })
    .then (function (dataCohorts) { 
        dataCohorts.sort();
        dataCohorts.forEach((elemento) => {
            if(elemento["id"].substring(0,3)=== "lim"){
            cohortsSelect.innerHTML += "<option value='"+elemento["id"]+"'>"+elemento["id"]+"</option>";
            }
        }); 
        cohortsSelect.addEventListener("change",(e)=>{
            if(e.target.value === "lim-2018-03-pre-core-pw") {
                
                document.getElementById('selectCenters').style.display="none";
                document.getElementById('contenidoData').style.display="block";
                // cargarDatosProgress();
                
            }
            
            }); 
    })
    .catch(error => 
        console.error('Error:', error));
    document.getElementById('contenido').style.display="none";
    document.getElementById('selectCenters').style.display="block";
})

btndashB.addEventListener("click",()=>{

    document.getElementById('contenidoData').style.display="none";
    document.getElementById('selectCenters').style.display="none";
    document.getElementById('contenidoFiltros').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})

const getAllData = (cb) => {
    fetch ('../data/cohorts.json')
        .then (function (response) {
        fetch ('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
            .then (function (responseU) { 
                fetch ('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
                    .then (function (responseP) {
                        Promise.all([ response.json(), responseU.json(), responseP.json()])
                            .then(data => {
                                const [cohorts, users, progress] = data;
                                cb(cohorts, users, progress)
                            })
                    })
            })
    })
}

btnfiltro.addEventListener('change',(e)=>{

    if(e.target.value === "students"){
        getAllData((cohorts, users, progress) => {
            let celda = '';
            users.forEach((user)=>{
                const userId = user.id;
                const userProgress = progress[userId]
                let userProgressPercent = 0;
                if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
                    const units = userProgress.intro.units;
                    const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
                        return sumProgress + units[unit].percent
                    }, 0)
                    userProgressPercent = progressTotal /  Object.keys(units).length;
                }
                celda += '<tr>';
                celda += '<th> ID </th>';
                celda += '<th> SINGUPCOHORT </th>';
                celda += '<th> NAME </th>';
                celda += '<th> ROLE </th>';
                celda += '</tr>'
                
                if(user.signupCohort==="lim-2018-03-pre-core-pw"){
                    celda += '<tr>';
                    celda += '<td id= "nombrestabla"><a href="" id="usersEstadisticas">' + user.id + '</a></td>';
                    
                    celda += '<td>' + user.name + '</td>';
                    celda += '<td>'+ user.signupCohort +'</td>';
                    celda += '<td>' + userProgressPercent + '</td>';
                    celda += '</tr>';
                }
            })
            
            dataStudents.innerHTML = celda;
            document.getElementById('contenidoData').style.display="none";
            document.getElementById('contenidoFiltros').style.display="block";
        })
    }
});
        // //se crea una lista de nombres
            // let linewUp= document.createElement("ul");
            // //se le asigna una clase a la etiqueta ul
            // linewUp.className = "listEstudiantes";
            // let linew= document.createElement("li");
            // dataStudents.appendChild(linewUp);
            // //se le asigna una clase a la etiqueta li
            // linew.className = "listasEstudiantes";
            
            // linewUp.appendChild(linew);
            // let rutaDataNombres=document.createElement("a");
            // rutaDataNombres.textContent = elemento["name"];
            // //se le asigna una clase a la etiqueta a
            // rutaDataNombres.className ="rutasNombres";
            // rutaDataNombres.id ="rutasName";
            // linew.appendChild(rutaDataNombres);
            // console.log(document.getElementById("rutasName")[0]);
            // })       
            // document.getElementById("rutasName").addEventListener("click",(e)=>{
            //     e.preventDefault();
                
            //     document.getElementById('contenidoFiltros').style.display="none";
            //     document.getElementById('estatus').style.display="block";
            //     fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
            //     .then((response) => {
            //         return response.json();
            //     })
            //     .then((myUser) => {
                   
            //     })
                
            // })

// function cargandodataQuizzes(jsonObj){
    //     let progress= Object.keys(jsonObj);
    
    //     // console.log(jsonObj);
    //     for (let i = 0; i < progress.length; i++) {
    //         const element = progress[i];
    //         // const propiedadElemento = jsonObj[element].intro;
    //         // const porpiedadDura=jsonObj[element].intro.totalDuration;
    //         const porpiedadDura=jsonObj[element].intro.units[i];
    //         const porpiedadDur=jsonObj[porpiedadDura];
    
    //         console.log(porpiedadDur);
                    
    //     }
        
    // }

    // function cargarDatosProgress(){
//     let request = new XMLHttpRequest(); 
//     request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
//     request.onload = function () {
//       if(request.status === 200){
//        let progressQuizzes = JSON.parse(request.response);
//        cargandodataQuizzes(progressQuizzes);
//         }
//     }
//     request.send();
// }