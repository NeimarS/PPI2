<?php
    $dbopts = parse_url(getenv('DATABASE_URL'));
    
    $app->register(new Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider('pdo'),
               array(
                'pdo.server' => array(
                   'driver'   => 'pgsql',
                   'user' => $dbopts["user"],
                   'password' => $dbopts["pass"],
                   'host' => $dbopts["host"],
                   'port' => $dbopts["port"],
                   'dbname' => ltrim($dbopts["path"],'/')
                   )
               )
    );

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


?>