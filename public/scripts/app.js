/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function () {

  moment().format();
  // Set's the new-tweet section to
  $(".new-tweet").slideToggle(0);

  //
  loadTweets()

  //
  $("#submit").on('click', function(event) {
    event.preventDefault();
    let content = $('form').serialize();

    if($('form textarea').val() === ''){
      $('#error').text('No tweet inserted!');
    } else if ($('form textarea').val().length > 140){
      $('#error').text("Tweet can't exceed 140 characters!");
    } else {
      $.post("/tweets/", content, function(data, status){
        $('textarea').val('');
        $('#error').text('');
        $('.counter').text(140); 
        loadTweets();
      });
    }
  });

  //
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetdata) {
        renderTweets(tweetdata);
      }
    });
  }

  //
  function createTweetElement(tweet){
    //Make Header:
    let $header = $('<header>');
    let userAvatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small);;
    let userName = $('<div>').addClass('username').text(tweet.user.name);
    let userHandle = $('<div>').addClass('usertag').text(tweet.user.handle);
    $header.append(userAvatar).append(userName).append(userHandle);

    //Make Body:
    let content = $('<div>').addClass('content').text(tweet.content.text);

    //Make Footer:
    let $footer = $('<footer>');
    let days = moment(tweet.created_at).fromNow();
    let date = $('<div>').addClass('date').text(days);
    let likes = $('<div>').addClass('likes').text('#');
    let $icons = $('<div>').addClass('icons');
    let iconFlag = $('<span>').addClass("fas fa-flag").attr('style','padding: 5px;');
    let iconRetweet = $('<span>').addClass("fas fa-retweet").attr('style','padding: 5px;');
    let iconHeart = $('<span>').addClass("fas fa-heart").attr('style','padding: 5px;');
    $icons.append(iconFlag).append(iconRetweet).append(iconHeart);
    $footer.append(date).append(likes).append($icons);

    // Appending header, body, footer to article:
    let $tweet = $('<article>').addClass('tweet');
    $tweet.append($header).append(content).append($footer);
    return $tweet;
  }

  //
  function renderTweets(tweets){
    $('#tweets-container').empty();
    let $section = $('<section>').addClass('tweets-container');
    for(var user of tweets){
      let _tweet = createTweetElement(user);
      $section.prepend(_tweet);
    }
    $('#tweets-container').append($section);
  }

  $(".compose").click(function() {
    $(".new-tweet").slideToggle(100);
    $('textarea').focus();
  });

  $(".test").on('click', function(event) {
    event.preventDefault();
    let content = '';

    console.log('TEST 1');

    $.post("/tweets/like", content, function(data, status){
      console.log('TEST 2');
    });
  });

  // $('#tweets-container').on('click', '.fas.fa-heart', function () {
  //   event.preventDefault();
  //   var thisTweet = $(this);
  //   $.post("/tweets/like", thisTweet, function(data, status){
  //     ToggleLike(thisTweet);
  //     console.log('Test');
  //   });

  //   function ToggleLike(someTweet){
  //   $.ajax({
  //     url: '/tweets/like',
  //     method: 'GET',
  //     success: function () {
  //       console.log('Test');;
  //     }
  //   });
  //   }
  // });
});

