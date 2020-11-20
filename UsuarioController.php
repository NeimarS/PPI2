<?php
    use \Firebase\JWT\JWT;
    use Slim\Psr7\Response;
    use \Psr\Http\Message\ServerRequestInterface as Request;
    

    include_once 'Cliente.php';
    include_once 'ClienteDAO.php';
    
    class UsuarioController{
        private $secretKey = "t&st&";
        
        /*
        public function debug_to_console($data) {
            $output = $data;
            if (is_array($output))
                $output = implode(',', $output);
        
            echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
        }
        */


        public function autenticar($request, $response, $args)
        {   
            $data = $request->getParsedBody();  
            $dao= new ClienteDAO;    
            $usuario = $dao->buscaPorLogin($data['login']);
            
            if ($usuario ==false) {

                if ($usuario['senha'] == $data['senha']){
                    $token = array(
                        'login' => $usuario['login'],
                        'cod_cli' => $usuario['cod_cli'],
                        'nome' => $usuario['nome']
                    );
                    $jwt = JWT::encode($token, $this->secretKey);
                    return $response->withJson(["token" => $jwt], 201)
                        ->withHeader('Content-type', 'application/json');   
                }
                else {
                    return $response->withStatus(401);
                }
            }
            else {
                return $response->withStatus(401);
            }
            
        }

        public function validarToken($request, $handler)
        {
            $response = new Response();
            $token = $request->getHeader('Authorization');
            
            if($token && $token[0])
            {
                try {
                    $decoded = JWT::decode($token[0], $this->secretKey, array('HS256'));

                    if($decoded){
                        $response = $handler->handle($request);
                        return($response);
                    }
                } catch(Exception $error) {

                    return $response->withStatus(401);
                }
            }
            
            return $response->withStatus(401);
        }
        
    }//fim da classe UsuarioController
?>