class PedidoController {
    constructor(){
        this.pedidoService = new PedidoService();
        this.clienteService = new ClienteService();
        this.dvdService = new DvdService();
        this.formPedido = new FormPedido(this,"main");
        this.tabelaPedido = new TabelaPedido(this,"main");
    }

    init(){
        this.carregarPedidos();
    }

    carregarFormulario(){
        //this.formPedido.montarForm(); aqui
        event.preventDefault();

        const self = this;

        //adicionado aqui
        
        this.dvdService.listar_dvd(
            
            function(dvds) 
            { 
                //alert(JSON.stringify(dvds));
                //self.formPedido.montarForm(dvds); 

                self.clienteService.listar_clientes(
                    function(clientes) 
                    { 
                        
                        self.formPedido.montarForm(clientes, dvds); 
                    },
                    function(statusCode) {
                        console.log("Erro - status:",statusCode);
                    }
                )



            },
            function(statusCode) {
                console.log("Erro - status:",statusCode);
            }
            
        )
        
        /*    
        this.clienteService.listar_clientes(
            function(clientes) 
            { 
                
                self.formPedido.montarForm(clientes); 
            },
            function(statusCode) {
                console.log("Erro - status:",statusCode);
            }
        )
        */
        
    }

    carregarPedidos(){
        const self = this;

        let sucesso = function(pedido){
            self.tabelaPedido.montarTabela(pedido);
        }

        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            alert("Faça o login antes para acessar essa funcionalidade!");
        }

        this.pedidoService.listar_pedidos(sucesso, erro);
    }

    salvar(event){
        event.preventDefault();
        let pedido = this.formPedido.getDataPedido();
        this.salvarPedido(pedido);
    }

    limpar(event){
        event.preventDefault();
        this.formPedido.limparFormulario();
        this.carregarPedidos();
    }


    /* testando */
    /*
    carregarLocados(){
        const self = this;

        let sucesso = function(dvd){
            self.tabelaDvd.montarTabela(dvd);
        }

        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            alert('Faça login antes!')
        }

        this.dvdService.listar_locados(sucesso, erro);
    }

    salvar(event){
        event.preventDefault();
        let dvd = this.formDvd.getDataDvd();
        this.salvarDvd(dvd);
    }

    limpar(event){
        event.preventDefault();
        this.formDvd.limparFormulario();
        this.carregarLocados();
    }

    carregarNaoLocados(){
        const self = this;

        let sucesso = function(dvd){
            self.tabelaDvd.montarTabela(dvd);
        }

        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            alert('Faça login antes!')
        }

        this.dvdService.listar_nao_locados(sucesso, erro);
    }
    fim teste */
    /*
    salvar(event){
        event.preventDefault();
        let dvd = this.formDvd.getDataDvd();
        this.salvarDvd(dvd);
    }

    limpar(event){
        event.preventDefault();
        this.formDvd.limparFormulario();
        this.carregarNaoLocados();
    }
    */

    salvarPedido(pedido){
        const self =this;
        let sucesso = function(){
            alert('Pedido inserido com sucesso.');
            self.carregarPedidos();
            self.formPedido.limparFormulario();
        }

        let erro =function(msg){
            alert(msg);
            console.error(`Erro: ${msg}`);
        }
        //alert(JSON.stringify(pedido));
        this.pedidoService.inserirPedido(pedido, sucesso, erro);
    }
    devolverPedido(cod_pedido, event) {
        const self = this;
        this.pedidoService.devolverPedido(cod_pedido,
            function() {
                self.carregarPedidos();
            },
            function(status){
                console.log(status);
            });
    
    }

    carregarFormularioComPedido(cod_pedido, event){
        event.preventDefault();

        const self = this;
        const ok = function(pedido){
            self.formPedido.montarForm(pedido);
        }

        const erro = function(status){
            console.log(status);
        }

        this.pedidoService.buscarPedidoId(cod_pedido,ok,erro);
    }

    Atualizar(id, event){
        event.preventDefault();

        let pedido = this.formPedido.getDataPedido();

        const self = this;
        this.pedidoService.atualizarPedido(id, pedido,
            function(){
                self.formPedido.limparFormulario();
                self.carregarPedidos();
            },
            function(status){
                console.log(status);
            }
        );
    }
}