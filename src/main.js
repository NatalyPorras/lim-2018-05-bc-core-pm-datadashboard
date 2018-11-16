const menuTogle2 = document.getElementById("menu-toggle");
const Wrapper = document.getElementById("sidebar-wrapper");
const signOut = document.querySelector(".signOutUrl");
const main = document.querySelector(".main")
const contentCohortSelct = document.querySelector(".contentCohortSelect")
const contentDashCohorts = document.getElementById("page-content-wrapper"); 
const cohortSelect = document.getElementById("cohortSelect");
const searchText = document.getElementById("searchText");
const orderBy = document.getElementById("orderBy");
const ascendente = document.getElementById("ascendente");
const descendente = document.getElementById("descendente");
const dash = document.getElementById("dash");
let aux=0;

let options = {
	cohort: null,
	cohortData: {
		users: '',
		progress: ''
	},
	orderBy: "name",
	orderDirection: "ASC",
	search: ''
}

dash.addEventListener("click", () =>{
    contentDashCohorts.style.display="none";
    main.style.display = "block";
    contentDashCohorts.style.display="none";
    contentCohortSelct.style.display = "none";
})
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
    contentDashCohorts.style.display="block";
    contentCohortSelct.style.display = "none";
    main.style.display = "none";
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
    
    let cohortSpecific = data.filter(cohort =>{
        return cohort.id.substring(0,3) === id
    })
    options.cohort = cohortSpecific;
    

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
    let titleCohort = document.createElement("h5");
    let textTotalCohort = document.createElement("h3");
    let contentTotalCourses = document.createElement("div");
    let titleCourses = document.createElement("h5");
    let textTotalCourses = document.createElement("h3");
    let totalList = document.createElement("div");
    let contentCohort = document.createElement("div");
    let textCohort = document.createElement("h4");

    totalList.className = "content";
    textCohort.className = " ml-4 mt-4"
    contentCohort.className = "row";
    textCohort.textContent = "Selecciona una lista: ";

    totalList.appendChild(textCohort);
    totalList.appendChild(contentCohort);
    totalCohort.forEach(cohort =>{
        let cohortDato = document.createElement("div");
        let cohortButton = document.createElement("button");

        cohortDato.className = "col-12 col-sm-4";
        cohortButton.className = "btn btn-outline-info"

        cohortButton.textContent =  cohort.id;
        cohortButton.setAttribute("id",cohort.id)

        cohortDato.appendChild(cohortButton);
        contentCohort.appendChild(cohortDato);
        clickButtonsCohort(cohortButton,totalCohort)
    })

    contentDatosTotales.className = "contentTotalDatos";
    contentTotalCohort.className = "contentTotalCohort";
    contentTotalCourses.className = "contentTotalCourses";
   
    textTotalCohort.textContent = totalCohort.length;
    titleCohort.textContent = "Cohorts";
    textTotalCourses.textContent = coursesUnics.length;
    titleCourses.textContent = "Cursos";


    contentTotalCohort.appendChild(textTotalCohort);
    contentTotalCohort.appendChild(titleCohort);

    contentTotalCourses.appendChild(textTotalCourses);
    contentTotalCourses.appendChild(titleCourses);

    contentDatosTotales.appendChild(contentTotalCohort);
    contentDatosTotales.appendChild(contentTotalCourses);

    contentDashCohorts.appendChild(contentDatosTotales);
    contentDashCohorts.appendChild(totalList);
   
}

const clickButtonsCohort = (button,cohorts) =>{
    button.addEventListener("click",(e) =>{
        contentDashCohorts.style.display="none";
        contentCohortSelct.style.display = "block";
        const id = e.target.id;
        const filteredCohorts = cohorts.filter(item => { return item.id === id });
        options.cohort = filteredCohorts;
        
        dataLab(id,`https://api.laboratoria.la/cohorts/${id}/users`,getUsers)
    })
    
}

const getUsers = (id,data) =>{
        options.cohortData.users = data
        dataLab(id,`https://api.laboratoria.la/cohorts/${id}/progress`,getUserProgress)
}

const getUserProgress = (id,data) =>{
    options.cohortData.progress = data
    getUsersCount(id)
}

const getUsersCount = (id) =>{
  
    let usersWithStats = processCohortData(options);
   
    paintingUsers(usersWithStats);
}
searchText.addEventListener("keyup", () => {
    options.search = searchText.value;
    let filterUsersWithStats = processCohortData(options);
    paintingUsers(filterUsersWithStats);
  });
  orderBy.addEventListener("change", () => {
    options.orderBy = orderBy.value;
    let sortUsersWithStats = processCohortData(options);
    paintingUsers(sortUsersWithStats);
  });
  ascendente.addEventListener("click", () => {
    options.orderDirection = "Ascendente";
    let sortUsersWithStats = processCohortData(options);
    paintingUsers(sortUsersWithStats);
  });
  descendente.addEventListener("click", () => {
    options.orderDirection = "Descendente";
    let sortUsersWithStats = processCohortData(options);
    paintingUsers(sortUsersWithStats);
  });
const paintingUsers = (users) =>{
    cohortSelect.innerHTML = ""
    let cardGroup = document.createElement("div");
    cardGroup.className = "card-columns";
    users.map(user =>{
        let card = document.createElement("div");
        let image = document.createElement("img");
        let cardBody = document.createElement("div");
        let title = document.createElement("h5");
        let progress = document.createElement("div");
        let progressBar = document.createElement("div");

        progress.className = "progress";
        progressBar.className = 'progress-bar';
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("style", `width:${user.stats.percent}%;`);
        progressBar.setAttribute("aria-valuenow", user.stats.percent);
        progressBar.setAttribute("aria-valuemin","0")
        progressBar.setAttribute("aria-valuemax","100")

        card.className = "card";
        cardBody.className = "card-body"
        progressBar.textContent =user.stats.percent
        image.setAttribute('src', './imagenes/mujercodeando.jpg')
        title.textContent = user.name
      
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(cardBody);
        progress.appendChild(progressBar)
        cardBody.appendChild(progress);
        cardGroup.appendChild(card);

    })
    cohortSelect.appendChild(cardGroup)
}

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