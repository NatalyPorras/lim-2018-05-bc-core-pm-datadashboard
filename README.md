# Data Dashboard

## Preámbulo

En Laboratoria, las Training Managers (TMs) hacen un gran trabajo al analizar la
mayor cantidad de datos posibles respecto al progreso de las estudiantes para
apoyarlas en su aprendizaje.

La principal medida de progreso de una estudiante en Laboratoria es su avance
completando los proyectos de la [Ruta de Aprendizaje](https://docs.google.com/spreadsheets/d/1AoXQjZnZ5MTPwJPNEGDyvn5vksiOUoPr932TjAldTE4/edit#gid=536983970)
y su desempeño en función a la [Rúbrica de Niveles Esperados](https://docs.google.com/spreadsheets/d/e/2PACX-1vSkQy1waRpQ-16sn7VogiDTy-Fz5e7OSZSYUCiHC_bkLAKYewr4L8pWJ_BG210PeULe-TjLScNQQT_x/pubhtml).
Sin embargo, para completar estos proyectos las estudiantes acceden a contenidos
de aprendizaje (lecturas, videos, ejercicios y quizzes) en un sistema que
llamamos LMS (Learning Management System). El LMS acumula data sobre quién
leyó qué, qué ejercicios se han completado, los resultados de los quizzes, etc.

A pesar de que la data de progreso del LMS (ej. lecturas leídas, ejercicios
  completados, nota en quizzes, etc.) no impacta directamente en la evaluación
  de una estudiante, sí es una pieza de información relevante que las TMs
  quisieran visualizar para tener un mejor entendimiento de cómo va cada
  estudiante en su proceso de aprendizaje.

Así, el reto de este proyecto es crear una interfaz donde las TMs puedan
_ver_ y _usar_ la data de progreso del LMS. Para ello, proponemos crear un
**data dashboard** (_tablero de visualización de datos_).

## Introducción

Según un [estudio de IBM](https://www-01.ibm.com/common/ssi/cgi-bin/ssialias?htmlfid=WRL12345USEN),
el 90% de la data que existe hoy ha sido creada en los últimos dos años.
Cada día generamos 2.5 trillones de bytes de datos, una cifra sin precedentes.

Sin embargo, los datos por sí solos son de poca utilidad. Para transformar datos
en **información** necesitamos procesarlos y entenderlos. Una manera muy
sencilla de hacerlo es creando _visualizaciones_. Las
empresas líderes de hoy generan visualizaciones dinámicas de su data
que les permiten entender mejor su negocio y tomar decisiones apropiadas.

En este proyecto tendrás tu primer acercamiento a transformar data en
información creando tu primer **data dashboard**.

Si pensamos en un _dashboard_ podemos pensar en el tablero de control de un auto
o el de un avión. Un espacio desde el cual un usuario puede tener acceso a la
información y controles más relevantes, en este caso, del vehículo que está
utilizando. El _dashboard_ de un auto le permite a quien conduce saber a qué
velocidad está yendo, qué cambio/velocidad está utilizando, cuánto combustible
tiene disponible, cuál es la temperatura del motor, cuántas revoluciones por
minuto dan las ruedas, cuánta distancia ha recorrido, etc.

![car dashboard](https://img.buzzfeed.com/buzzfeed-static/static/2017-02/7/12/enhanced/buzzfeed-prod-fastlane-03/original-17515-1486490056-3.jpg?crop=2041:1068;80,248)

## Aplicaciones en el mundo real

En el mundo de la web es muy común el uso de _dashboards_. De hecho, [wikipedia](https://goo.gl/P7PF4y)
nos dice que un _dashboard_ puede ser un resumen gráfico de varias piezas de
información importante, generalmente utilizadas para dar una visión general de
una empresa o de un servicio. Así, tenemos dashboards como los de:

* [Google Analytics](https://assets.econsultancy.com/images/resized/0003/3813/mobile_commerce_dashboard-blog-full.png)
  para visualizar la data de tráfico de sitios web.

* [Mailchimp](https://blog.mailchimp.com/wp-content/uploads/2016/11/Dashboard-view-3-Copy-1008x768.jpg)
  para visualizar el desempeño de campañas de mercadeo digital por correo
  electrónico.

* [Quickbooks](https://quickbooks.intuit.com/content/dam/intuit/quickbooks/branding/make-organization-easy-visual.png)
  para visualizar la información financiera de una empresa.

## Objetivos de aprendizaje

El objetivo principal de este proyecto es que aprendas a diseñar y construir una
_interfaz web_ donde podamos visualizar y manipular data.

Esperamos que puedas pensar en el usuario, entender cuál es la mejor manera de visualizar la data según sus necesidades, y plasmar todo eso en tu diseño
en la web.

Además, este proyecto se debe "resolver" en parejas, por lo que un objetivo
importante es ganar experiencia en trabajos colaborativos con entrega grupal.



## Entregables

Los criterios mínimos de aceptación para considerar que has completado este
proyecto son:

### User Experience Design

#### 1) Definición del producto

En el `README.md` cuéntanos cómo pensaste y te acercaste a los usuarios al
desarrollar tu producto (Tip: entrevistas) y cuál fue tu proceso para definir
el producto final a nivel de experiencia y de interfaz. Es importante que
detalles:

* 1.- Quiénes son los principales usuarios de producto: 
    Los principales usuarios a determinar la funcionalidad y el "ok" del producto son los jedas, y como la principal para validar Ale
* 2.- Cuáles son los objetivos de estos usuarios en relación con el producto: 
    El objetivo del producto es visualizar las estadisticas de avance de las alumnas.
* 3.- Cuáles son los datos más relevantes que quieren ver en la interfaz y
    por qué. Cómo los descubriste.:
    Para ello se tuvo una entrevista con la usuaria principal(Ale) quien valida los dato que se deben visualizar en la pantalla y que deben ser primordiales y relevantes para ella.
* 4.- Cuándo revisan normalmente estos datos los usuarios: 
    Cuando necesite ver los detalles de avance en los temas de las alumnas
* 5.- Cómo crees que el producto les está resolviendo sus problemas:
    Brinda un amplio contexto de visualización de resultados, asimismo te permite buscar por nombre a las alumnas y filtrarlas dependiendo a lo que solicite (nombre, ejercicios completados, lecturas completadas, quizzes completados y score)
* 6.- Cómo fue tu proceso de diseño:
  Graias a la entrevista con la usuario se pudo obtener un diseño factible llegando al alcance de la vision de usuario.

#### 2) Sketch de la solución (prototipo de baja fidelidad)

![img_20180702_140217042](https://user-images.githubusercontent.com/21071476/42186191-43f7e844-7e11-11e8-94a7-ddfeda2e61cb.jpg)
![img_20180702_140211864](https://user-images.githubusercontent.com/21071476/42186192-4436c168-7e11-11e8-8512-952637a73e63.jpg)

#### 3) Diseño de la Interfaz de Usuario (prototipo de alta fidelidad)


Se brinda un prototipado fiable, esto se llegaria a cumplir con un tiempo viable para codear
https://www.figma.com/proto/RfzFOq6mLCaLfM8UjKE2vdzr/DATA-DASHBOARD?scaling=scale-down&node-id=50%3A2


### Implementación de la Interfaz de Usuario (HTML/CSS/JS)

Luego de diseñar tu interfaz de usuario deberás trabajar en su implementación.
Como mencionamos, **no** es necesario que construyas la interfaz tal como la
diseñaste. Tendrás un tiempo limitado para hackear, así es que deberás priorizar.


## Puntos de experiencia

* Completando los requerimientos mínimos de este proyecto ganarás 250 XPs.
* Completando el hacker edition de este proyecto ganarás 100 XPs adicionales.
* Completando los ejercicios de manipulación de arreglos en el LMS (https://lms.laboratoria.la/cohorts/lim-2018-05-bc-core-pm/courses/javascript/04-arrays/06-practice)
  ganarás otros 25 XPs.
* Completando los ejercicios de manipulación de objetos en el LMS (https://lms.laboratoria.la/cohorts/lim-2018-05-bc-core-pm/courses/javascript/05-objects/06-practice)
  ganarás otros 25 XPs.
