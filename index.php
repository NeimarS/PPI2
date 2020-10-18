<?php

use Csanquer\Silex\PdoServiceProvider\Provider\PDOServiceProvider;
use Silex\Application;

$db_var = parse_url(getenv('DATABASE_URL'));
//$db_con = pg_connect("host=$db_var["host"]");
$dbconn3 = pg_connect("host=ec2-52-203-165-126.compute-1.amazonaws.com port=5432 dbname=deasl9b7dlhusd user=avvnravlnmctsu password=dce192a8ecc0fdaa27ee81dcf9530655de4db2595792d4864031d026f51c847e");


//."port=".$db_var["port"]."dbname=" .ltrim($db_var["path"],'/'). "user=" .$db_var["user"]. "password=".$db_var["pass"]);

    
?>