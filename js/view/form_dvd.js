class FormDvd {

    constructor(controller, seletor){
        this.dvdController = controller;
        this.seletor = seletor;
    }

    montarForm(dvd){
        if(!dvd){
            dvd = new Dvd();
        }
        var str = `
        <form id="formulario">
            <input type="hidden" id="cod_dvdDvd" value="${dvd.cod_dvd}" />
            <label class="texto2" for="txttitulo">Titulo:</label>
            <input class="campos2" type="text" id="txttitulo" value="${dvd.titulo ?dvd.titulo :''}">
            <br />
            <label class="texto2" for="txtvalor">Valor:</label>
            <input class="campos2" type="text" id="txtvalor" value="${dvd.valor ?dvd.valor :''}">
            <br />
            <label class="texto2" for="txtlocado">Locado:</label>
            <input class="campos2" type="text" id="txtlocado" value="${dvd.locado ?dvd.locado :''}">
            <br />
            <br />
            <input class="btn2" type="submit" id="btnsalvar" value="Salvar">
            <input class="btn2" type="reset" value="Cancelar">
            <br />
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){            
            if(!dvd.cod_dvd){
                self.dvdController.salvar(event);
            }
            else{
                self.dvdController.Atualizar(dvd.cod_dvd,event);
            }
        }

        form.onreset = function(event){
            event.preventDefault();
            self.dvdController.carregarDvds();
        }
    }

    limparFormulario(){
        document.querySelector("#txttitulo").value="";
        document.querySelector("#txtvalor").value="";
        document.querySelector("#txtlocado").value="";
    }

    getDataDvd(){
        let dvd = new Dvd();
        if(!document.querySelector("#cod_dvdDvd").value)
            dvd.cod_dvd = document.querySelector("#cod_dvdDvd").value;
        dvd.titulo = document.querySelector("#txttitulo").value;
        dvd.valor = document.querySelector("#txtvalor").value;
        dvd.locado = document.querySelector("#txtlocado").value;

        return dvd;
    }

}