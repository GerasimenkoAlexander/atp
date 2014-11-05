//todo make good code as objects
//todo as plugin for pass input and set it name on submit
//todo add validation on submit on valid var
//todo make responsive
//todo add js validation of this field and confirm field type and validation
//todo fork me on git hub
//todo as bower component
//todo separate demo and lib
//todo add google analytics

(function ($) {

    'use strict';
    var GK = function (customOptions) {

        var options = $.extend({
            triggerSelector : '.graphic-key-element',
            rootClass       : 'graphic-key',
            rowClass        : 'pRow',
            pointClass      : 'pPoint',
            coreClass       : 'pCore',
            lineClass       : 'pLine',
            activeClass     : 'active',
            validClass      : 'valid',
    
            codeChars       : ['!', '@', '#', '$', '%', '^', '&', '*', '(']
        }, customOptions);

        var $targetElement  = null;
        var $points         = null;
        var $point          = null;

        this.init = function () {
            $targetElement = $(options.triggerSelector);
            if ($targetElement) {
                $targetElement.each(function(index, elem){
                    generateMarkup($(elem));
                    hangEvents($(elem));
                });
            }
        };

        var generateMarkup = function ($elem) {
            var root = document.createElement('div');
            root.className = options.rootClass;
            //simple theme
            //todo it better
            if($elem[0].className.indexOf('dark') !== -1){
                root.className += ' dark';
            }

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
            $elem.after(root);
        };

        var hangEvents = function ($elem) {
            var $root = $elem.next('.' + options.rootClass);
            $points = $root.find('.' + options.pointClass);

            //make closure for $root and $points
            (function($root, $points){

                $points.on('mousedown touchstart', function () {

                    var valid = false;
                    var cN = options.activeClass;
                    var code = [];

                    $elem.val('');

                    $points.removeClass(cN + ' ' + options.validClass);
                    $root.find('.' + options.lineClass).remove();
                    $(this).addClass(options.activeClass);
                    code.push($(this).data('char'));
                    $point = $(this);

                    $root.on('mouseleave touchleave', function (e) {

                        var elem = e.toElement || e.relatedTarget;
                        if (elem.className === options.lineClass) {
                            return false;
                        }
                        $elem.val(code.join(''));
                        $(this).off();
                        $points.off('mouseover touchenter');
                    });

                    $root.on('mouseup touchend', function () {
                        $elem.val(code.join(''));
                        $(this).off();
                        $points.off('mouseover touchenter');
                    });

                    $points.on('mouseover touchenter', function () {
                        if (!$(this).hasClass(options.activeClass)) {

                            $(this).addClass(cN);
                            //this must be before selection
                            var $aP = $root.find('.' + options.pointClass + '.' + options.activeClass);

                            code.push($(this).data('char'));

                            if (!valid && $aP.length > 4) {
                                valid = true;
                                $aP.addClass(options.validClass);
                                cN += ' ' + options.validClass;
                            }

                            var p1 = $point.offset();
                            var p2 = $(this).offset();
                            drawLine($root, p1.left, p1.top, p2.left, p2.top);
                            $point = $(this);
                        }
                    });
                });

            })($root, $points);

        };

        var drawLine = function ($root, x1, y1, x2, y2) {
            var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            var transform = 'rotate(' + angle + 'deg)';
            return $('<div>')
                .appendTo($root)
                .addClass(options.lineClass)
                .css({
                    '-webkit-transform': transform,
                    '-ie-transform': transform,
                    'transform': transform
                })
                .width(length)
                .offset({left: x1 + 30, top: y1 + 28});
        };
    };

    var gk = new GK();
    window.onload = gk.init;

})(jQuery);
