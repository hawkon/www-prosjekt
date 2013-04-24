<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src="blogg.js"></script>
<title>Bloggsphere</title>
<script type="text/javascript">
$(document).ready (function() {
  $('#left').load ('login.html');
});
</script>
</head>
<body>
<div style="width: 100%; text-align:center">
<h1>Velkommen til blogg himmelen</h1>
<div style="width: 1030px; text-align: left;margin-left: auto; margin-right:auto">
<div id="left" style="float:left; width:150px; background:#DDD; height: 500px; padding: 5px;"></div>
<div id="content" style="float:left; width:700px; height: 500px; padding: 5px;">bla</div>
<div id="right" style="float:left; width:150px; background:#DDD; height: 500px; padding: 5px;"></div>
</div>
</div>
</body>
</html>
