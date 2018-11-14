const menuTogle2 = document.getElementById("menu-toggle");
const Wrapper = document.getElementById("sidebar-wrapper");
const signOut = document.querySelector(".signOutUrl");
const contentDashCohorts = document.getElementById("page-content-wrapper"); 
    let aux=0;

menuTogle2.addEventListener("click", ()=>{
    if(aux === 0){
        Wrapper.style.display="block";
        aux=1;
    }else{
        Wrapper.style.display="none";
        aux=0
    }
})

signOut.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.assign("loginUser.html");
})

const dataLab = (id, url, callback) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        callback(id, data);
      })
  };

const menu = document.querySelector('.menuList');
menu.addEventListener("click",(e) =>{
    const id = e.target.id;
    dataLab(id,"https://api.laboratoria.la/cohorts",getCohort)
})

const arrayPlano = (array) => {
    return array.reduce((memo, item) => {
      return memo.concat(item);
    }, []);
  }
  const valoresUnicos = (unics) => {
    return [...new Set(unics)];
  }
  
const getCohort = (id,data) =>{
    let arrayCourses=[];    
    const cohortSpecific = data.filter(cohort =>{
        return cohort.id.substring(0,3) === id
    })
    cohortSpecific.forEach(cohort =>{
            if(cohort.hasOwnProperty("coursesIndex")){
                arrayCourses.push(Object.keys(cohort.coursesIndex))
            }
    })
    const newCourses = arrayPlano(arrayCourses)
    const coursesUnics = valoresUnicos(newCourses)

    paintEstadicticas(cohortSpecific, coursesUnics)
}

const paintEstadicticas = (totalCohort, coursesUnics) =>{
    contentDashCohorts.innerHTML = "";

    let contentDatosTotales = document.createElement("div");
    let contentTotalCohort = document.createElement("div");
    let textTotalCohort = document.createElement("h3");
    let contentTotalCourses = document.createElement("div");
    let textTotalCourses = document.createElement("h3");
    let contentCohort = document.createElement("div");
    totalCohort.forEach(cohort =>{
        let cohortDato = document.createElement("div");
        let nameCohort = document.createElement("h3");
        nameCohort.textContent = cohort.id;
        cohortDato.appendChild(nameCohort);
        contentCohort.appendChild(cohortDato);
    })
    textTotalCohort.textContent = totalCohort.length;
    textTotalCourses.textContent = coursesUnics.length;

    contentTotalCohort.appendChild(textTotalCohort);
    contentTotalCourses.appendChild(textTotalCourses);

    contentDatosTotales.appendChild(contentTotalCohort);
    contentDatosTotales.appendChild(contentTotalCourses);

    contentDashCohorts.appendChild(contentDatosTotales);
    contentDashCohorts.appendChild(contentCohort);







}
const getUsersCount = (id, data) =>{
  

    contentDashCohorts.innerHTML = "";
    contentDashCohorts.innerHTML = `
        <div class="wrapper Estudiantes">
            <div class="pie start-0 end-25"></div>
            <div class="pie big start-25 end-75"></div>
            <div class="pie over"><span>25%</span></div>
        </div>
        <div class="wrapper Cursos">
            <div class="pie start-0 end-27"></div>
            <div class="pie big start-27 end-73"></div>
            <div class="pie over"><span>27%</span></div>
        </div>
        <div class="wrapper Lecturas">
            <div class="pie big start-0 end-60"></div>
            <div class="pie start-60 end-40"></div>
            <div class="pie over"><span>60%</span></div>
        </div>
        <div class="wrapper">
            <div class="pie big start-0 end-87"></div>
            <div class="pie start-87 end-13"></div>
            <div class="pie over"><span>87%</span></div>
        </div>
    `
}

