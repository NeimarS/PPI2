const produtoController = new ProdutoController();

let body = document.querySelector("body");
body.onload = function () {
    produtoController.init();
}