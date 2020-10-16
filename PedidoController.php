<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
include_once 'Pedido.php';
include_once 'PedidoDAO.php';

class PedidoController {

    public function inserir(Request $request, Response $response, $args): Response {  
        $data = $request->getParsedBody();
        $dao = new PedidoDAO;
        $validar = $dao->validar_pedido("cadastrar",$data);
        
        if ($validar == '1') {
            $msg = 'É preciso locar pelo menos 1 dvd!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        elseif ($validar == '2'){
            $msg = 'Existem pedidos com devolução vencida!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        elseif ($validar == '3'){
            $msg = 'O número máximo de dvds locados não pode passar de 5!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        else {
            $pedido = $dao->inserir_pedido($validar);
            $payload = json_encode($data);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
    } //fim da função inserir

    public function devolver(Request $request, Response $response, $args): Response {  
        $cod_pedido = $args['cod_pedido'];
        $msg = 'Pedido devolvido com sucesso!';
        $dao = new PedidoDAO;
        $devolver = $dao->devolver_pedido($cod_pedido);         
        $payload = json_encode($msg);
        $response->getBody()->write($payload);
               return $response
                        ->withHeader('Content-Type', 'application/json');
        
    }//fim da função devolver

    public function listartodos(Request $request, Response $response, $args) {      
        $id = $args['id'];
        $dao = new PedidoDAO();        
        $data = $dao->listar_todos_pedidos($id);
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }//fim da função listartodos

    public function alterar(Request $request, Response $response, $args): Response {  
        $data = $request->getParsedBody();
        $dao = new PedidoDAO;

        $validar = $dao->validar_pedido("alterar",$data);
        if ($validar == '1') {
            $msg = 'É preciso locar pelo menos 1 dvd!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        elseif ($validar == '2'){
            $msg = 'Existem pedidos com devolução vencida!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        elseif ($validar == '3'){
            $msg = 'O número máximo de dvds locados não pode passar de 5!';
            $payload = json_encode($msg);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }
        else {
            $pedido = $dao->atualizar_pedido($data['cod_pedido'],$validar);
            $payload = json_encode($data);
            $response->getBody()->write($payload);
            return $response
                      ->withHeader('Content-Type', 'application/json');
        }     
    }//fim da função alterar

} //fim da classe DvdController

?>