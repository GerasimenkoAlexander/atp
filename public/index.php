<?php
    require_once('../functions.php')
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Android Typing Password</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css"/>
    <link rel="stylesheet" type="text/css" href="/css/atp.css"/>
</head>
<body>
    <div id="main">
        <div><input type="text" name="login" id="login" placeholder="login"></div>
        <div><input type="password" name="password" id="atpe"></div>
        <div><button type="submit">submit</button></div>
    </div>
    <div id="cover"></div>
    <script>
      document.getElementById('cover').style.backgroundImage = 'url("/css/images/bg' + Math.floor(Math.random()*3) + '.jpg")';
    </script>
    <script src="/js/jquery-2.1.1.min.js"></script>
    <script src="/js/atp.js"></script>
</body>
</html>
