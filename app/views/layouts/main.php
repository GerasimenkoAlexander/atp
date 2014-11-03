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
    %body%
</div>
<div id="cover"></div>
<?php echo $flash; ?>
<script>
    document.getElementById('cover').style.backgroundImage = 'url("/css/images/bg' + Math.floor(Math.random()*3) + '.jpg")';
</script>
<script src="/js/jquery-2.1.1.min.js"></script>
<script src="/js/atp.js"></script>
<script type="text/javascript">
    $(function(){

        function autoClosing(object, delay) {
            window.setTimeout(function() { object.slideUp(750) }, delay);
        }

        var $flash = $('#FlashBlock');
        if($flash.length > 0){
            $flash.fadeIn(1000);
            var $items = $flash.find('div');
            $items.each(function(key){
                autoClosing($(this), 2500 *(key+1))
            });
        }

    });
</script>
</body>
</html>