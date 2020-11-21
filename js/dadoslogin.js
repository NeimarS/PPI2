//Função para incluir outro javascript nesse
<script type="text/javascript">
  document.write(unescape("%3Cscript src='js/cliente.js' type='text/javascript'%3E%3C/script%3E"));
</script>

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
    var cont = 0;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            console.log(JSON.parse(this.responseText));
            limparFormulario();
        }; 

        if (this.readyState === 4 && this.status === 401 ) {
            alert("Login ou senha inválidos!");
            limparFormulario();
        }
           
    };
    
    xhttp.open("POST", "https://traback.herokuapp.com/login", true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(login));   
    
}

function limparFormulario(){
    document.querySelector("#login").value="";
    document.querySelector("#senha").value="";
}


  