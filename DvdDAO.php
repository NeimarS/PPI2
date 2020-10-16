<?php

require_once('Dvd.php');
require_once('ProdutoDAO.php');

class DvdDAO {

    //------------------------------funções DVD--------------------------------------------//
    function inserir_dvd(Dvd $dvd){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("INSERT INTO dvd (titulo, valor, locado)
            VALUES (:titulo, :valor, :locado)");
            $titulo = $dvd->getTitulo();
            $valor = $dvd->getValor();
            $locado = $dvd->getLocado();
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':valor', $valor);
            $stmt->bindParam(':locado', $locado);
            $stmt->execute();
        } 
            catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }
    
    function buscarDvdPorId($cod_dvd){
        $pdo = ProdutoDAO::getConexao();
        $q = "SELECT * FROM dvd WHERE cod_dvd=:cod_dvd";
        $comando = $pdo->prepare($q);
        $comando->bindParam(":cod_dvd", $cod_dvd);
        $comando->execute();
        $comando->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
        $obj = $comando->fetch();
        return($obj);
    }
    
    function listar_locado_dvd(){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT * FROM dvd where locado ='S'");
            $stmt->execute();
            $listaDvd = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $listaDvd;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function listar_naolocado_dvd(){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT * FROM dvd where locado ='N'");
            $stmt->execute();
            $listaDvd = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $listaDvd;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function listar_todos_dvd(){
        try{
            $pdo = ProdutoDAO::getConexao();
            $stmt = $pdo->prepare("SELECT * FROM dvd");
            $stmt->execute();
            $listaDvd = $stmt->fetchAll(
                PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
            return $listaDvd;
        }
        catch(PDOException $e)
        {
            echo "Statement failed: " . $e->getMessage();
        }
    }

    function deletar_dvd($cod_dvd)
    {
        $pdo = ProdutoDAO::getConexao();
        $qdeletar = "DELETE FROM dvd WHERE cod_dvd=:cod_dvd";
        $comando = $pdo->prepare($qdeletar);
        $comando->bindParam(':cod_dvd',$cod_dvd);
        $comando->execute();
    }
    
    function atualizar_dvd($cod_dvd, Dvd $dvdAlterado)
    {    
        $pdo = ProdutoDAO::getConexao();
        $qAtualizar = "UPDATE dvd SET titulo=:titulo, valor=:valor, locado=:locado WHERE cod_dvd=:cod_dvd";            
        $comando = $pdo->prepare($qAtualizar);
        $comando->bindValue(":titulo",$dvdAlterado->getTitulo());
        $comando->bindValue(":valor",$dvdAlterado->getValor());
        $comando->bindValue(":locado",$dvdAlterado->getLocado());
        $comando->bindParam(":cod_dvd",$cod_dvd);
        $comando->execute();       
    }    

}//fim da classe DvdDAO
?>