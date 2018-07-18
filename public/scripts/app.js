/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function () {

  loadTweets()

  $("#submit").on('click', function(event) {
    event.preventDefault();
    let content = $('form').serialize();

    if($('form textarea').val() === ''){
      console.log('No tweet entered');
    } else if ($('form textarea').val().length > 140){
      console.log('> 140');
    } else {
      $.post("/tweets/", content, function(data, status){
        $('#tweets-container').empty();
        $('textarea').val('');
        loadTweets();
      });
    }
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetdata) {
        renderTweets(tweetdata);
      }
    });
  }

  function createTweetElement(tweet){
    //Make Header:
    let $header = $('<header>');
    let userAvatar = $('<img>').attr('src', tweet.user.avatars.small);;
    let userName = $('<div>').addClass('username').text(tweet.user.name);
    let userHandle = $('<div>').addClass('usertag').text(tweet.user.handle);
    $header.append(userAvatar).append(userName).append(tweet.user.handle);

    //Make Body:
    let content = $('<div>').addClass('content').text(tweet.content.text);

    //Make Footer:
    let $footer = $('<footer>');
    var time = '10 days ago';
    let date = $('<div>').addClass('date').text(time);
    let $icons = $('<div>').addClass('icons');
    let iconFlag = $('<span>').addClass("fas fa-flag");
    let iconRetweet = $('<span>').addClass("fas fa-retweet");
    let iconRheart = $('<span>').addClass("fas fa-heart");
    $icons.append(iconFlag).append(iconRetweet).append(iconRheart);
    $footer.append(date).append($icons);

    // Appending header, body, footer to article:
    let $tweet = $('<article>').addClass('tweet');
    $tweet.append($header).append(content).append($footer);
    return $tweet;
  }

  function renderTweets(tweets){
    let $section = $('<section>').addClass('tweets-container');
    for(var user of tweets){
      let _tweet = createTweetElement(user);
      $section.prepend(_tweet);
    }
    console.log('RENDER');
    $('#tweets-container').append($section);
  }
});

