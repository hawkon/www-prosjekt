
function newUserDialog () {
        $('#newUserDialog').dialog('open');
}


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
						surename: form.suren.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok=="OK") {
				$.ajax({
					url: 'login.php',
					type: 'post',
					data: {'uname': form.uname.value, 'pwd': form.pwd.value},
					success: function (tmp) {
						$('#right').load ('loginok.php');
					}
				});
				$('#newUserDialog').dialog('close');
			} else {
				alert (data.message);
			}
		}
	});
}



function loggInn(form) {
	$.ajax({
		url: 'login.php',
		type: 'post',
		data: {'uname': form.uname.value, 'pwd': form.pwd.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
				$('#right').load ('loginok.php');
				$('#content').load ('editor');
				$('#left').load ('menu.html')
			}
	});
};

function changeUserDetailsDialog () {
	$.ajax ({
		url: 'userDetails.php',
		type: 'post',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.error!=null) {
				alert (data.error);
				return;
			}
			var form = $('#changeUserDetailsDialog form').first()[0];
			form.uname.value = data.uid;
			form.uname.disabled = true;
			form.given.value = data.givenname;
			form.suren.value = data.surename;
//			form.url.value = data.url;
		//	$('#changeUserDetailsDialog img').first()[0].src = 'userImage.php';
			$('#changeUserDetailsDialog').dialog('open');
		}
	});

}

$(document).ready(function() {
//initerer førstesiden
$('#center').load('openpub.html');

}

//menu klikk
$('ul#nav li a').click(function() {
	var page =$(this).attr('href');
	$('#center').load(+ page + '.html' );
	return false;
	});
  });
