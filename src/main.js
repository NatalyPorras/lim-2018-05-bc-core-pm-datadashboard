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
   
    paintingUsers(id, usersWithStats);

    searchText.addEventListener("keyup", () => {
        options.search = searchText.value;
        let filterUsersWithStats = processCohortData(options);
        paintingUsers(id,filterUsersWithStats);
      });
      orderBy.addEventListener("change", () => {
        options.orderBy = orderBy.value;
        let sortUsersWithStats = processCohortData(options);
        paintingUsers(id,sortUsersWithStats);
      });
      ascendente.addEventListener("click", () => {
        options.orderDirection = "Ascendente";
        let sortUsersWithStats = processCohortData(options);
        paintingUsers(id,sortUsersWithStats);
      });
      descendente.addEventListener("click", () => {
        options.orderDirection = "Descendente";
        let sortUsersWithStats = processCohortData(options);
        paintingUsers(id,sortUsersWithStats);
      });
}

const paintingUsers = (id,users) =>{
    cohortSelect.innerHTML = ""
    let titleCOHORT = document.createElement("h2");
    let cardGroup = document.createElement("div");
    titleCOHORT.textContent = id 
    
    cardGroup.className = "card-columns";
    users.map(user =>{
        let card = document.createElement("div");
        let title = document.createElement("h5");
        let cardBody = document.createElement("div");
        let cardTotalData = document.createElement("div");
        let image = document.createElement("img");
        let partTotal = document.createElement("div");
        let divProgess1 = document.createElement("div");
        let titleProgress1 = document.createElement("h6");
        let showProgress1 = document.createElement("div");
        let showPorcent1 = document.createElement("h4")
        let progress1 = document.createElement("div");
        let progressBar1 = document.createElement("div");

        let divProgess2 = document.createElement("div");
        let titleProgress2 = document.createElement("h6");
        let showProgress2 = document.createElement("div");
        let showPorcent2 = document.createElement("h4")
        let progress2 = document.createElement("div");
        let progressBar2 = document.createElement("div");

        let divProgess3 = document.createElement("div");
        let titleProgress3 = document.createElement("h6");
        let showProgress3 = document.createElement("div");
        let showPorcent3 = document.createElement("h4")
        let progress3 = document.createElement("div");
        let progressBar3 = document.createElement("div");

        let progress = document.createElement("div");
        let progressBar = document.createElement("div");

        
        // Progress general
        progress.className = "progress";
        progressBar.className = 'progress-bar';
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("style", `width:${user.stats.percent}%;`);
        progressBar.setAttribute("aria-valuenow", user.stats.percent);
        progressBar.setAttribute("aria-valuemin","0")
        progressBar.setAttribute("aria-valuemax","100")
        // Progress general Ejercicios
        cardTotalData.className = "cardTotalData"
        partTotal.className = "partTotal",
        divProgess1.className = "divProgress"
        showProgress1.className = "showProgress"
        progress1.className = "progress";
        progressBar1.className = 'progress-bar';
        progressBar1.setAttribute("role", "progressbar");
        progressBar1.setAttribute("style", `width:${user.stats.exercises.percent}%;`);
        progressBar1.setAttribute("aria-valuenow", user.stats.exercises.percent);
        progressBar1.setAttribute("aria-valuemin","0")
        progressBar1.setAttribute("aria-valuemax","100")

        titleProgress1.textContent = "Ejercicios"

        // Progress general lectura
        progress2.className = "progress";
        showProgress2.className = "showProgress"
        divProgess2.className = "divProgress"
        progressBar2.className = 'progress-bar';
        progressBar2.setAttribute("role", "progressbar");
        progressBar2.setAttribute("style", `width:${user.stats.reads.percent}%;`);
        progressBar2.setAttribute("aria-valuenow", user.stats.reads.percent);
        progressBar2.setAttribute("aria-valuemin","0")
        progressBar2.setAttribute("aria-valuemax","100")

        titleProgress2.textContent = "Lecturas"
                    // Progress general lectura
        progress3.className = "progress";
        showProgress3.className = "showProgress"
        divProgess3.className = "divProgress"
        progressBar3.className = 'progress-bar';
        progressBar3.setAttribute("role", "progressbar");
        progressBar3.setAttribute("style", `width:${user.stats.quizzes.percent}%;`);
        progressBar3.setAttribute("aria-valuenow", user.stats.quizzes.percent);
        progressBar3.setAttribute("aria-valuemin","0")
        progressBar3.setAttribute("aria-valuemax","100")

        titleProgress3.textContent = "Quizzes"

        card.className = "card";
        cardBody.className = "card-body"
        showPorcent1.textContent=user.stats.exercises.percent+"%"
        showPorcent2.textContent=user.stats.reads.percent+"%" 
        showPorcent3.textContent=user.stats.quizzes.percent +"%"
        progressBar.textContent =user.stats.percent
        image.setAttribute('src', './imagenes/mujercodeando.jpg')
        title.textContent = user.name
      
        card.appendChild(title);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTotalData);
        cardTotalData.appendChild(image)
        cardTotalData.appendChild(partTotal)
        partTotal.appendChild(divProgess1)
        partTotal.appendChild(divProgess2)
        partTotal.appendChild(divProgess3)

        divProgess1.appendChild(titleProgress1)
        showProgress1.appendChild(showPorcent1);
        progress1.appendChild(progressBar1)
        showProgress1.appendChild(progress1)
        divProgess1.appendChild(showProgress1)
        
        divProgess2.appendChild(titleProgress2)
        showProgress2.appendChild(showPorcent2);
        progress2.appendChild(progressBar2)
        showProgress2.appendChild(progress2)
        divProgess2.appendChild(showProgress2)
        
        divProgess3.appendChild(titleProgress3)
        showProgress3.appendChild(showPorcent3);
        progress3.appendChild(progressBar3)
        showProgress3.appendChild(progress3)
        divProgess3.appendChild(showProgress3)
        // card.appendChild(image);
        
        // progress.appendChild(progressBar)
        // cardBody.appendChild(progress);
        cardGroup.appendChild(card);

    })
    cohortSelect.appendChild(titleCOHORT);

    cohortSelect.appendChild(cardGroup)
}
