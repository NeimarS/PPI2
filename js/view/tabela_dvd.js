class TabelaDvd{
    constructor(controller, seletor){
        this.dvdController = controller;
        this.seletor = seletor;
    }

    montarTabela(dvd){
        var str=`
        
        <main>
        <h2 align="center">Tabela de Dvds</h2>
        <button><a id='inserir' href="#"><input type="button" value="Inserir" class="btn"></a></button>
        <div id="tabela">
        <br/>
        
        <table width="100%> align="left" bgcolor="grey">
            <tr>
                <th align="center"><FONT COLOR="0000FF">Id</th>
                <th align="center"><FONT COLOR="0000FF">Titulo</th>
                <th align="center"><FONT COLOR="0000FF">Valor</th>
                <th align="center"><FONT COLOR="0000FF">Locado</th>
                <th colspan="2"><FONT COLOR="0000FF">Opção</th>
            </tr>`;

        for(var i in dvd){
            str+=`<tr id=${dvd[i].cod_dvd}>
                    <td align="center">${dvd[i].cod_dvd}</td>
                    <td align="center">${dvd[i].titulo}</td>
                    <td align="center">${dvd[i].valor}</td>
                    <td align="center">${dvd[i].locado}</td>
                    <td><a class="atualizar" href="#"><input type="button" value="Atualizar" class="btn3"></a></td>
                    <td><a class="deletar" href="#"><input type="button" value="Deletar" class="btn3"></a></td>
                </tr>`;    
        } 
        str+= `</table>
                </div>
                </main>`;

        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;
    
        var linkInserir = document.querySelector('#inserir');
        const self = this;
        linkInserir.onclick = function(event){
            self.dvdController.carregarFormulario(event);
        }

        const linksDeletar = document.querySelectorAll(".deletar");
        for(let linkDeletar of linksDeletar){
            const id = linkDeletar.parentNode.parentNode.id;
            linkDeletar.onclick = function(event){
                console.log("id:", id);
                self.dvdController.deletarDvd(id);
            }
        }

        const linksAtualizar = document.querySelectorAll(".atualizar");
        for(let linkAtualizar of linksAtualizar)
        {
            const id = linkAtualizar.parentNode.parentNode.id;
            linkAtualizar.addEventListener("click",this.dvdController.carregarFormularioDvd.bind(this.dvdController,id));
        }

    }
}