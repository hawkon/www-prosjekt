function newUserDialog () {
        jQuery('#newUserDialog').dialog('open');
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
	jQuery.ajax({
		url: 'newUser.php',
		type: 'post',
		data: { uname: form.uname.value, pwd: form.pwd.value, givenname: form.given.value, 
						surename: form.suren.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.ok=="OK") {
				jQuery.ajax({
					url: 'login.php',
					type: 'post',
					data: {'uname': form.uname.value, 'pwd': form.pwd.value},
					success: function (tmp) {
						$('#right').load ('loginok.php');
					}
				});
				jQery('#newUserDialog').dialog('close');
			} else {
				alert (data.message);
			}
		}
	});
}



function loggInn(form) {
	jQuery.ajax({
		url: 'login.php',
		type: 'post',
		data: {'uname': form.uname.value, 'pwd': form.pwd.value},
		success: function (tmp) {
			data = eval ('('+tmp+')');
				jQuery('#right').load ('loginok.php');
				jQuery('#content').load ('editor');
				jQuery('#left').load ('menu.html')
		jQuery(document).ready(function() {
//initerer førstesiden
jQuery('#center').load('openpub.html');

//menu klikk
$('ul#nav li a').click(function()  {  "use strict";
        var page = $(this).attr('href');
        $('#center').load(page);
        });
});
	
				}
	});
};

function changeUserDetailsDialog () {
	jQuery.ajax ({
		url: 'userDetails.php',
		type: 'post',
		success: function (tmp) {
			data = eval ('('+tmp+')');
			if (data.error!=null) {
				alert (data.error);
				return;
			}
			var form = jQuery('#changeUserDetailsDialog form').first()[0];
			form.uname.value = data.uid;
			form.uname.disabled = true;
			form.given.value = data.givenname;
			form.suren.value = data.surename;
			jQuery('#changeUserDetailsDialog').dialog('open');
		}
	});

}

function changeUserDetails (form) {
	if (form.pwd.value.length>0&&form.opwd.value.length<6) {
		alert ("Du må oppgi det gamle passordet for å sette nytt passord");
		form.opwd.focus();
	} else if (form.pwd.value!=form.pwd1.value) {
		alert ("De nye passordene dine matcher ikke");
		form.pwd.focus();
	} else if (form.pwd.value.length>0&&form.pwd.value.length<6) {
		alert ("Passord må være minst 6 karakterer langt");
		form.pwd.focus();
	}
	$.ajax({
		url: 'changeUserDetails.php',
		type: 'post',
		data: { uname: form.uname.value, opwd: form.opwd.value, pwd: form.pwd.value, 
						givenname: form.given.value, surename: form.suren.value },
		success: function (tmp) {
			data = eval ('('+tmp+')');
			alert (data.message);
		}
	});
}

jQuery(document).ready(function() {
//initerer førstesiden
jQuery('#center').load('openpub.html');

//menu klikk
$('ul#nav li a').click(function()  {  "use strict"; 
	var page = $(this).attr('href');
	$('#center').load(page);
	});
});

function logOut () {
	$.ajax({
		url: 'logout.php',
		success: function (tmp) {
			$('#left').load ('login.html');
		}
	});
	$('#right').load('right.html');
	$('#content').load ('logout.html');
};
