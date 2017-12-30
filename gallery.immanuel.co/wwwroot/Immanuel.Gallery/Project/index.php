<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <title>Bless - The Photographer</title>
  
  <!-- Bootstrap CSS Toolkit styles -->
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="../css/popup.css">
  
  <style>
  .i-contain:hover .delete {
    visibility:visible;
    }
    .delete {
        visibility:hidden;
    }
  </style>
</head>

<body><h1 style="color:green"><i>Bless's Photo Blog</i></h1>
<div class="container">  
  <!-- Button to select & upload files -->
  <span class="btn btn-success fileinput-button">
    <span>Upload Image</span>
    <!-- The file input field used as target for the file upload widget -->
    <input id="fileupload" type="file" name="files[]" multiple>
  </span>
  
  
  <!-- The global progress bar -->
  <p style="display:none">Upload progress</p> <br/> <br/>
  <div id="progress" class="progress progress-success progress-striped">
    <div class="bar"></div>
  </div>
  
  
  
  <!-- The list of files uploaded -->
  <p style="display:none">Files uploaded:</p>
  <ul style="display:none" id="files"></ul>

  
<hr />  
  
  <?php
$folder = 'files/thumbnail/';
$filetype = '*.*';
$files = glob($folder.$filetype);
$count = count($files);
 
$sortedArray = array();
for ($i = 0; $i < $count; $i++) {
    $sortedArray[date ('YmdHis', filemtime($files[$i]))] = $files[$i];
}
echo '<div class="img-hoder">';
krsort($sortedArray);
foreach ($sortedArray as &$filename) {
    $rfile = substr($filename,strlen($folder));
    $rcont = '<a class="pic-popup" name="'.$filename.'" href="/files/' .$rfile.'"><img class="thumbnail" src="'.$filename.'" /></a>';
    $rhoder = '<div class="i-contain" style="padding: 30px;float:left;">' .$rcont. '<div class="txt-cmt-diaplay"></div></div>';
    echo $rhoder;
}
echo '</div>';
?>
                                                                                        
  </div>
  
</body>
<!-- Load jQuery and the necessary widget JS files to enable file upload -->
  <script src="../js/jquery.min.js"></script>
  <script src="../js/jquery.ui.widget.js"></script>
  <script src="../js/jquery.iframe-transport.js"></script>
  <script src="../js/jquery.fileupload.js"></script>
  <script src="../js/popup.js"></script>
  
  
  
  
  <!-- JavaScript used to call the fileupload widget to upload files -->
  <script>
    // When the server is ready...
    $(function () {
        $(document).on("fileuploadedsir", function(evt, val1, val2) {
            $('<div class="i-contain" style="padding: 30px;float:left;"><a class="pic-popup" href="' + val1 + '"><img class="thumbnail" src="'+ val2 + '"  /></a><div class="txt-cmt-diaplay"></div></div>').prependTo('.img-hoder');
        });
    });
    
  </script>

</html>