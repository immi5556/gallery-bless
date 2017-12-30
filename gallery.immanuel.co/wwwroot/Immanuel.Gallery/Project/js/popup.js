$(function() {
    var current = undefined;
   $("body").append('<div id="light" class="white_show" style="width: 90%; left: 2.5%; top: 2%; height: 85%;"><a class="modalCloseImg" title="Close"></a><a class="nextImg"><img class="carous-img prev-img-tran" src="/img/prev.png"></a><a class="prevImg"><img class="carous-img" src="/img/prev.png"></a><img id="img-itm"></div>')
   $("body").append('<div id="fade" class="black_show"></div>')
   
   var appendImg = function() {
       $('#img-itm').css("width", "100%");
       $('#img-itm').css("height", "100%");
       $('#img-itm').attr("src", $(current).attr("href"));
   }
   
   $(document).on("click", ".nextImg", function(evt) {
       if ($(current).closest(".i-contain").next(".i-contain").length)  {
           current = $(current).closest(".i-contain").next(".i-contain").find(".pic-popup");
           appendImg();
       }
       evt.preventDefault();
   });
   
   $(document).on("click", ".prevImg", function(evt) {
       if ($(current).closest(".i-contain").prev(".i-contain").length)  {
           current = $(current).closest(".i-contain").prev(".i-contain").find(".pic-popup");
           appendImg();
       }
       evt.preventDefault();
   });
   
   $(document).on("click", ".pic-popup", function(evt) {
       $('#fade').css('display', 'block');
       $('#light').css('background-size', 'cover');
       current = this;
       appendImg();
       $('#light').css('display', 'block');
       evt.preventDefault();
   });
   
   $(document).on("click", ".modalCloseImg", function(evt) {
       $('#fade').css('display', 'none');
       $('#light').css("background-image", $(this).attr("href"));
       $('#light').css('display', 'none');
       current = undefined;
       evt.preventDefault();
   });
   
   $(document).on("click", ".delete", function(){
    var data = {
      "action": "delete",
      "file": $(this).closest(".i-contain").find(".pic-popup").attr("name")
      //"file": "files/b.jpg"
    }, $container = $(this).closest(".i-contain");
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "process.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
          alert(data["fileinward1"] + "-- "+ data["fileinward"]);
          if (data["deleted"]){
              $container.remove();
          }
          else{
                alert(data["deleted"]);
                alert(data["fileinward1"]);
          }
      }
    });
    return false;
  });
});

 $(function () {
        'use strict';
        
        // Define the url to send the image data to
        var url = 'files.php';
        
        // Call the fileupload widget and set some parameters
        $('#fileupload').fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {
                // Add each uploaded file name to the #files list
                $.each(data.result.files, function (index, file) {
                    //$('<li/>').text(file.name).appendTo('#files');

                    $(document).trigger("fileuploadedsir", [file.url, file.thumbnail_url]);
                    $('#progress .bar').css("display", "none");
                     $('#progress .bar').css(
                    'width',
                    0 + '%'
                    );
                    $('#progress .bar').css("display", "block");
                });
            },
            progressall: function (e, data) {
                // Update the progress bar while files are being uploaded
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css(
                    'width',
                    progress + '%'
                );
            }
        });
        
        $(document).on("mouseenter",".pic-popup", function() {
            $(this).find("img").css("opacity", ".2");
        });
        
        $(document).on("mouseleave", ".pic-popup", function() {
            $(this).find("img").css("opacity", "1");
        });
    });