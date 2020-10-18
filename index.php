<?php

use Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider;
use Silex\Application;

$app = new Application();
$db_var = parse_url(getenv('DATABASE_URL'));
$app->register(
    // you can customize services and options prefix with the provider first argument (default = 'pdo')
    new PDOServiceProvider('pdo'),
    array(
        'pdo.server'   => array(
            // PDO driver to use among : mysql, pgsql , oracle, mssql, sqlite, dblib
            'driver'   => 'pgsql',
            'host'     => $db_var["host"],
            'dbname'   => ltrim($db_var["path"],'/'),
            'port'     => $db_var["port"],
            'user'     => $db_var["user"],
            'password' => $db_var["pass"]
        ),
        // optional PDO attributes used in PDO constructor 4th argument driver_options
        // some PDO attributes can be used only as PDO driver_options
        // see http://www.php.net/manual/fr/pdo.construct.php
        'pdo.options' => array(
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"
        ),
        // optional PDO attributes set with PDO::setAttribute
        // see http://www.php.net/manual/fr/pdo.setattribute.php
        'pdo.attributes' => array(
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        ),
    )
);

// get PDO connection
$pdo = $app['pdo'];

    /*
    
    

    var_dump($dbopts);

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
    $st = $app['pdo']->prepare('SELECT name FROM test_table');
    $st->execute();
  
    $names = array();
    while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
      $app['monolog']->addDebug('Row ' . $row['name']);
      $names[] = $row;
    }
  
    return $app['twig']->render('database.twig', array(
      'names' => $names
    ));
  });


   
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