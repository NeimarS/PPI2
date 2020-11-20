<?php

require_once('Cliente.php');
require_once('ProdutoDAO.php');

class ClienteDAO {
//------------------------------Regras de Negócio------------------------------------------------//
    // Regra para não repetir cpf ou login
    function verCpf($tipo, $cpf, $login, $id) {
        $pdo = ProdutoDAO::getConexao();
        $stmt = $pdo->prepare("SELECT cod_cli, cpf, login FROM cliente WHERE cpf=:cpf or login=:login");
        $stmt->bindParam(':cpf',$cpf);
        $stmt->bindParam(':login',$login);
        $stmt->execute();

        $cpf_login = $stmt->fetch(PDO::FETCH_ASSOC);
        $linha = $stmt->RowCount();
        if ($linha >= 1 and $tipo == "cadastrar") {
            return 1; //não cadastrar
        }
        elseif ($linha < 1 and $tipo == "cadastrar") {
            return 0; //cadastrar
        }
        elseif ($linha == 1 and $tipo == "alterar" and $cpf_login['cod_cli'] != $id) {
            return 1;
        }
        elseif ($linha == 1 and $tipo == "alterar" and $cpf_login['cod_cli'] == $id) {
            return 0;
        }
        else {
            return 1;
        }
    } //fim da função
    //------------------------------funções cliente--------------------------------------------//
    function inserir_cliente(Cliente $cliente) {
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("INSERT INTO cliente (nome, endereco, telefone, cpf, login, senha)
            VALUES (:nome, :endereco, :telefone, :cpf, :login, :senha)");
            $nome = $cliente->getNome();
            $endereco = $cliente->getEndereco();
            $telefone = $cliente->getTelefone();
            $cpf = $cliente->getCpf();
            $login = $cliente->getLogin();
            $senha = $cliente->getSenha();
            $stmt->bindParam(':nome',$nome);
            $stmt->bindParam(':endereco', $endereco);
            $stmt->bindParam(':telefone',$telefone);
            $stmt->bindParam(':cpf',$cpf);
            $stmt->bindParam(':login',$login);
            $stmt->bindParam(':senha',$senha);
            $stmt->execute();
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function listar_cliente(){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT cod_cli, nome, endereco, telefone, cpf FROM cliente");
            $stmt->execute();
            //Para construtores com parâmetros, deve-se passar valores iniciais para 
            //o fetch iniciar.
            //E o fetch_props_late serve para chamar o construtor e depois atribuir 
            //os dados - do contrário, o PDO faz o inverso (ou seja, os valores seriam os do array)
            $listaClientes = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $listaClientes;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function deletar_cliente($cod_cli)
    {
        $pdo = ProdutoDAO::getConexao();
        $qdeletar = "DELETE FROM cliente WHERE cod_cli=:cod_cli";
        $comando = $pdo->prepare($qdeletar);
        $comando->bindParam(':cod_cli',$cod_cli);       
        $comando->execute();
    }

    function buscarPorId($cod_cli){
        $pdo = ProdutoDAO::getConexao();
        $q = "SELECT cod_cli, nome, endereco, telefone, cpf FROM cliente WHERE cod_cli=:cod_cli";
        $comando = $pdo->prepare($q);
        $comando->bindParam(":cod_cli", $cod_cli);
        $comando->execute();
        $comando->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
        $obj = $comando->fetch();
        return($obj);
    }
     
    function atualizar_cliente($cod_cli,Cliente $clienteAlterado)
    {    
        $pdo = ProdutoDAO::getConexao();
        $qAtualizar = "UPDATE cliente SET nome=:nome, telefone=:telefone, endereco=:endereco, cpf=:cpf, login=:login, senha=:senha WHERE cod_cli=:cod_cli";            
        $comando = $pdo->prepare($qAtualizar);
        $comando->bindValue(":nome",$clienteAlterado->getNome());
        $comando->bindValue(":telefone",$clienteAlterado->getTelefone());
        $comando->bindValue(":endereco",$clienteAlterado->getEndereco());
        $comando->bindValue(":cpf",$clienteAlterado->getCpf());
        $comando->bindValue(":login",$clienteAlterado->getLogin());
        $comando->bindValue(":senha",$clienteAlterado->getSenha());
        $comando->bindParam(":cod_cli",$cod_cli);
        $comando->execute();       
    }
    //função de autenticação para uso com o token
    public function buscaPorLogin($login)  {
 		    $query = 'SELECT * FROM cliente WHERE login=:login';		
            $pdo = ProdutoDAO::getConexao();
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('login', $login);
		    $comando->execute();
            $obj = $comando->fetch(PDO::FETCH_OBJ);
            $resultado = $obj; //linha minha
            //$resultado = (array) $obj;
		    return $resultado;
    }


}//fim da classe ClienteDAO
?>