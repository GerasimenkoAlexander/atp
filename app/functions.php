<?php

    define('APP_PATH', __DIR__);

    function renderPage($name){

        //this is bad idea
        global $flash;

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

        //echo '<pre>';print_r($_POST);die;
        if (isset($_POST['signup'])) {

            //todo good validation
            if(!$_POST['login'] || !$_POST['password'] || !$_POST['passwordConfirm']){
                $_SESSION['fm'] = 'All fields are required!';
            } else {
                if($_POST['password'] !== $_POST['passwordConfirm']){
                    $_SESSION['fm'] = 'Passwords does not match!';
                } else {
                    //SUCCESS
                    $_SESSION['login'] = ucfirst(strtolower($_POST['login']));
                    $_SESSION['password'] = sha1($_POST['password']);
                    $_SESSION['fm'] = 'You have successfully registered, try to login!';
                }
            }

        } elseif (isset($_POST['signin'])) {

            //todo check on already login users
            $_POST['login'] = ucfirst(strtolower($_POST['login']));
            if($_SESSION['login'] == $_POST['login']
            && $_SESSION['password'] == sha1($_POST['password'])){
                $_SESSION['signin'] = true;
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
            unset($_SESSION['signin']);
            $_SESSION['fm'] = 'You are logout!';
            header('Location: /', null, 303);
            die;
        }
    }

    //flash messenger
    $flash = '';
    if(isset($_SESSION['fm'])){
        $flash = '<div id="FlashBlock" style="display: none">';
        //why rand works more beautiful then mt_rand
        $flash .= sprintf('<div style="background-color:rgb(%d,%d,%d);">', rand(60,160), rand(60,160), rand(60,160)). $_SESSION['fm'] .'</div>';
        $flash .= '</div>';
    }
    if(isset($_SESSION['fm'])){
        unset($_SESSION['fm']);
    }
