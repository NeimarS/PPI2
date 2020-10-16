<?php

require_once('Pedido.php');
require_once('ProdutoDAO.php');

class PedidoDAO {
    //------------------------------Regras de Negócio------------------------------------------------//
    //Função pra verificar se já tem 5 dvds locados, verificar data de vencimento do pedido, qtde de dvds pedidos e setar situação do pedido
    function validar_pedido($tipo, $data) {
        $cod_cli = $data['cod_cli'];
        $dvd1 = isset($data['dvd1'])?$data['dvd1']:0;
        $dvd2 = isset($data['dvd2'])?$data['dvd2']:0;
        $dvd3 = isset($data['dvd3'])?$data['dvd3']:0;
        $dvd4 = isset($data['dvd4'])?$data['dvd4']:0;
        $dvd5 = isset($data['dvd5'])?$data['dvd5']:0;

        $cod_pedido = isset($data['cod_pedido'])?$data['cod_pedido']:0;
        
        //verificar quantidade de dvds pedidos
        $qtdDVDPedido = 0;
        if ($dvd1 != 0){
            $qtdDVDPedido++;
        }
        if ($dvd2 != 0){
            $qtdDVDPedido++;
        }
        if ($dvd3 != 0){
            $qtdDVDPedido++;
        }
        if ($dvd4 != 0){
            $qtdDVDPedido++;
        }
        if ($dvd5 != 0){
            $qtdDVDPedido++;
        }
        if ($dvd1 == 0 and $dvd2 == 0 and $dvd3 == 0 and $dvd4 == 0 and $dvd5 == 0) {
            return 1; // Não locou nenhum dvd
        }
        $pedidos = $this->buscarPedidoPorCliente($cod_pedido, $cod_cli);
        $qtdDVDLocado = 0;
        foreach ($pedidos as $row){
            foreach ($row as $campo => $val){
                if ($campo == 'dvd1' or $campo == 'dvd2' or $campo == 'dvd3' or $campo == 'dvd4' or $campo == 'dvd5') {
                    $qtdDVDLocado += $val == 0 ? 0:1;
                }
                if ($campo == 'vencimento') {
                    if (date('Y-m-d') > $val) {
                        return 2; //pedido com devolução vencida
                    }
                }
            }
        } 
        if ($qtdDVDPedido + $qtdDVDLocado > 5) {
            return 3; //Cliente não pode ter mais de 5 filmes locados
        }
        date_default_timezone_set('America/Sao_Paulo');
        if ($tipo == 'alterar') {
            $ver_vencimento = $this->verificar_vencimento($cod_pedido);
            foreach ($ver_vencimento as $row){
                foreach ($row as $campo => $vencimento){
                   //pegar valor do array e jogar em $valT
                }
            } 
        }
        else {
            $vencimento = date('Y/m/d', strtotime('+5 days'));
        }
        $situacao = 'aberto';
        //fazer o sum para o valor total
        $valortotal = $this->buscarValorTotal($dvd1, $dvd2, $dvd3, $dvd4, $dvd5);
        foreach ($valortotal as $row){
            foreach ($row as $campo => $valT){
               //pegar valor do array e jogar em $valT
            }
        } 
        if ($tipo == "alterar") {
            $pedido = new Pedido($cod_pedido, $data['cod_cli'], $dvd1, $dvd2, $dvd3, $dvd4, $dvd5, $vencimento, $valT, $situacao);    
        }
        else {
            $pedido = new Pedido(0,$data['cod_cli'], $dvd1, $dvd2, $dvd3, $dvd4, $dvd5, $vencimento, $valT, $situacao);
        }
        return $pedido;

    }// fim da função validar_pedido

