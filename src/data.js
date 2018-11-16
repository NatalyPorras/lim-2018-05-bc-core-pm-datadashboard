window.computeUsersStats = (users, progress, courses) => {
  console.log(users);
  
  let datoLectura = 0, datoGeneralLectura = 0;
  let datoQuiz = 0, datoGeneralQuiz = 0;
  let datoEjercicio = 0, datoGeneralEjercicio = 0;
  let progressTotalQuiz = 0; calcularEjercicio = 0, calcularLectura = 0, calcularQuiz = 0, QuizzeProgress = 0;

  const userStudents = users.filter(student => student.role === "student")

  let usersWithStats = userStudents.map(user => {
    let userId = user.id;
    let userProgress = progress[userId];

    courses.map(course => {
      if (userProgress.hasOwnProperty(course)) {
        const units = userProgress[course].units;
        const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
          return sumProgress + units[unit].percent
        }, 0)
        userProgressPercent = Math.round(progressTotal / Object.keys(units).length);

        Object.entries(units).map(unit => {
          Object.entries(unit[1].parts).map(part => {
            const exercises = part[1].exercises;
            for (const exercise in exercises) {
              if (exercises[exercise].hasOwnProperty("completed")) {
                datoGeneralEjercicio++;
                if (exercises[exercise].completed === 1) {
                  datoEjercicio++;
                }
              }
            }
            if (part[1].type === "read") {
              if (part[1].completed === 1) {
                datoLectura++;
              }
              datoGeneralLectura++;
            }
            if (part[1].type === "quiz") {
              if (part[1].completed === 1 && part[1].hasOwnProperty("score")) {
                progressTotalQuiz += part[1].score;
                datoQuiz++;
              }
              datoGeneralQuiz++;
            }
            if (datoEjercicio === 0) {
              calcularEjercicio = 0;
            } else {
              calcularEjercicio = Math.round((datoEjercicio * 100) / datoGeneralEjercicio);
            }
            if (datoGeneralQuiz === 0) {
              calcularQuiz = 0;
            } else {
              calcularQuiz = Math.round((datoQuiz / datoGeneralQuiz) * 100);
            }
            if (datoQuiz === 0) {
              QuizzeProgress = 0;
            } else {
              QuizzeProgress = Math.round(progressTotalQuiz / datoQuiz);
            }
            // Validacion de resultados de Lecturas
            if (datoGeneralLectura === 0) {
              calcularLectura = 0;
            } else {
              calcularLectura = Math.round((datoLectura / datoGeneralLectura) * 100);
            }
          })
        })
      }

    })
    user.stats = {
      percent: userProgressPercent,
      exercises: {
        total: datoGeneralEjercicio,
        completed: datoEjercicio,
        percent: calcularEjercicio
      },
      reads: {
        total: datoGeneralLectura,
        completed: datoLectura,
        percent: calcularLectura
      },
      quizzes: {
        total: datoGeneralQuiz,
        completed: datoQuiz,
        percent: calcularQuiz,
        scoreSum: progressTotalQuiz,
        scoreAvg: QuizzeProgress
      }
    }
    return user
  })
  return usersWithStats;
};

 window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === "name" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      if (primerD.name > segundoD.name) {
        return 1;
      } else if (primerD.name < segundoD.name) {
        return -1;
      }
      return 0;
    })
  }else  if (orderBy === "name" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      if (primerD.name < segundoD.name) {
        return 1;
      } else if (primerD.name > segundoD.name) {
        return -1;
      }
      return 0;
    })
  }
  if (orderBy === "completitud" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.percent - segundoD.stats.percent);
    })
  }else  if (orderBy === "completitud" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (segundoD.stats.percent - primerD.stats.percent);
    })
  }
  if (orderBy === "ejercicios" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.exercises.percent - segundoD.stats.exercises.percent);
    })
  }else  if (orderBy === "ejercicios" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (segundoD.stats.exercises.percent - primerD.stats.exercises.percent);
    })
  }
  if (orderBy === "lecturas" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.reads.percent - segundoD.stats.reads.percent);
    })
  }else  if (orderBy === "lecturas" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (segundoD.stats.reads.percent - primerD.stats.reads.percent);
    })
  }
  if (orderBy === "quizzes" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.quizzes.percent - segundoD.stats.quizzes.percent);
    })
  }else if (orderBy === "quizzes" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.quizzes.percent - segundoD.stats.quizzes.percent);
    })
  }
  return users;
};
 window.filterUsers = (users, search) => {
  return users.filter((user) => {
    return user.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  })
} 
window.processCohortData = (options) => {
  let arrayCourses = Object.keys(options.cohort[0].coursesIndex);
  let computeUser = computeUsersStats(options.cohortData.users, options.cohortData.progress, arrayCourses);
  let sortUserWithCompute = sortUsers(computeUser, options.orderBy, options.orderDirection);
  if (options.search !== " ") {
    let filterUsersWithSort = filterUsers(sortUserWithCompute, options.search);
    return filterUsersWithSort
  }
  return computeUser;

};