// const btnLima = document.getElementById("cLima");
// const btndashB = document.getElementById("dashB");
// const btnfiltro = document.getElementById("filtroPor");
// const dataStudents = document.getElementById("tablaUsers");
// const cohortsSelect = document.getElementById("trainingCenters");
// const selectOrderBy = document.getElementById("filtroPorOrderBy");
// const selectDirection = document.getElementById("filtroPorDirection");
// const textUser = document.getElementById("textU");
// let celda = '';
// let options = {
// 	cohort: '',
// 	cohortData: {
// 		users: '',
// 		progress: ''
// 	},
// 	orderBy: '',
// 	orderDirection: '',
// 	search: ''
// }
// const procesandoData = ((users, progress, cohorts) => {
// 	options.cohort = cohorts;
// 	options.cohortData.users = users;
// 	options.cohortData.progress = progress;
// 	options.orderBy = "name";
// 	options.orderDirection = "Ascendente";
// 	options.search = " ";
// 	return processCohortData(options);
// })
// const getAllData = (cb) => {
// 	fetch('../data/cohorts.json')
// 		.then(function (responseC) {
// 			fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
// 				.then(function (responseU) {
// 					fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
// 						.then(function (responseP) {
// 							Promise.all([responseC.json(), responseU.json(), responseP.json()])
// 								.then(data => {
// 									const [cohorts, users, progress] = data;
// 									cb(cohorts, users, progress);
// 								})
// 						})
// 				})
// 		})
// }
// // Eventos del dom

// btnLima.addEventListener("click", () => {
// 	fetch('../data/cohorts.json').then(function (response) {
// 		return response.json();
// 	})
// 		.then(function (dataCohorts) {
// 			dataCohorts.forEach((elemento) => {
// 				if (elemento["id"].substring(0, 3) === "lim") {
// 					cohortsSelect.innerHTML += "<option value='" + elemento["id"] + "'>" + elemento["id"] + "</option>";
// 				}
// 			});

// 		})
// 		.catch(error =>
// 			console.error('Error: Nat algo haces mal', error));
// 	document.getElementById('contenido').style.display = "none";
// 	document.getElementById('selectCenters').style.display = "block";
// })

// const createCuadroAlumnos=(usersWithStats)=>{
// 	usersWithStats.forEach((user) => {
// 	celda += 
// 	`
// 	<div id="cajaGeneral">
// 		<h3>${user.name.toUpperCase()}</h3>
// 		<p>${user.stats.percent}</p>
// 		<p>${user.stats.exercises.percent}</p>
// 		<p>${user.stats.reads.percent}</p> 
// 		<p>${user.stats.quizzes.percent}</p>
// 		<p>${user.stats.quizzes.scoreAvg}</p>
// 	<div>
// 	`
// })
// dataStudents.innerHTML = celda;
// }
// cohortsSelect.addEventListener("change", (e) => {

// 	if (e.target.value === "lim-2018-03-pre-core-pw") {
// 		getAllData((cohorts, users, progress) => {

// 			filteredCohorts = cohorts.filter(item => { return item.id === e.target.value });
// 			procesandoData(users, progress, filteredCohorts[0]);
// 			let usersWithStats = processCohortData(options);
// 			createCuadroAlumnos(usersWithStats);
// 		})
// 		document.getElementById('selectCenters').style.display = "none";
// 		document.getElementById('contenidoData').style.display = "block";
// 		// cargarDatosProgress();
// 	}

// });
// btndashB.addEventListener("click", () => {

// 	document.getElementById('contenidoData').style.display = "none";
// 	document.getElementById('selectCenters').style.display = "none";
// 	document.getElementById('contenidoFiltros').style.display = "none";
// 	document.getElementById('contenido').style.display = "block";

// })
// selectOrderBy.addEventListener("change", () => {

// 			let contenido=selectOrderBy.value;
// 			options.orderBy = contenido;
// 			// console.log(contenido)
// 			let usersWithStats = processCohortData(options)
// 		if (selectOrderBy.value === "name") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		if (selectOrderBy.value === "completitud") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		if (selectOrderBy.value === "ejercicios") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		if (selectOrderBy.value === "lecturas") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		if (selectOrderBy.value === "quizzes") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		if (selectOrderBy.value === "quizzesScore") {
// 			createCuadroAlumnos(usersWithStats);
// 		}
// 		selectDirection.disabled=false;
// })
// selectDirection.addEventListener("change", () => {

// 		let contenido=selectDirection.value;
// 		options.orderDirection = contenido;
// 		// console.log(contenido)
// 		let usersWithStats = processCohortData(options)
// 	if (selectDirection.value === "Ascendente") {
// 		createCuadroAlumnos(usersWithStats);
// 	}
// 	if (selectDirection.value === "Descendente") {
// 		createCuadroAlumnos(usersWithStats);
// 	}
// })
// textUser.addEventListener("keyup", () => {

// 			let contenidos=textUser.value;
// 			options.search = contenidos;
// 			let usersWithStats = processCohortData(options)
// 			createCuadroAlumnos(usersWithStats);

// })