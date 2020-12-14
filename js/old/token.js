
function login(){
    var name = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;
            
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/login', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        var result = JSON.parse(this.responseText);

        console.log(`${result.token_type} ${result.access_token}`);

        sessionStorage.setItem("token", `${result.token_type} ${result.access_token}`);

        verifica();
    }

    xhr.send(`grant_type=password&username=${name}&password=${senha}`);
}

function verifica() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/cliente/listar', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `${sessionStorage.getItem('token')}`);

    xhr.onload = function () {
        var result = JSON.parse(this.responseText);

        console.log(`${result}`);
    }

    xhr.send();
}