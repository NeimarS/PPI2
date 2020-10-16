<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
include_once 'Dvd.php';
include_once 'DvdDAO.php';

class DvdController {

    public function inserir(Request $request, Response $response, $args): Response {  
        $data = $request->getParsedBody();
        $dvd = new Dvd(0,$data['titulo'],$data['valor'], $data['locado']);
        $dao = new DvdDAO;
        $dvd = $dao->inserir_dvd($dvd);
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response
                  ->withHeader('Content-Type', 'application/json')
                  ->withStatus(201);
    } //fim da função inserir

    public function buscar(Request $request, Response $response, $args) {
        $data = $request->getParsedBody();
        $cod_dvd = $args['id'];
        $dao = new DvdDAO();
        $dados = $dao->buscarDvdPorId($cod_dvd);
        $payload = json_encode($dados);        
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função buscar

    public function listarlocados(Request $request, Response $response, $args) {      
        $dao = new DvdDAO();        
        $data = $dao->listar_locado_dvd();
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função listarlocados

    public function listarnaolocados(Request $request, Response $response, $args) {      
        $dao = new DvdDAO();        
        $data = $dao->listar_naolocado_dvd();
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função listarnaolocados

    public function listartodos(Request $request, Response $response, $args) {      
        $dao = new DvdDAO();        
        $data = $dao->listar_todos_dvd();
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função listartodos

    public function deletar(Request $request, Response $response, $args): Response {
        $cod_dvd = $args['id'];
        $dao = new DvdDAO();
        $data = $dao->buscarDvdPorId($cod_dvd);
        $dados = $dao->deletar_dvd($cod_dvd);  
        $payload = json_encode($data);        
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    } //fim da função deletar

    public function alterar(Request $request, Response $response, array $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();
        $dvd = new Dvd($id, $data['titulo'], $data['valor'], $data['locado']);
        $dao = new DvdDAO;
        $dvd = $dao->atualizar_dvd($id,$dvd);
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response
                  ->withHeader('Content-Type', 'application/json');
    } //fim da função alterar

} //fim da classe DvdController

?>