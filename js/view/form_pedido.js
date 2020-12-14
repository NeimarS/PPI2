class FormPedido {

    constructor(controller, seletor){
        this.pedidoController = controller;
        this.seletor = seletor;
    }
    //cliente - aqui
    montarForm(clientes, dvds, pedido){
        if(!pedido){
            pedido = new Pedido();
        }
        /*
        <label class="texto2" for="txtcod_cli">Cliente:</label>
            <input class="campos2" type="text" id="txtcod_cli" value="${pedido.cod_cli ?pedido.cod_cli :''}">
        */    

        var str = `
        <form id="formulario">
            <input type="hidden" id="cod_pedidoPedido" value="${pedido.cod_pedido}" />
            
            <br />
            <label class="texto2" for="dropcliente">Cliente:</label>
            <select id="dropcliente" class="campos3">
            `;
            
            for(const cliente of clientes){
                str+=`<option id="${cliente.cod_cli}" class="campos3">${cliente.nome}</option>`;
            }
            str += `
            </select>
            <br/>
            <label class="texto2" for="dropDvd1">Dvd1:</label>
            <select id="dropDvd1" class="campos3">
            `;
            str+=`<option id="" class="campos3"> </option>`;
            for(const dvd of dvds){
                str+=`<option id="${dvd.cod_dvd}" class="campos3">${dvd.titulo}</option>`;
            }
            str += `
            </select>
            <br/>
            <label class="texto2" for="dropDvd2">Dvd2:</label>
            <select id="dropDvd2" class="campos3">
            `;
            str+=`<option id="" class="campos3"> </option>`;
            for(const dvd of dvds){
                str+=`<option id="${dvd.cod_dvd}" class="campos3">${dvd.titulo}</option>`;
            }
            str += `
            </select>
            <br/>
            <label class="texto2" for="dropDvd3">Dvd3:</label>
            <select id="dropDvd3" class="campos3">
            `;
            str+=`<option id="" class="campos3"> </option>`;
            for(const dvd of dvds){
                str+=`<option id="${dvd.cod_dvd}" class="campos3">${dvd.titulo}</option>`;
            }
            str += `
            </select>
            <br/>
            <label class="texto2" for="dropDvd4">Dvd4:</label>
            <select id="dropDvd4" class="campos3">
            `;
            str+=`<option id="" class="campos3"> </option>`;
            for(const dvd of dvds){
                str+=`<option id="${dvd.cod_dvd}" class="campos3">${dvd.titulo}</option>`;
            }
            str += `
            </select>
            <br/>
            <label class="texto2" for="dropDvd5">Dvd5:</label>
            <select id="dropDvd5" class="campos3">
            `;
            str+=`<option id="" class="campos3"> </option>`;
            for(const dvd of dvds){
                str+=`<option id="${dvd.cod_dvd}" class="campos3">${dvd.titulo}</option>`;
            }
            str+=`
            
            <input class="btn4" type="submit" id="btnsalvar" value="Salvar">
            <input class="btn5" type="reset" value="Cancelar">
            <br />
        </form>
        `;

        /*
        <label class="texto2" for="txtvencimento">Vencimento:</label>
            <input class="campos2" type="text" id="txtvencimento" value="${pedido.vencimento ?pedido.vencimento :''}">
            <br />
            <label class="texto2" for="txtvalortotal">Valortotal:</label>
            <input class="campos2" type="text" id="txtvalortotal" value="${pedido.valortotal ?pedido.valortotal :''}">
            <br />
            <label class="texto2" for="txtsituacao">Situacao:</label>
            <input class="campos2" type="text" id="txtsituacao" value="${pedido.situacao ?pedido.situacao :''}">
            <br />
        */

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){            
            if(!pedido.cod_pedido){
                self.pedidoController.salvar(event);
            }
            else{
                self.pedidoController.Atualizar(pedido.cod_pedido,event);
            }
        }

        form.onreset = function(event){
            event.preventDefault();
            self.pedidoController.carregarPedidos();
        }
    }

    limparFormulario(){
        //document.querySelector("#txtcod_cli").value="";
        document.querySelector("#dropdvd1").value="";
        document.querySelector("#dropdvd2").value="";
        document.querySelector("#dropdvd3").value="";
        document.querySelector("#dropdvd4").value="";
        document.querySelector("#dropdvd5").value="";
    }

    getDataPedido(){
        let pedido = new Pedido();
        if(!document.querySelector("#cod_pedidoPedido").value)
            pedido.cod_pedido = document.querySelector("#cod_pedidoPedido").value;
        
        //pedido.cod_cli = document.querySelector("#txtcod_cli").value;
        const sel = document.querySelector("#dropcliente");
        const opt = sel.options[sel.selectedIndex];
        pedido.cod_cli = opt.id;
        //alert(opt.id);
        //produto.marca = new Marca(opt.value);
        //produto.marca.id = opt.id;
        const dvd1 = document.querySelector("#dropDvd1");
        const opt_dvd1 = dvd1.options[dvd1.selectedIndex];
        pedido.dvd1 = opt_dvd1.id;

        const dvd2 = document.querySelector("#dropDvd2");
        const opt_dvd2 = dvd2.options[dvd2.selectedIndex];
        pedido.dvd2 = opt_dvd2.id;
        
        const dvd3 = document.querySelector("#dropDvd3");
        const opt_dvd3 = dvd3.options[dvd3.selectedIndex];
        pedido.dvd3 = opt_dvd3.id;

        const dvd4 = document.querySelector("#dropDvd4");
        const opt_dvd4 = dvd4.options[dvd4.selectedIndex];
        pedido.dvd4 = opt_dvd4.id;

        const dvd5 = document.querySelector("#dropDvd5");
        const opt_dvd5 = dvd5.options[dvd5.selectedIndex];
        pedido.dvd5 = opt_dvd5.id;

        //pedido.dvd2 = document.querySelector("#txtdvd2").value;
        //pedido.dvd3 = document.querySelector("#txtdvd3").value;
        //pedido.dvd4 = document.querySelector("#txtdvd4").value;
        //pedido.dvd5 = document.querySelector("#txtdvd5").value;
        /*
        pedido.vencimento = document.querySelector("#txtvencimento").value;
        pedido.valortotal = document.querySelector("#txtvalortotal").value;
        pedido.situacao = document.querySelector("#txtsituacao").value;
        */
       
        return pedido;
    }

}