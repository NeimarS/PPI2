class LoginService {
    constructor(){
        this.uri = "https://traback.herokuapp.com/login";
    }
    //listar_clientes
    logar(ok, error, login) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                if (this.status === 201) {
                    try{
                    ok(JSON.stringify(JSON.parse(this.responseText)));
                    //console.log(JSON.parse(this.response));
                    } catch(msg){
                        error(msg);
                    }
                }
                else{
                    error(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(login));
    }

    
}