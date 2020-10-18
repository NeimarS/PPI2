<?php

class ProdutoDAO {
    private static $pdo;

    public static function getConexao(){ 
        if (!isset($pdo)) {
            $servername = "ec2-52-203-165-126.compute-1.amazonaws.com";//ou "localhost"
            $username = "avvnravlnmctsu";
            $password = "dce192a8ecc0fdaa27ee81dcf9530655de4db2595792d4864031d026f51c847e";
            $databasename = "deasl9b7dlhusd";    
            $porta = "5432";   
          
            
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
