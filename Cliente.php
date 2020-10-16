<?php 
class Cliente{
    private  $cod_cli, $nome, $endereco, $telefone, $cpf, $login, $senha; 

    public function __construct($cod_cli, $nome, $endereco, $telefone, $cpf, $login, $senha){
        $this->cod_cli = $cod_cli;
        $this->nome = $nome;
        $this->endereco = $endereco;
        $this->telefone = $telefone;
        $this->cpf = $cpf;
        $this->login = $login;
        $this->senha = $senha;
    }

    public function getCod_cli(){
        return $this->cod_cli;
    }

    public function getNome(){
        return $this->nome;
    }

    public function getEndereco(){
        return $this->endereco;
    }
    
    public function getTelefone(){
        return $this->telefone;
    }

    public function getCpf(){
        return $this->cpf;
    }

    public function getLogin(){
        return $this->login;
    }

    public function getSenha(){
        return $this->senha;
    }

    public function setNome($nome){
        $this->nome = $nome;
    }

    public function setEndereco($endereco){
        $this->endereco = $endereco;
    }

    public function setTelefone($telefone){
        $this->telefone = $telefone;
    }

    public function setCpf($cpf){
        $this->cpf = $cpf;
    }
    
    public function setLogin($login){
        $this->login = $login;
    }

    public function setSenha($senha){
        $this->senha = $senha;
    }

}
?>