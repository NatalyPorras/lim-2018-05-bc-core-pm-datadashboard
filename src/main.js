// Dclaracion de las variables
const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltro = document.getElementById("filtroPor");
const dataStudents = document.getElementById("tablaUsers");
const cohortsSelect = document.getElementById("trainingCenters");
const selectOrderBy = document.getElementById("filtroPorOrderBy");
const selectDirection = document.getElementById("filtroPorDirection");
const searchUser = document.getElementById("search");
const textUser = document.getElementById("textU");
const tr = dataStudents.getElementsByTagName("thead");

// // Eventos del dom
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
	options.search = "";
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
									// console.log(data);
									const [cohorts, users, progress] = data;
									cb(cohorts, users, progress);
									console.log(data);

								})
						})
				})
		})
}
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
cohortsSelect.addEventListener("change", (e) => {

	if (e.target.value === "lim-2018-03-pre-core-pw") {
		getAllData((cohorts, users, progress) => {
			console.log(cohorts)
			let celda = '';
			celda += '<tr id="cabecera">' +
				'<th> NAME </th>' +
				'<th> COMPLETITUD </th>' +
				'<th> EJERCICIO </th>' +
				'<th> LECTURAS </th>' +
				'<th> QUIZZES </th>' +
				'</tr>'
			filteredCohorts = cohorts.filter(item => { return item.id === e.target.value });
			procesandoData(users, progress, filteredCohorts[0]);
			
			let usersWithStats = processCohortData(options);
			console.log(usersWithStats);
			usersWithStats.forEach((user) => {
				celda += '<tr id="cuerpoData">' +
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
			dataStudents.innerHTML = celda;
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
	getAllData((cohorts, users, progress) => {
		let celda = '';
		celda += '<tr id="cabecera">' +
			'<th> NAME </th>' +
			'<th> COMPLETITUD </th>' +
			'<th> EJERCICIO </th>' +
			'<th> LECTURAS </th>' +
			'<th> QUIZZES </th>' +
			'</tr>'
			let contenido=selectOrderBy.value;
			options.orderBy = contenido;
			// console.log(contenido)
			let usersWithStats = processCohortData(options)
		if (selectOrderBy.value === "name") {
			usersWithStats.forEach((user) => {
				celda += '<tr id="cuerpoData">' +
					// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
		}
		if (selectOrderBy.value === "completitud") {
			usersWithStats.forEach((user) => {
				celda += '<tr id="cuerpoData">' +
					// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
		}
		if (selectOrderBy.value === "ejercicios") {
			usersWithStats.forEach((user) => {
				sortUsers(usersWithStats, selectOrderBy.value, "Ascendente");
				celda += '<tr id="cuerpoData">' +
					// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
		}
		if (selectOrderBy.value === "lecturas") {
			usersWithStats.forEach((user) => {

				sortUsers(usersWithStats, selectOrderBy.value, "Ascendente");

				celda += '<tr id="cuerpoData">' +
					// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
		}
		if (selectOrderBy.value === "quizzes") {
			usersWithStats.forEach((user) => {
				sortUsers(usersWithStats, selectOrderBy.value, "Ascendente");
				celda += '<tr id="cuerpoData">' +
					// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
					'<td>' + user.name + '</td>' +
					'<td>' + user.stats.percent + '</td>' +
					'<td>' + user.stats.exercises.percent + '</td>' +
					'<td>' + user.stats.reads.percent + '</td>' +
					'<td>' + user.stats.quizzes.percent + '</td>' +
					'</tr>';
			})
		}

		dataStudents.innerHTML = celda;

	})
	
})
// selectDirection.addEventListener("change", () => {
// })
searchUser.addEventListener("click", () => {

	getAllData((cohorts, users, progress) => {
		let celda = '';
		celda += '<tr id="cabecera">' +
			'<th> NAME </th>' +
			'<th> COMPLETITUD </th>' +
			'<th> EJERCICIO </th>' +
			'<th> LECTURAS </th>' +
			'<th> QUIZZES </th>' +
			'</tr>'

		options.search = textUser.value;
		procesandoData(options);
		filteredCohorts = cohorts.filter(item => { return item.coursesIndex === e.target.value });
		let usersWithStats = procesandoData(users, progress, filteredCohorts[0]);
		usersWithStats.forEach((user) => {

			celda += '<tr name="thead">' +
				// '<td id= "nombrestabla"><a href="">' + user.id + '</a></td>'+
				'<td name="tbody">' + user.name + '</td>' +
				'<td name="tbody">' + user.stats.percent + '</td>' +
				'<td name="tbody">' + user.stats.exercises.percent + '</td>' +
				'<td name="tbody">' + user.stats.reads.percent + '</td>' +
				'<td name="tbody">' + user.stats.quizzes.percent + '</td>' +
				'</tr>';
		})

		dataStudents.innerHTML = celda;
		document.getElementById('contenidoData').style.display = "none";
		document.getElementById('contenidoFiltros').style.display = "block";
	})
})
