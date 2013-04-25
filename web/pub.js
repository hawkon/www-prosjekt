function newUserDialog () {
        $('#newUserDialog').dialog('open');
}

function loggInn(form) {
        $.ajax({
                url: 'login.php',
                type: 'post',
                data: {'uname': form.uname.value, 'pwd': form.pwd.value},
                success: function (tmp) {
                        data = eval ('('+tmp+')');
                        if (data.ok == 'OK') {
                                if(geo_position_js.init()) {
                                        geo_position_js.getCurrentPosition(geo_success,geo_error,{enableHighAccuracy:true});
                                }       else {
                                        alert("Functionality not available");
                                }
                                $('#left').load ('loginok.php');
                                $('#content').load ('mineBloggInnlegg.php');
                        } else {
                                $('#left div').first().show();
                                $('#left input').first().get(0).focus();
                        }
                }
        });
};

