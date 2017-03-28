$(function () {
  team_introduction.initialize();
});

var team_introduction = {
  initialize: function(){
    team_introduction.view_image('.fileUpload');
    team_introduction.create_team_introduction();
    team_introduction.view_team_introduction('.button_team_introduction_1', '.team-introduction-1');
    team_introduction.view_team_introduction('.button_team_introduction_2', '.team-introduction-2');
    team_introduction.view_team_introduction('.button_team_introduction_3', '.team-introduction-3');
  },

  view_image: function(className){
    $(className).on('change', function(){
      var id = this.id;
      if (typeof (FileReader) != "undefined") {
        var bar = $(this).next();
        var image_holder = bar;
        image_holder.empty();
        var reader = new FileReader();
        reader.onload = function (e) {
          $("<img />", {
            "src": e.target.result,
            "class": "thumb-image"
          }).appendTo(image_holder);
        };
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
      } else {
        alert("This browser does not support FileReader.");
      }
    });
  },

  view_team_introduction: function(dom_id_button, dom_id_team_introduction){
    $(dom_id_button).click(function(){
      if($(dom_id_team_introduction).is(':visible')){
        $(dom_id_team_introduction).slideUp();
      } else{
        $(dom_id_team_introduction).slideDown();
      }
    });
  },

  build_form_data: function (id) {
    return new FormData($(id)[0]);
  },

  create_team_introduction: function () {
    $('.team_introduction form').on('submit', function(e) {
      e.preventDefault();
      var formData = team_introduction.build_form_data('#'+this.id);
      var parent_name = $(this).parent().parent().attr('class').substr(4);
      var index = parseInt(parent_name.substr(parent_name.length - 1));
      var parent_class = '.'+ parent_name;
      var tr = '.team_introduction_' + (index+1).toString();
      $.ajax({
        dataType: 'json',
        contentType: false,
        processData: false,
        url: $('.new_team_introduction').attr('action'),
        method: 'post',
        data: formData,
        success: function() {
          if (index != 3) {
            alert(I18n.t('employer.team_introductions.success'));
            $(parent_class).slideUp();
            $(tr).show();
          }
          else {
            $('.team_introduction').find('input[type="submit"]').attr('disabled', false);
          }
        },
        error: function(){
          alert(I18n.t('employer.team_introductions.not_found'));
        }
      });
    });
  }
};
