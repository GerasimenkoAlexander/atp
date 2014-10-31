<?php

    define('APP_PATH', __DIR__);

    function renderPage($name){

        $path = APP_PATH . '/views/' . $name . '.php';
        if(!is_file($path)){
            throw new Exception('View "' . $name . '" does not exists!');
        }

        ob_start();

        require(APP_PATH . '/views/layouts/main.php');
        $layout = ob_get_contents();
        ob_clean();

        require($path);
        $view = ob_get_contents();
        ob_clean();

        echo str_replace('%body%', $view, $layout);

        ob_end_flush();
    }