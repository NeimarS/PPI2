<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
include_once 'Cliente.php';
include_once 'ClienteDAO.php';

class ClienteController {

    public function inserir(Request $request, Response $response, array $args) {  
        $data = $request->getParsedBody();
        $cliente = new Cliente(0,$data['nome'],$data['endereco'], $data['telefone'], $data['cpf'], $data['login'], $data['senha']);
        $dao = new ClienteDAO;
        
        $verCpf = $dao->verCpf("cadastrar", $data['cpf'], $data['login'], 0);
        if ($verCpf == 1) {
            $cadastrado = "Cpf ou login já cadastrado(s)";
            $payload = json_encode($cadastrado);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        else {
            $cliente = $dao->inserir_cliente($cliente);
            $payload = json_encode($data);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json')
                      ->withStatus(201);
        }   
    } //fim da função inserir

    public function buscar(Request $request, Response $response, $args) {
        $data = $request->getParsedBody();
        $cod_cli = $args['id'];
        $dao = new ClienteDAO();
        $dados = $dao->buscarPorId($cod_cli);
        $payload = json_encode($dados);        
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função buscar

    public function listar(Request $request, Response $response, $args) {      
        $dao = new ClienteDAO();        
        $data = $dao->listar_cliente();
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função listar

    public function deletar(Request $request, Response $response, $args): Response {
        $cod_cli = $args['id'];
        $dao = new ClienteDAO();
        $data = $dao->buscarPorId($cod_cli);
        $dados = $dao->deletar_cliente($cod_cli);  
        $payload = json_encode($data);        
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função deletar

    public function alterar(Request $request, Response $response, array $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();
        $cliente = new Cliente($id, $data['nome'], $data['endereco'], $data['telefone'], $data['cpf'], $data['login'], $data['senha']);
        $dao = new ClienteDAO;
    
        $verCpf = $dao->verCpf("alterar",$data['cpf'], $data['login'], $id);
            if ($verCpf == 1) {
                $cadastrado = "Cpf ou login já cadastrado(s)";
                $payload = json_encode($cadastrado);
                $response->getBody()->write($payload);
                return $response
                          ->withHeader('Content-Type', 'application/json');
            }
            else {
                $cliente = $dao->atualizar_cliente($id,$cliente);
                $payload = json_encode($data);
                $response->getBody()->write($payload);
                return $response
                          ->withHeader('Content-Type', 'application/json');
            }
    } //fim da função alterar

} //fim da classe ClienteController

?>