
//CREATE THE PRIVATE BOX

window.SpotifooApp = window.SpotifooApp || {};

//CREATE THE CLASS SONG SEARCHER (INIT-SEARCH-SAVE+RENDER MODEL)

var SongSearcher = function(){
};

SongSearcher.prototype.init = function(){
  console.log("SongSearcher has been initialized")
};

SongSearcher.prototype.search = function(songName){
  var searchedSong = this;
  $.get({
    url: "https://api.spotify.com/v1/search?q=" + songName + "&type=track",
    success: function(response){
      var listOfSongs = response
      console.log("Ajax get call succeeded")
      searchedSong.render(listOfSongs);
    }
  });
};

SongSearcher.prototype.render = function(foundSongs){
  songs = [];
  this.songs = [];
  this.songs.push(foundSongs);
  $(".tittle").empty();
  $(".author").empty();
  $(".track-list").empty();
  var renderableSongs = this.songs[0].tracks.items
  var firstSong = renderableSongs[0];
  var firstSongName = firstSong.name;
  var firstSongArtist = firstSong.artists[0].name
  var firstSongImage = firstSong.album.images[1].url;
  var firstSongPreview = firstSong.preview_url;
  $(".title").text(firstSongName);
  $(".author").text(firstSongArtist);
  $(".cover-image").prop("src", firstSongImage);
  $(".preview-player").prop("src", firstSongPreview);
  $(".preview-player").trigger("play");
  $(".btn-play").addClass("playing");
  var maxNumDisplayedSongs = 10;
  for (var i = 0; i < maxNumDisplayedSongs; i++) {
    $(".track-list").append("<p class='listed-song' data-order=" + i + ">" + i + ". " + renderableSongs[i].name + "  -  " + renderableSongs[i].artists[0].name  + "</p>");
    songs.push(renderableSongs[i])
  }
};

window.SpotifooApp.SongSearcher = SongSearcher;



// CREATE THE CLASS TRACKLIST PLAYER
window.SpotifooApp = window.SpotifooApp || {};

 var TracklistPlayer = function(){
  };

  TracklistPlayer.prototype.init = function(){
      console.log("TracklistPlayer has been initialized")
  };

  TracklistPlayer.prototype.play = function(oneSongOrder){
    $(".btn-play").addClass("playing");
    var selectedSong = songs[oneSongOrder];
    $(".preview-player").prop("src", selectedSong.preview_url);
    $(".preview-player").trigger("play");
    this.changePlayer(oneSongOrder);
  };

  TracklistPlayer.prototype.changePlayer = function(songOrder){
    $(".title").empty();
    $(".author").empty();
    var selectedSong = songs[songOrder];
    $(".title").text(selectedSong.name);
    $(".author").text(selectedSong.artists[0].name);
    $(".cover-image").prop("src", selectedSong.album.images[1].url);
  };


  window.SpotifooApp.TracklistPlayer = TracklistPlayer;


// CREATE THE VAR SONG

var songs = [];


//CREATE LISTENERS

$(document).on("ready", function(){

  var mySongSearch = new SongSearcher()
  mySongSearch.init();

  $(".search-form").on("submit", function(event){
    event.preventDefault();
    var writtenSong = $(".search-input").val();
    mySongSearch.search(writtenSong);
  })

  $(document).on("click", ".listed-song", function(event){
    var clickedSong = new TracklistPlayer();
    event.preventDefault();
    clickedSong.init();
    var selectedSong = $(event.currentTarget);
    var selectedSongOrder = selectedSong.data("order");
    clickedSong.play(selectedSongOrder);
  });

  $(".btn-play").on("click", function(){
    if ($(".btn-play").hasClass("playing")){
      $(".btn-play").removeClass("playing");
      $(".preview-player").trigger("pause");
    }
    else {
      $(".btn-play").addClass("playing");
      $(".preview-player").trigger("play");
    }
  });

  function printTime () {
    var current = $('.preview-player').prop('currentTime');
    console.debug('Current time: ' + current);
  }
  $('.preview-player').on('timeupdate', printTime);
  printTime();

});
