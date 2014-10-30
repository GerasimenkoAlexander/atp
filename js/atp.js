//make good code as objects
//as plugin for pass input and set it name on submit
//add validation on submit on valid var

(function ($) {

    var Atp = function () {

        var triggerSelector = '#atpe';
        var rootId = 'atp';
        var rowClass = 'pRow';
        var pointClass = 'pPoint';
        var coreClass = 'pCore';
        var lineClass = 'pLine';
        var activeClass = 'active';
        var validClass = 'valid';

        var codeChars = ['!', '@', '#', '$', '%', '^', '&', '*', '('];

        var $targetElement = null;
        var $root = null;
        var $points = null;
        var $point = null;

        this.init = function () {
            $targetElement = $(triggerSelector);
            if ($targetElement) {
                generateMarkup();
                $targetElement.css('display', 'none');
                hangEvents();
            }
        };

        var generateMarkup = function () {
            root = document.createElement('div');
            root.id = rootId;
            for (var i = 0; i < 3; i++) {

                var div = document.createElement('div');
                div.className = rowClass;

                for (var j = 0; j < 3; j++) {
                    var point = document.createElement('div');
                    var core = document.createElement('div');

                    point.className = pointClass;
                    point.setAttribute("data-char", codeChars[(i * 3) + j]);

                    core.className = coreClass;
                    point.appendChild(core);
                    div.appendChild(point);
                }
                root.appendChild(div);
            }

            $targetElement.after(root);
            $root = $('#' + rootId);

        };

        var hangEvents = function () {
            $points = $('.' + pointClass);
            $points.on('mousedown touchstart', function () {

                var valid = false;
                var cN = activeClass;
                var code = [];

                $points.removeClass(cN + ' ' + validClass);
                $('.' + lineClass).remove();
                $(this).addClass(activeClass);
                code.push($(this).data('char'));
                $point = $(this);

                $root.on('mouseleave touchleave', function (e) {

                    var elem = e.toElement || e.relatedTarget;
                    if (elem.className == lineClass) {
                        return false;
                    }
                    $(this).off();
                    $points.off('mouseover touchenter');
                });

                $root.on('mouseup touchend', function () {
                    $(this).off();
                    $points.off('mouseover touchenter');
                });

                $points.on('mouseover touchenter', function () {
                    if (!$(this).hasClass(activeClass)) {

                        $(this).addClass(cN);
                        //this must be before selection
                        var $aP = $('.' + pointClass + '.' + activeClass);

                        code.push($(this).data('char'));

                        if (!valid && $aP.length > 4) {
                            valid = true;
                            $aP.addClass(validClass);
                            cN += ' ' + validClass;
                        }

                        var p1 = $point.offset();
                        var p2 = $(this).offset();
                        drawLine(p1.left, p1.top, p2.left, p2.top);
                        $point = $(this);
                    }
                });

            });
        };

        var drawLine = function (x1, y1, x2, y2) {
            var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            var transform = 'rotate(' + angle + 'deg)';
            var line = $('<div>')
                .appendTo($root)
                .addClass(lineClass)
                .css({
                    '-webkit-transform': transform,
                    '-ie-transform': transform,
                    'transform': transform
                })
                .width(length)
                .offset({left: x1 + 30, top: y1 + 28});
            return line;
        };
    };

    var atp = new Atp();
    window.onload = atp.init;

})(jQuery);
