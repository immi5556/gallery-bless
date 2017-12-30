<?php
if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "delete": delete_function(); break;
    }
  }
}

//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function delete_function(){
  $file = urldecode($_POST["file"]);
  $return["fileinward"] = $file;
  if (strpos($file, "http://immanuel.co/gallery/") !== false){
      $file = str_replace("http://immanuel.co/gallery/","",$file);
  }
  $return["fileinward1"] = $file;
  $return["deleted"] = false;
  if(unlink($file))
    $return["deleted"] = true;
  echo json_encode($return);
}

function encodeURI($uri)
{
    return preg_replace_callback("{[^0-9a-z_.!~*'();,/?:@&=+$#-]}i", function ($m) {
        return sprintf('%%%02X', ord($m[0]));
    }, $uri);
}
?>