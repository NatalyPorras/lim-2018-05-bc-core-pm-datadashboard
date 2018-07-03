window.computeUsersStats = (users, progress, courses) => {
  let datoLectura = 0, datoGeneralLectura = 0;
  let datoQuiz = 0, datoGeneralQuiz = 0;
  let datoEjercicio = 0, datoGeneralEjercicio = 0;
  let progressTotalQuiz = 0; calcularEjercicio = 0, calcularLectura = 0, calcularQuiz = 0, QuizzeProgress = 0;
<<<<<<< HEAD
  let usuarios = users;
  users.forEach((user) => {

      const userId = user.id;
      const userProgress = progress[userId];
      if (userProgress && userProgress.hasOwnProperty('intro') && userProgress.intro.hasOwnProperty('units')) {
        const units = userProgress.intro.units;
        const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
          return sumProgress + units[unit].percent;
        }, 0)
        userProgressPercent = Math.round(progressTotal / Object.keys(units).length);
        for (let value in units) {
          const parts = units[value].parts;
          for (const part in parts) {
            // Calcular datos de Ejercicios
            const exercises = parts[part].exercises;
            for (const exercise in exercises) {
              if (exercises[exercise].hasOwnProperty("completed")) {
                datoGeneralEjercicio++;
                if (exercises[exercise].completed === 1) {
                  datoEjercicio++;
                }
              }
            }
            // Validacion de resultados de Ejercicios
            if (datoEjercicio === 0) {
              calcularEjercicio = 0;
            } else {
              calcularEjercicio = Math.round((datoEjercicio * 100) / datoGeneralEjercicio);
            }
            // Calcular datos de lectura
            if (parts[part].type === "read") {
              if (parts[part].completed === 1) {
                datoLectura++;
              }
              datoGeneralLectura++;  // console.log(datoGeneral);
            }
            // Calcular datos de Preguntas
            if (parts[part].type === "quiz") {
              if (parts[part].completed === 1 && parts[part].hasOwnProperty("score")) {
                progressTotalQuiz += parts[part].score;
                datoQuiz++;
              }
              datoGeneralQuiz++;
            }
          }
          // Validacion de resultados de Preguntas con score
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
        }
      }
    const usersWithStats = {
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
    user.stats = usersWithStats;
  });

  return usuarios;
=======

   let usersWithStats= users.map((user) => {
    const userId = user.id;
    const userProgress = progress[userId];
    const course=courses.toString();
    if (userProgress && userProgress.hasOwnProperty(course) && userProgress.intro.hasOwnProperty('units')) {
      const units = userProgress.intro.units;
      const progressTotal = Object.keys(units).reduce((sumProgress, unit) => {
        return sumProgress + units[unit].percent;
      }, 0)
      userProgressPercent = Math.round(progressTotal / Object.keys(units).length);
      for (let value in units) {
        const parts = units[value].parts;
        for (const part in parts) {
          // Calcular datos de Ejercicios
          const exercises = parts[part].exercises;
          for (const exercise in exercises) {
            if (exercises[exercise].hasOwnProperty("completed")) {
              datoGeneralEjercicio++;
              if (exercises[exercise].completed === 1) {
                datoEjercicio++;
              } 
            }
          }
          // Validacion de resultados de Ejercicios
          if (datoEjercicio === 0) {
            calcularEjercicio = 0;
          } else {
            calcularEjercicio = Math.round((datoEjercicio * 100) / datoGeneralEjercicio);
          }

          // Calcular datos de lectura
          if (parts[part].type === "read") {
            if (parts[part].completed === 1) {
              datoLectura++;
            } 
            datoGeneralLectura++;  // console.log(datoGeneral);
          }
          // Calcular datos de Preguntas
          if (parts[part].type === "quiz") {
            if (parts[part].completed === 1 && parts[part].hasOwnProperty("score")) {
              progressTotalQuiz += parts[part].score;
              datoQuiz++;
            }
            datoGeneralQuiz++;
          }
        }
        // Validacion de resultados de Preguntas con score
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
      }
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
    }else {
      user.stats = {
        percent: 0,
        exercises: {
          total: 0,
          completed: 0,
          percent: 0
        },
        reads: {
          total: 0,
          completed: 0,
          percent: 0
        },
        quizzes: {
          total: 0,
          completed: 0,
          percent: 0,
          scoreSum: 0,
          scoreAvg: 0
        }
  
      }
    }
    return user;

  });
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238

  return usersWithStats;
};
<<<<<<< HEAD
=======

>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
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
<<<<<<< HEAD
  }else if (orderBy === "completitud" && orderDirection === "Descendente") {
=======
  }else  if (orderBy === "completitud" && orderDirection === "Descendente") {
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
    users.sort((primerD, segundoD) => {
      return (segundoD.stats.percent - primerD.stats.percent);
    })
  }
<<<<<<< HEAD
 
=======
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
  if (orderBy === "ejercicios" && orderDirection === "Ascendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.exercises.percent - segundoD.stats.exercises.percent);
    })
<<<<<<< HEAD
  }else if (orderBy === "ejercicios" && orderDirection === "Descendente") {
=======
  }else  if (orderBy === "ejercicios" && orderDirection === "Descendente") {
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
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
<<<<<<< HEAD
  }else  if (orderBy === "quizzes" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (segundoD.stats.quizzes.percent - primerD.stats.quizzes.percent);
=======
  }else if (orderBy === "quizzes" && orderDirection === "Descendente") {
    users.sort((primerD, segundoD) => {
      return (primerD.stats.quizzes.percent - segundoD.stats.quizzes.percent);
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
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
  let arrC = Object.keys(options.cohort.coursesIndex);
  let computeUser = computeUsersStats(options.cohortData.users, options.cohortData.progress, arrC);
  let sortUserWithCompute = sortUsers(computeUser, options.orderBy, options.orderDirection);
  if (options.search !== " ") {
<<<<<<< HEAD
    let filterUsersWithSort = filterUsers(computeUser, options.search);
=======
    let filterUsersWithSort = filterUsers(sortUserWithCompute, options.search);
>>>>>>> 9d5226314c4dc03b2c005c5ff99f647d59618238
    return filterUsersWithSort

  }
  return sortUserWithCompute;

};