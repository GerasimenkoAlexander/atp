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


    /*process data*/

    session_start();

    if($_SERVER['REQUEST_METHOD'] === 'POST') {

        if (isset($_POST['signup'])) {

            //todo good validation
            if(!$_POST['login'] || !$_POST['password'] || !$_POST['passwordConfirm']){
                $_SESSION['fm'] = 'All fields are required!';
            } else {
                if($_POST['password'] !== $_POST['passwordConfirm']){
                    $_SESSION['fm'] = 'Passwords does not match!';
                } else {
                    //SUCCESS
                    $_SESSION['login'] = $_POST['login'];
                    $_SESSION['password'] = sha1($_POST['password']);
                    $_SESSION['fm'] = 'You have successfully registered, try to login!';
                }
            }

        } elseif (isset($_POST['signin'])) {

            //todo check on already login users
            if($_SESSION['login'] == $_POST['login']
            && $_SESSION['password'] == sha1($_POST['password'])){
                $_SESSION['login'] = true;
                $_SESSION['fm'] = 'Now you are login, ' . $_POST['login'] . '!';
            } else {
                $_SESSION['fm'] = 'Incorrect login or password, try again!';
            }

        } else {

            $_SESSION['fm'] = 'Something went wrong, please, try again!';

        }

        header('Location: /', null, 303);
        die;

    } else {

        if(isset($_GET['logout'])){
            unset($_SESSION['login']);
            $_SESSION['fm'] = 'You are logout!';
            header('Location: /', null, 303);
        }

    }