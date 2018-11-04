$(function() {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
      headers: {
        'Client-ID': 'd6h45cbn59leou67cnxrydgtg22vn4'
      },
      success: function(fccdata) {
        if(fccdata.stream === null){
          $("#statfcc").html("FCC is currently OFFLINE").addClass("label label-danger");
        } else {
          $("#statfcc").html("FCC is currently ONLINE").addClass("label label-success");
        }
     }
    }); // FCC status call
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/',
      headers: {
        'Client-ID': 'd6h45cbn59leou67cnxrydgtg22vn4'
      },
      success: function(followdata) {
        for(var i = 0; i < followdata.follows.length; i++) {
          var handleDisplay = followdata.follows[i].channel.display_name;
          var userLogo = followdata.follows[i].channel.logo;
          var userStatus = followdata.follows[i].channel.status;
          if(userLogo == null) {
            userLogo = 'http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png';
          }
          $("#followerstats").prepend("<div class='row panel panel-default'>" + "<div class='col-md-4'>" + "<img src='" + userLogo + "'"+ "class='thumbnail'"+">" + "</div>" + "<div class='col-md-4'>" + handleDisplay + "</div>" + "<div class='col-md-4'>" + userStatus + "</div></div>");
        } 
      }
    }); // Followers name, status, logo API call
    
    var nonexistingFollowers = ['brunofin', 'comster404'];
    for(var i = 0; i < nonexistingFollowers.length; i++) {
      $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/streams/' + nonexistingFollowers[i],
        headers: {
          'Client-ID': 'd6h45cbn59leou67cnxrydgtg22vn4'
        },
        error: function(deletedUserData) {
          var deletedUserDisplayName = deletedUserData.statusText;
          console.log(deletedUserDisplayName);
          var deletedUserLogo = 'http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png';
          var deletedUserStatus = deletedUserData.status;
          $("#followerstats").prepend("<div class='row panel panel-default'>" + "<div class='col-md-4'>" + "<img src='" + deletedUserLogo + "' "+ "class='thumbnail'"+">" + "</div>" + "<div class='col-md-4'>" + deletedUserDisplayName + "</div>" + "<div class='col-md-4'>" + deletedUserStatus + "</div>" + "</div>");
        }
      }); // deleted user API call
      
    }
  }); //document ready
  
  // Client-ID Twitch: d6h45cbn59leou67cnxrydgtg22vn4