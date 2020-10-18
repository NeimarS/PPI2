<?php

class ProdutoDAO {
    private static $pdo;

    public static function getConexao(){ 
        if (!isset($pdo)) {
            $db_var = parse_url(getenv('DATABASE_URL'));
            $servername = $db_var["host"];
            $username = $db_var["user"];
            $password = $db_var["pass"];
            $databasename = ltrim($db_var["path"],'/');    
            $porta = $db_var["port"];   
            
            try{
                $pdo = new PDO("pgsql:host=$servername;port=$porta;dbname=$databasename", $username, $password);
                // set the PDO error mode to exception
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   
                $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                $pdo->setAttribute(PDO::ATTR_STRINGIFY_FETCHES,false);
                $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);     
            }
            catch(PDOException $e)
            {
                echo "Connection failed: " . $e->getMessage();
            }
        }    
        return $pdo;
    } //fim da função
} //fecha a classe produtoDao
?>
