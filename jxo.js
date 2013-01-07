/** 
 * JXO - v0.1 - 2012-12-12
 * http://devcomm.org.ua/jxo
 * Copyright (c) 2012 Devcomm 
 */


(function ($) {
    $.fn.jxo = function (options) {
        var settings = {
            state: '0c000000000',
            startState: '0c000000000',
            x: 'x',
            o: 'o',
            _: '',
            modex: 'human', // human|bot [human by default] 
            modeo: 'bot', // human|bot [bot by default]
            first: 'x',  // x|o 
            pause: 1000,
            debug: true
        };
        
        var parse = function(val) {
            if (val = val.match(/^Oc(\d+)/i)) {
                return parseInt(val, 3);  
            }
            return 0;
        };
        
        // traverse all nodes
        return this.each(function () {
            var self = $(this),
                jxo = self; // store container
            
            
            var _init = function() {
                // TODO: check board
                if (!jxo.data('initilized')) {
                    if (options) {
                        $.extend(settings, options);
                    }

                    // store settings
                    jxo.data('settings', settings);
                
                    var board = jxo.find('table.board');
                
                    board.find('td').each(function(index) {
                        var self = $(this), 
                        o = '',
                        x = '';
                        for (var i = 0; i <= index; i++) {
                            if (i == index) {
                                o = '1' + o;
                                x = '2' + x;
                            } else {
                                o = '0' + o;
                                x = '0' + x;
                            }
                        } 
                   
                        o = '0c' + o;
                        x = '0c' + x;
                        self.data('o', o).data('x', x);
                        if (settings.debug) {
                            self
                            .append($('<div />', {
                                'class': 'hint'
                            }));
                            self.find('.hint')
                            .append($('<div />', {
                                'text': o
                            }))
                            .append($('<div />', {
                                'text': x
                            }));
                        }
                    });
                    
                    jxo.data('initilized', true);
                } else {
                    // load previosly saved settings 
                    settings = jxo.data('settings');
                }
            };
            
            _init();
        });
    };
})(jQuery);