    //------------------------------funções Pedido--------------------------------------------//
    function inserir_pedido(Pedido $pedido){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("INSERT INTO pedido (cod_cli, dvd1, dvd2, dvd3, dvd4, dvd5, vencimento, valortotal, situacao)
            VALUES (:cod_cli, :dvd1, :dvd2, :dvd3, :dvd4, :dvd5, :vencimento, :valortotal, :situacao)");
            $cod_cli = $pedido->getCodCli();
            $dvd1 = $pedido->getDvd1();
            $dvd2 = $pedido->getDvd2();
            $dvd3 = $pedido->getDvd3();
            $dvd4 = $pedido->getDvd4();
            $dvd5 = $pedido->getDvd5();
            $vencimento = $pedido->getVencimento();
            $valortotal = $pedido->getValorTotal();
            $situacao = $pedido->getSituacao();
            $stmt->bindParam(':cod_cli', $cod_cli);
            $stmt->bindParam(':dvd1', $dvd1);
            $stmt->bindParam(':dvd2', $dvd2);
            $stmt->bindParam(':dvd3', $dvd3);
            $stmt->bindParam(':dvd4', $dvd4);
            $stmt->bindParam(':dvd5', $dvd5);
            $stmt->bindParam(':vencimento', $vencimento);
            $stmt->bindParam(':valortotal', $valortotal);
            $stmt->bindParam(':situacao', $situacao);
            $stmt->execute();
        } 
            catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function buscarPedidoPorCliente($cod_pedido, $cod_cli){
        $pdo = ProdutoDAO::getConexao();
        $q = "SELECT * FROM pedido WHERE cod_cli=:cod_cli and situacao='aberto' and cod_pedido!=:cod_pedido";
        $comando = $pdo->prepare($q);
        $comando->bindParam(":cod_cli", $cod_cli);
        $comando->bindParam(":cod_pedido", $cod_pedido);
        $comando->execute();
        $comando->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
        $obj = $comando->fetchAll(PDO::FETCH_ASSOC);
        return($obj);
    }
    
    function buscarValorTotal($dvd1, $dvd2, $dvd3, $dvd4, $dvd5) {
        $pdo = ProdutoDAO::getConexao();
        $q = "SELECT sum(valor) as vtotal FROM dvd WHERE cod_dvd in (:dvd1, :dvd2, :dvd3, :dvd4, :dvd5)";
        $comando = $pdo->prepare($q);
        $comando->bindParam(":dvd1", $dvd1);
        $comando->bindParam(":dvd2", $dvd2);
        $comando->bindParam(":dvd3", $dvd3);
        $comando->bindParam(":dvd4", $dvd4);
        $comando->bindParam(":dvd5", $dvd5);
        $comando->execute();
        $comando->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
        $obj = $comando->fetchAll(PDO::FETCH_ASSOC);
        return($obj);
    }

    function devolver_pedido($cod_pedido) {
        $pdo = ProdutoDAO::getConexao();
        $q = "UPDATE pedido Set situacao='fechado' WHERE cod_pedido=:cod_pedido";
        $comando = $pdo->prepare($q);
        $comando->bindParam(":cod_pedido", $cod_pedido);
        $comando->execute();
    }

    function listar_todos_pedidos($id){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT * FROM pedido WHERE cod_cli=:cod_cli");
            $stmt->bindParam(":cod_cli", $id);
            $stmt->execute();
            $todosPedidos = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $todosPedidos;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function verificar_vencimento($cod_pedido) {
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT vencimento FROM pedido WHERE cod_pedido=:cod_pedido");
            $stmt->bindParam(":cod_pedido", $cod_pedido);
            $stmt->execute();
            $vencimento = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $vencimento;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function atualizar_pedido($cod_pedido,Pedido $pedidoatualizado)
    {    
        $pdo = ProdutoDAO::getConexao();
        $qAtualizar = "UPDATE pedido SET dvd1=:dvd1, dvd2=:dvd2, dvd3=:dvd3, dvd4=:dvd4, dvd5=:dvd5, vencimento=:vencimento, valortotal=:valortotal, situacao=:situacao WHERE cod_pedido=:cod_pedido";            
        $comando = $pdo->prepare($qAtualizar);
        $comando->bindValue(":cod_pedido",$cod_pedido);
        $comando->bindValue(":dvd1",$pedidoatualizado->getDvd1());
        $comando->bindValue(":dvd2",$pedidoatualizado->getDvd2());
        $comando->bindValue(":dvd3",$pedidoatualizado->getDvd3());
        $comando->bindValue(":dvd4",$pedidoatualizado->getDvd4());
        $comando->bindValue(":dvd5",$pedidoatualizado->getDvd5());
        $comando->bindValue(":vencimento",$pedidoatualizado->getVencimento());
        $comando->bindValue(":valortotal",$pedidoatualizado->getValortotal());
        $comando->bindValue(":situacao",$pedidoatualizado->getSituacao());
        $comando->execute();       
    }

}//fim da classe DvdDAO
?>