$(document).ready (function () {
	$('#newUserDialog').dialog({autoOpen:false, width: "500px", modal: true });

});



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

function newUser (form) {

	if (form.uname.value.length<6) {

		alert ("Brukernavnet må være minst 6 karakterer langt");

		form.uname.focus();

	} else if (form.pwd.value!=form.pwd1.value) {

		alert ("De to passordene må være like");

		form.pwd.focus();

	} else if (form.pwd.value.length<6) {

		alert ("Passordet må være minst 6 karakterer langt");

		form.pwd.focus();

	}

	$.ajax({

		url: 'newUser.php',

		type: 'post',

		data: { uname: form.uname.value, pwd: form.pwd.value, givenname: form.given.value, 

						surename: form.suren.value },

		success: function (tmp) {

			data = eval ('('+tmp+')');

			if (data.ok=="OK") {

				$.ajax({

					url: 'login.php',

					type: 'post',

					data: {'uname': form.uname.value, 'pwd': form.pwd.value},

					success: function (tmp) {

						$('#left').load ('loginok.php');

					}

				});

				$('#newUserDialog').dialog('close');

			} else {

				alert (data.message);

			}

		}

	});

}


function logOut () {

	$.ajax({

		url: 'logout.php',

		success: function (tmp) {

			$('#left').load ('login.html');

		}

	});

	$('#right').load('right.html');

	$('#content').load ('allBlogEntries.php');
