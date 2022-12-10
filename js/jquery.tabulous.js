/*!
 * tabulous.js
 * Original author: @ninetales
 * Further changes, comments: @ninetales
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale'
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.find('a');
            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').css({'width':'25%', 'margin-right': 0});
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabulous-clear"></span>');

            if (this.options.effect == 'scale') {
                tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideflip');
            }

            var firstdiv        = this.$elem.find('.tabs-container');
            var firstdivheight  = firstdiv.find('div:first').height();
            var alldivs         = this.$elem.find('div:first').find('div');

            alldivs.css({'position': 'absolute'});
            firstdiv.css('height',firstdivheight+'px');
            firstchild.addClass('tabulous-active');

            links.bind('click', {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = $options.effect;

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');

                firstdiv.addClass('transition');
                links.removeClass('tabulous-active');
                mythis.addClass('tabulous-active');
                
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'scale') {
                    alldivs.removeClass('showscale').addClass('make-transist').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('make-transist').addClass('showscale');
                } else if (effect == 'slideLeft') {
                    alldivs.removeClass('showleft').addClass('make-transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make-transist').addClass('showleft');
                } else if (effect == 'scaleUp') {
                    alldivs.removeClass('showscaleup').addClass('make-transist').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('make-transist').addClass('showscaleup');
                } else if (effect == 'flip') {
                    alldivs.removeClass('showflip').addClass('make-transist').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('make-transist').addClass('showflip');
                }

                firstdiv.css('height',thisdivwidth+'px');
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );