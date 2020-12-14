const dvdController = new DvdControler();

let listar_dvd = document.querySelector("#listar_dvd");
listar_dvd.onclick = function(){
    dvdController.init();
}