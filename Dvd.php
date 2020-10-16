<?php 
class Dvd{
    private $cod_dvd, $titulo, $valor, $locado;

    public function __construct($cod_dvd, $titulo, $valor, $locado){
        $this->cod_dvd = $cod_dvd;
        $this->titulo = $titulo;
        $this->valor = $valor;
        $this->locado = $locado;
    }

    public function getCod_dvd(){
        return $this->cod_dvd;
    }

    public function getTitulo(){
        return $this->titulo;
    }

    public function getValor(){
        return $this->valor;
    }

    public function getLocado(){
        return $this->locado;
    }

    public function setTitulo($titulo){
        $this->titulo = $titulo;
    }

    public function setValor($valor){
        $this->valor = $valor;
    }

    public function setLocado($locado){
        $this->locado = $locado;
    }
}
?>