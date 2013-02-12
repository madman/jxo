/** 
 * JXO - v0.1 - 2012-12-12
 * http://devcomm.org.ua/jxo
 * Copyright (c) 2012 Devcomm 
 */


(function ($) {
    var settings = {
        state: 0,
        startState: 0,
        x: 'x',
        o: 'o',
        _: '',
        modex: 'human', // human|bot [human by default] 
        modeo: 'bot', // human|bot [bot by default]
        first: 'x',  // x|o 
        pause: 1000,
        debug: true
    };

    var methods = {
        init: function(options) {
            return this.each(function(){
                var self = $(this),
                jxo = self; 
                if (!jxo.data('initilized')) {
                    $.extend(settings, options || {});
                    jxo.data('settings', settings);
                
                    var board = jxo.find('table.board');
                    board.find('td').each(function(index) {
                        var self = $(this), xo = {
                            x: '', 
                            o: ''
                        };
                        for (var i = 0; i <= index; i++) {
                            $.each(xo, function(key, value) {
                                xo[key] = ((i == index) ? ('0c' + (('x' == key) ? 2 : 1)): 0) + value;
                            });
                        }
                   
                        self
                        .data('o', xo.o)
                        .data('x', xo.x);
                        
                        if (settings.debug) {
                            self
                            .append($('<div />', {
                                'class': 'hint'
                            }));
                            self.find('.hint')
                            .append($('<div />', {
                                'text': xo.o
                            }))
                            .append($('<div />', {
                                'text': xo.x
                            }));
                        }
                    });
                    
                    funcs.bindBoard(board);
                    
                    jxo.data('initilized', true);
                } else {
                    settings = jxo.data('settings');
                }
            });
        },
        parse: function(val) {
            if (val = /^(?:0c)(\d+)/i.exec(val)) {
                return parseInt(val[1], 3);  
            }
            return 0;
        }
    };
    
    var funcs = {
        bindBoard: function(board) {
            board.on('click', function(event) {
                console.log(event.currentTarget)
                console.log(event.event.delegateTarget)
            });
            
        }
    };
    
    $.fn.jxo = function (method) {
        if (typeof method === 'object') {
            return methods.init.apply(this, method);
        } else if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }   
    };
})(jQuery);