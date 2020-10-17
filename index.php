<?php
    $dbopts = parse_url(getenv('DATABASE_URL'));
    print($dbopts);
?>