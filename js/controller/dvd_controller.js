class DvdControler {
    constructor(){
        this.dvdService = new DvdService();
        this.formDvd = new FormDvd(this,"main");
        this.tabelaDvd = new TabelaDvd(this,"main");
    }

    init(){
        this.carregarDvds();
    }

    carregarFormulario(){
        this.formDvd.montarForm();
    }

    carregarDvds(){
        const self = this;

        let sucesso = function(dvd){
            self.tabelaDvd.montarTabela(dvd);
        }

        let erro = function(msg){
            console.error(`Erro: ${msg}`);
            alert("Faça o login antes para acessar essa funcionalidade!");
        }

        this.dvdService.listar_dvd(sucesso, erro);
    }

    salvar(event){
        event.preventDefault();
        let dvd = this.formDvd.getDataDvd();
        this.salvarDvd(dvd);
    }

    limpar(event){
        event.preventDefault();
        this.formDvd.limparFormulario();
        this.carregarDvds();
    }


    /* testando */

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
    /* fim teste */

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

    salvarDvd(dvd){
        const self =this;
        let sucesso = function(){
            alert('Dvd inserido com sucesso.');
            self.carregarDvds();
            self.formDvd.limparFormulario();
        }

        let erro =function(msg){
            console.error(`Erro: ${msg}`);
        }

        this.dvdService.inserirDvd(dvd, sucesso, erro);
    }
    deletarDvd(cod_dvd, event) {
        const self = this;
        this.dvdService.deletarDvd(cod_dvd,
            function() {
                self.carregarDvds();
            },
            function(status){
                console.log(status);
            });
    
    }

    carregarFormularioDvd(cod_dvd, event){
        event.preventDefault();

        const self = this;
        const ok = function(dvd){
            self.formDvd.montarForm(dvd);
        }

        const erro = function(status){
            console.log(status);
        }

        this.dvdService.buscarDvdId(cod_dvd,ok,erro);
    }

    Atualizar(id, event){
        event.preventDefault();

        let dvd = this.formDvd.getDataDvd();

        const self = this;
        this.dvdService.atualizarDvd(id, dvd,
            function(){
                self.formDvd.limparFormulario();
                self.carregarDvds();
            },
            function(status){
                console.log(status);
            }
        );
    }
}