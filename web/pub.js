"use strict";
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
//			form.url.value = data.url;
		//	$('#changeUserDetailsDialog img').first()[0].src = 'userImage.php';
			jQuery('#changeUserDetailsDialog').dialog('open');
		}
	});

}




//menu klikk
jQuery('ul#nav li a').click(function()  {  "use strict"; 
	var page = jQuery(this).attr('href');
	jQuery('#center').load('content/' + page + '.php');
	return false;
	});
