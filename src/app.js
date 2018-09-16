let auxMenuResponsive = 1;
document.querySelector('#menu-toggle-2').addEventListener('click', () => {

  let openLeftNavBar = document.querySelector('#sidebar-wrapper');
  let openColumn = document.querySelector('#menu');

  if (auxMenuResponsive === 1) {
    openLeftNavBar.style.display = 'block';
    openColumn.style.height = '100vh';
    auxMenuResponsive = 0;
  } else {
    openLeftNavBar.style.display = 'none';
    openColumn.style.height = '65px';
    auxMenuResponsive = 1;
  }
});