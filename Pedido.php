<?php 
class Pedido{
    private $cod_pedido, $cod_cli, $dvd1, $dvd2, $dvd3, $dvd4, $dvd5, $vencimento, $valortotal, $situacao;

    public function __construct($cod_pedido, $cod_cli, $dvd1, $dvd2, $dvd3, $dvd4, $dvd5, $vencimento, $valortotal, $situacao){
        $this->cod_pedido = $cod_pedido;
        $this->cod_cli = $cod_cli;
        $this->dvd1 = $dvd1;
        $this->dvd2 = $dvd2;
        $this->dvd3 = $dvd3;
        $this->dvd4 = $dvd4;
        $this->dvd5 = $dvd5;
        $this->vencimento = $vencimento;
        $this->valortotal = $valortotal;
        $this->situacao = $situacao;
    }

    public function getCodPed(){
        return $this->cod_pedido;
    }

    public function getCodCli(){
        return $this->cod_cli;
    }

    public function getDvd1(){
        return $this->dvd1;
    }

    public function getDvd2(){
        return $this->dvd2;
    }

    public function getDvd3(){
        return $this->dvd3;
    }

    public function getDvd4(){
        return $this->dvd4;
    }

    public function getDvd5(){
        return $this->dvd5;
    }

    public function getVencimento(){
        return $this->vencimento;
    }

    public function getValortotal(){
        return $this->valortotal;
    }

    public function getSituacao(){
        return $this->situacao;
    }

    public function setCodCli($cod_cli){
        $this->cod_cli = $cod_cli;
    }

    public function setDvd1($dvd1){
        $this->dvd1 = $dvd1;
    }
    
    public function setDvd2($dvd2){
        $this->dvd2 = $dvd2;
    }

    public function setDvd3($dvd3){
        $this->dvd3 = $dvd3;
    }

    public function setDvd4($dvd4){
        $this->dvd4 = $dvd4;
    }

    public function setDvd5($dvd5){
        $this->dvd5 = $dvd5;
    }

    public function setVencimento($vencimento){
        $this->vencimento = $vencimento;
    }

    public function setValortotal($valortotal){
        $this->valortotal = $valortotal;
    }

    public function setSituacao($situacao){
        $this->situacao = $situacao;
    }
}

?>