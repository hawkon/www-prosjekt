$(document).ready (function () {
  $.ajax({
    url: 'isLoggedIn.php',
    success: function (data) {
      if (data.login=='OK') {
        $('#right').load ('loginok.php');
      } else
        $('#right').load ('login.html');
    }
  });
});

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
						$('#left').load ('menu.html')
					}
				});
				jQuery('#newUserDialog').dialog('close');
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


function logOut () {
	$.ajax({
		url: 'logout.php',
		success: function (tmp) {
			$('#left').load ('logutleft.html');
		}
	});
	$('#right').load('login.html');
	$('#center').load ('logout.html');
};

// Funksjon for å slippe å reloade linker i menyen.
function linkFunction(clicked) {
	$('#center').load(clicked +'.html' )
};






function newBlogEntry () {

	$.ajax({

		url: 'newBlogEntry.html',

		success: function (data) {

			$('#content').html (data);

			$('#newBlogEntry').tinymce({

				language : 'en', 

				// Location of TinyMCE script

				script_url : '/tinymce/jscripts/tiny_mce/tiny_mce_gzip.php',
	


				// General options

				theme : "advanced",

				plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,advlist,spellchecker",



				// Theme options

				theme_advanced_buttons1 : "spellchecker,iespell,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect,|,forecolor,backcolor",

				theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,removeformat,help,code,|,visualchars,nonbreaking,visualaid,|,insertdate,inserttime",

				theme_advanced_buttons3 : "tablecontrols,|,sub,sup,|,charmap,emotions,media,advhr,|,print,|,fullscreen,|,cite,abbr,acronym,del,ins",

				theme_advanced_toolbar_location : "top",

				theme_advanced_toolbar_align : "left",

				theme_advanced_statusbar_location : "bottom",

				theme_advanced_resizing : true,

			

				spellchecker_languages : "Norwegian=no,+English=en",

			});

		}

	});

}

<?php

	session_start();

	require_once 'db.php';

	

	if (!isset($_SESSION['user']))

		die (json_encode (array ('message'=>'Du kan ikke lagre blog innlegg når du ikke er logget på')));

	$sql = 'INSERT INTO entry (uid, title, entry, lat, lng, `when`) VALUES (?, ?, ?, ?, ?, now())';

	if (isset($_POST['latitude']))

		$lat = $_POST['latitude'];

	else

		$lat = null;

	if (isset($_POST['longitude']))

		$lng = $_POST['longitude'];

	else

		$lng = null;

	$sth = $db->prepare ($sql);

//	print_r ($db->errorInfo());

	$sth->execute (array ($_SESSION['user'], $_POST['title'], $_POST['content'], $lat, $lng));

//	print_r ($db->errorInfo());

	if ($sth->rowCount()==1)

		die (json_encode (array('ok'=>'OK', 'message'=>'Nytt blogg innlegg lagret i databasen')));

	else

		die (json_encode (array('message'=>'Problemer oppsto ved lagring av innlegget i databasen')));

?>
