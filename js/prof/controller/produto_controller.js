class ProdutoController {
    constructor(){
        this.produtoService = new ProdutoService();
        this.formProdutos = new FormProdutos(this, "main");
        this.tabelaProdutos = new TabelaProdutos(this, "main");
    }

    init(){
        this.carregarProdutos();
    
    }

    carregarFormulario(){
        this.formProdutos.montarForm();
    }

    carregarProdutos(){
        const self = this;

        let sucesso = function(produtos) {
            self.tabelaProdutos.montarTabela(produtos);
        }

        let erro = function(msg) {
            console.error(`Erro: ${msg}`);
        }

        this.produtoService.buscarProdutos(sucesso, erro);
    }

    salvar(event){
        event.preventDefault();
        let produto = this.formProdutos.getDataProduto();
        this.salvarProduto(produto);    
    }

    limpar(event){
        event.preventDefault();
        this.formProdutos.limparFormulario();
        this.carregarProdutos();
    }


    salvarProduto(produto){
        const self = this;
        let sucesso = function() {
            alert("Produto cadastrado com sucesso");
            self.carregarProdutos();
            self.formProdutos.limparFormulario();
        }

        let erro = function(msg) {
            console.error(`Erro: ${msg}`);
        }

        this.produtoService.inserirProduto(produto, sucesso, erro);      

    }

    deletarProduto(id, event){
        const self = this;
        this.produtoService.deletarProduto(id, 
            //colocar direto a funcao no parametro
            //nao precisa criar a variavel ok e erro
            function() {
                self.carregarProdutos();
            },
            function(status) { 
                console.log(status);
            }
        );
    }

    carregaFormularioComProduto(id, event){
        event.preventDefault();             
        
        const self = this;
        const ok = function(produto){
            self.formProdutos.montarForm(produto);
        }
        const erro = function(status){
            console.log(status);
        }

        this.produtoService.buscarProduto(id,ok,erro);   
    }

    editar(id,event){
        event.preventDefault();
    
        let produto = this.formProdutos.getDataProduto();
        
        const self = this;

        this.produtoService.atualizarProduto(id,produto, 
            function() {
                self.formProdutos.limparFormulario();
                self.carregarProdutos();
            },
            function(status) {
                console.log(status);
            } 
        );

    }

}

