const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents = document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const selectOrderBy = document.getElementById("filtroPorOrderBy");
const selectDirection = document.getElementById("filtroPorDirection");
const textUser = document.getElementById("textU");
let celda = '';
let options = {
	cohort: '',
	cohortData: {
		users: '',
		progress: ''
	},
	orderBy: '',
	orderDirection: '',
	search: ''
}
const procesandoData = ((users, progress, cohorts) => {
	options.cohort = cohorts;
	options.cohortData.users = users;
	options.cohortData.progress = progress;
	options.orderBy = "name";
	options.orderDirection = "Ascendente";
	options.search = " ";
	return processCohortData(options);
})
const getAllData = (cb) => {
	fetch('../data/cohorts.json')
		.then(function (responseC) {
			fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
				.then(function (responseU) {
					fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
						.then(function (responseP) {
							Promise.all([responseC.json(), responseU.json(), responseP.json()])
								.then(data => {
									const [cohorts, users, progress] = data;
									cb(cohorts, users, progress);
								})
						})
				})
		})
}
// Eventos del dom

btnLima.addEventListener("click", () => {
	fetch('../data/cohorts.json').then(function (response) {
		return response.json();
	})
		.then(function (dataCohorts) {
			dataCohorts.forEach((elemento) => {
				if (elemento["id"].substring(0, 3) === "lim") {
					cohortsSelect.innerHTML += "<option value='" + elemento["id"] + "'>" + elemento["id"] + "</option>";
				}
			});

		})
		.catch(error =>
			console.error('Error: Nat algo haces mal', error));
	document.getElementById('contenido').style.display = "none";
	document.getElementById('selectCenters').style.display = "block";
})

const createCuadroAlumnos=(usersWithStats)=>{
	usersWithStats.forEach((user) => {
	celda += 
	`
<<<<<<< HEAD
	<div>
		'<h3>' + ${user.name.toUpperCase()} + '</p>' +
		'<p>' + ${user.stats.percent} + '</p>' +
		'<p>' + ${user.stats.exercises.percent} + '</p>' +
		'<p>' + ${user.stats.reads.percent} + '</p>' +
		'<p>' + ${user.stats.quizzes.percent} + '</p>' +
		'<p>' + ${user.stats.quizzes.scoreAvg} + '</p>' +
=======
	<div id="cajaGeneral">
		<h3>${user.name.toUpperCase()}</h3>
		<p>${user.stats.percent}</p>
		<p>${user.stats.exercises.percent}</p>
		<p>${user.stats.reads.percent}</p> 
		<p>${user.stats.quizzes.percent}</p>
		<p>${user.stats.quizzes.scoreAvg}</p>
>>>>>>> fad96ddfca57088ebee52703fdd3a84e6b4d9998
	<div>
	`
})
dataStudents.innerHTML = celda;
}
cohortsSelect.addEventListener("change", (e) => {

	if (e.target.value === "lim-2018-03-pre-core-pw") {
		getAllData((cohorts, users, progress) => {

			filteredCohorts = cohorts.filter(item => { return item.id === e.target.value });
			procesandoData(users, progress, filteredCohorts[0]);
			let usersWithStats = processCohortData(options);
			createCuadroAlumnos(usersWithStats);
		})
		document.getElementById('selectCenters').style.display = "none";
		document.getElementById('contenidoData').style.display = "block";
		// cargarDatosProgress();
	}

});
btndashB.addEventListener("click", () => {

	document.getElementById('contenidoData').style.display = "none";
	document.getElementById('selectCenters').style.display = "none";
	document.getElementById('contenidoFiltros').style.display = "none";
	document.getElementById('contenido').style.display = "block";

})
selectOrderBy.addEventListener("change", () => {

			let contenido=selectOrderBy.value;
			options.orderBy = contenido;
			// console.log(contenido)
			let usersWithStats = processCohortData(options)
		if (selectOrderBy.value === "name") {
			createCuadroAlumnos(usersWithStats);
		}
		if (selectOrderBy.value === "completitud") {
			createCuadroAlumnos(usersWithStats);
		}
		if (selectOrderBy.value === "ejercicios") {
			createCuadroAlumnos(usersWithStats);
		}
		if (selectOrderBy.value === "lecturas") {
			createCuadroAlumnos(usersWithStats);
		}
		if (selectOrderBy.value === "quizzes") {
			createCuadroAlumnos(usersWithStats);
		}
		if (selectOrderBy.value === "quizzesScore") {
			createCuadroAlumnos(usersWithStats);
		}
<<<<<<< HEAD

=======
>>>>>>> fad96ddfca57088ebee52703fdd3a84e6b4d9998
		selectDirection.disabled=false;
})
selectDirection.addEventListener("change", () => {

		let contenido=selectDirection.value;
		options.orderDirection = contenido;
		// console.log(contenido)
		let usersWithStats = processCohortData(options)
	if (selectDirection.value === "Ascendente") {
		createCuadroAlumnos(usersWithStats);
	}
	if (selectDirection.value === "Descendente") {
		createCuadroAlumnos(usersWithStats);
	}
})
textUser.addEventListener("keyup", () => {

			let contenidos=textUser.value;
			options.search = contenidos;
			let usersWithStats = processCohortData(options)
			createCuadroAlumnos(usersWithStats);

})