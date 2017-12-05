class Trolololo {
    constructor () {
        if (window.location.href.indexOf('redmine/issues/') < 0){
            return;
        }

        this.buildSearch();
    }

    buildSearch(){
        const $div = $("<input>", {type: "text", class: 'efi-search', placeholder: "Wyszukaj..."});
        const _this = this;

        $div.on('keyup', function() {
            const val = $(this).val().toLowerCase();
            const options = $("#issue_assigned_to_id option");

            for(let i = 0; i < options.length; i++){
                if(_this.fuzzysearch(val, $(options[i]).text().toLowerCase())) {
                    $('#issue_assigned_to_id').val($(options[i]).val());
                    return;
                }
            }
        });

        $('#issue_assigned_to_id').parent().prepend($div);
    }

    //https://github.com/bevacqua/fuzzysearch/blob/master/index.js
    fuzzysearch (needle, haystack) {
        var hlen = haystack.length;
        var nlen = needle.length;
        if (nlen > hlen) {
            return false;
        }
        if (nlen === hlen) {
            return needle === haystack;
        }
        outer: for (var i = 0, j = 0; i < nlen; i++) {
            var nch = needle.charCodeAt(i);
            while (j < hlen) {
                if (haystack.charCodeAt(j++) === nch) {
                    continue outer;
                }
            }
            return false;
        }
        return true;
    }
}

new Trolololo();
