//make good code as objects
//as plugin for pass input and set it name on submit
//add validation on submit on valid var

(function ($) {

    'use strict';
    var Atp = function (customOptions) {

        var options = $.extend({
            triggerSelector : '#atpe',
            rootId          : 'atp',
            rowClass        : 'pRow',
            pointClass      : 'pPoint',
            coreClass       : 'pCore',
            lineClass       : 'pLine',
            activeClass     : 'active',
            validClass      : 'valid',
    
            codeChars       : ['!', '@', '#', '$', '%', '^', '&', '*', '(']
        }, customOptions);

        var $targetElement  = null;
        var $root           = null;
        var $points         = null;
        var $point          = null;

        this.init = function () {
            $targetElement = $(options.triggerSelector);
            if ($targetElement) {
                generateMarkup();
                hangEvents();
            }
        };

        var generateMarkup = function () {
            var root = document.createElement('div');
            root.id = options.rootId;

            for (var i = 0; i < 3; i++) {
                var div = document.createElement('div');
                div.className = options.rowClass;

                for (var j = 0; j < 3; j++) {
                    var point = document.createElement('div');
                    var core = document.createElement('div');

                    core.className = options.coreClass;

                    point.className = options.pointClass;
                    point.setAttribute("data-char", options.codeChars[(i * 3) + j]);
                    point.appendChild(core);
                    div.appendChild(point);
                }
                root.appendChild(div);
            }
            $targetElement.after(root);
            $root = $('#' + options.rootId);
        };

        var hangEvents = function () {
            $points = $('.' + options.pointClass);
            $points.on('mousedown touchstart', function () {

                var valid = false;
                var cN = options.activeClass;
                var code = [];

                $points.removeClass(cN + ' ' + options.validClass);
                $('.' + options.lineClass).remove();
                $(this).addClass(options.activeClass);
                code.push($(this).data('char'));
                $point = $(this);

                $root.on('mouseleave touchleave', function (e) {

                    var elem = e.toElement || e.relatedTarget;
                    if (elem.className === options.lineClass) {
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
                    if (!$(this).hasClass(options.activeClass)) {

                        $(this).addClass(cN);
                        //this must be before selection
                        var $aP = $('.' + options.pointClass + '.' + options.activeClass);

                        code.push($(this).data('char'));

                        if (!valid && $aP.length > 4) {
                            valid = true;
                            $aP.addClass(options.validClass);
                            cN += ' ' + options.validClass;
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
                .addClass(options.lineClass)
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
