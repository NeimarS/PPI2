<?php
    $dbopts = parse_url(getenv('DATABASE_URL'));
    

    var_dump($dbopts);
    /*
    $app->get('/db/', function() use($app) {
        $st = $app['pdo']->prepare('SELECT nome FROM cliente');
        $st->execute();
        $vencimento = $st->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);
        
        foreach ($vencimento as $row){
            foreach ($row as $campo => $nome){
               print($nome);
            }
        } 
        
      });
*/

?>