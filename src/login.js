const buttonShowMenu=document.getElementById("menu-toggle");
let aux=0;
buttonShowMenu.addEventListener('click',()=>{
 
    if(aux===0){
        document.getElementById('sidebar-wrapper').style.display='block';
        aux=1;
    }else{
        document.getElementById('sidebar-wrapper').style.display='none';
        aux=0;
    }
})

