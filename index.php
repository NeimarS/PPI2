<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
include_once 'ClienteController.php';
include_once 'DvdController.php';
include_once 'PedidoController.php';
include_once 'UsuarioController.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->group('/cliente', function($app) {
    $app->post('/inserir','ClienteController:inserir');
    $app->get('/buscar/{id}','ClienteController:buscar');
    $app->get('/listar','ClienteController:listar');
    $app->delete('/deletar/{id}','ClienteController:deletar');
    $app->put('/alterar/{id}','ClienteController:alterar');
})->add('UsuarioController:validarToken');

$app->group('/dvd', function($app) {
    $app->post('/inserir','DvdController:inserir');
    $app->get('/buscar/{id}','DvdController:buscar');
    $app->get('/listarlocados','DvdController:listarlocados');
    $app->get('/listarnaolocados','DvdController:listarnaolocados');
    $app->get('/listartodos','DvdController:listartodos');
    $app->delete('/deletar/{id}','DvdController:deletar');
    $app->put('/alterar/{id}','DvdController:alterar');
})->add('UsuarioController:validarToken');

$app->group('/pedido', function($app) {
    $app->post('/inserir','PedidoController:inserir');
    $app->delete('/devolver/{cod_pedido}','PedidoController:devolver');
    $app->get('/listartodos/{id}','PedidoController:listartodos');
    $app->put('/alterar','PedidoController:alterar');
})->add('UsuarioController:validarToken');

$app->post('/login','UsuarioController:autenticar');

$app->run();

?>