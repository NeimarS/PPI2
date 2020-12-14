//Função para incluir outro javascript nesse
function include(file_path) {
    var j = document.createElement("script");   
    j.type = "text/javascript";
    j.src = "js/" + file_path;
    document.body.appendChild(j);
  };
//incluir clientes
include("clientes.js");

//Função para setar cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
//Função pra pegar cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Checar se o cookie foi setado
  function checkCookie() {
    var username = getCookie("token");
    if (username != "") {
     alert("Welcome again " + token);
    } else {
      username = prompt("Please enter your name:", "");
      if (username != "" && username != null) {
        //setCookie("username", username, 365);
      }
    }
  }
  

var form = document.querySelector("#formulario");
form.onsubmit = function(event){
    event.preventDefault();
    var login = new Login();
    login.login = document.querySelector("#login").value;
    login.senha = document.querySelector("#senha").value;
    enviarLogin(login);
}

function enviarLogin(login){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            setCookie("token", JSON.parse(this.responseText), "1" );
            console.log(getCookie("token"));
            console.log("teset2");
            checkCookie();
            limparFormulario();
        }; 

        if (this.readyState === 4 && this.status === 401 ) {
            alert("Login ou senha inválidos!");
            limparFormulario();
        }
           
    };
    
    xhttp.open("POST", "http://localhost:8080/login", true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(login));   
    
}

function limparFormulario(){
    document.querySelector("#login").value="";
    document.querySelector("#senha").value="";
}


  