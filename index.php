<?php

use Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider;
use Silex\Application;

$db_var = parse_url(getenv('DATABASE_URL'));
$db_con = pg_connect("host=".$db_var["host"]."port=".$db_var["port"]."dbname=" .ltrim($db_var["path"],'/'). "user=" .$db_var["user"]. "password=".$db_var["pass"]);

    
?>