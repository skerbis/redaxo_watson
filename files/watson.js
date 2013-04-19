jQuery(function($){

    var $watson = $('#watson');

    $(document).ready( function() {

        var watson_id   = getUrlParameter('watson_id');
        var watson_text = getUrlParameter('watson_text');
        if (watson_id && watson_text) {
            $('#' + watson_id).val(watson_text).focus();
        }

    });

    $(document).keydown(function(e) {
        if ((e.keyCode == 32 && e.ctrlKey)) {
            checkWatson();
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            hideWatson();
        }
    });

    function onAutocompleted(evt, datum) {
        console.log('autocompleted');
        console.log(evt);
        console.log(datum);
    }

    function checkWatson() {
        if ($watson.hasClass('watson-active')) {
            hideWatson($watson);
        } else {
            showWatson($watson);
        }
    }

    function showWatson() {

        $('.typeahead').typeahead({
            name: 'watson-result',
            remote: rex.backendUrl + '?watson=%QUERY',
            //prefetch: rex.backendUrl + '?watson.json',
            limit: 10,
            /*
             template: [
             '{{template}}'
             ].join(''),
             */
            engine: Hogan
        }).on('typeahead:selected', function(evt, item) {
                if (item.url !== undefined) {
                    window.location.href = item.url;
                }
            });

        $watson.fadeIn('fast').addClass('watson-active');
        $watson.find('input').focus();
    }

    function hideWatson() {
        $watson.fadeOut('fast').removeClass('watson-active');
        $('.typeahead').typeahead('destroy');
    }

    function getUrlParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }
});