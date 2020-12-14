const produtoController = new ProdutoController();

let body = document.querySelector("body");
body.onload = function () {
    produtoController.carregarProdutos();
}

let form = document.querySelector("#formulario");
form.onsubmit = function(event){
    produtoController.salvar(event);
}
