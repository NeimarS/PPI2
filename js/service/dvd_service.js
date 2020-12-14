class DvdService {
    constructor(){
        this.uri = "https://traback.herokuapp.com/dvd";
    }

    listar_dvd(ok, error) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                if (this.status === 200) {
                    try{
                    ok(JSON.parse(this.responseText));
                    } catch(msg){
                        error(msg);
                    }
                }
                else{
                    error(this.status);
                }
            }
        };
        xhttp.open("GET", this.uri+'/listartodos', true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    listar_locados(ok, error) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                if (this.status === 200) {
                    try{
                    ok(JSON.parse(this.responseText));
                    } catch(msg){
                        error(msg);
                    }
                }
                else{
                    error(this.status);
                }
            }
        };
        xhttp.open("GET", this.uri+'/listarlocados', true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    listar_nao_locados(ok, error) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                if (this.status === 200) {
                    try{
                    ok(JSON.parse(this.responseText));
                    } catch(msg){
                        error(msg);
                    }
                }
                else{
                    error(this.status);
                }
            }
        };
        xhttp.open("GET", this.uri+'/listarnaolocados', true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    inserirDvd(dvd, ok, error){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status === 201){
                    ok();
                }
                else{
                    error();(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri+'/inserir', true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(dvd));
    }

    deletarDvd(cod_dvd, ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("DELETE", this.uri+'/deletar/'+cod_dvd, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    buscarDvdId(cod_dvd,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));          
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uri+'/buscar/'+cod_dvd, true);
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send();
    }

    atualizarDvd(cod_dvd,dvd,ok,error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(this.responseText);
            }
            else if(this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("PUT", this.uri+'/alterar/'+cod_dvd, true);
        xhttp.setRequestHeader("Content-Type","application/json")
        xhttp.setRequestHeader("Authorization", localStorage.getItem("token"));
        xhttp.send(JSON.stringify(dvd));
    }
}