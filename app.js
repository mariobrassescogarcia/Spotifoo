
//CREATE THE PRIVATE box

if (window.SongSearcher === undefined){
  window.SongSearcher = {};
};

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
  var maxNumDisplayedSongs = 10;
  for (var i = 0; i < maxNumDisplayedSongs; i++) {
    $(".track-list").append("<p class='listed-song' >" + i + ". " + renderableSongs[i].name + "  -  " + renderableSongs[i].artists[0].name  + "</p>");
  }
};

//CREATE THE CLASS TRACKLIST PLAYER

//  if (window.TracklistPlayer === undefined){
//    window.TracklistPlayer = {};
//  };
//
// var TracklistPlayer = function(){
//  };
//
//  TracklistPlayer.prototype.init = function(){
//    console.log("TracklistPlayer has been initialized")
//  };
//
//  TracklistPlayer.prototype.select = function(foundSongs){
//   this.songs = [];
//   this.songs.push(foundSongs);
//   $(".tittle").empty();
//   $(".author").empty();
//   var renderableSongs = this.songs[0].tracks.items
//   var firstSong = renderableSongs[0];
//   var firstSongName = firstSong.name;
//   var firstSongArtist = firstSong.artists[0].name
//   var firstSongImage = firstSong.album.images[1].url;
//   var firstSongPreview = firstSong.preview_url;
//   $(".title").text(firstSongName);
//   $(".author").text(firstSongArtist);
//   $(".cover-image").prop("src", firstSongImage);
//   $(".preview-player").prop("src", firstSongPreview);
// };



//CREATE LISTENERS

$(document).on("ready", function(){

  var mySongSearch = new SongSearcher()
  mySongSearch.init();
  $(".search-form").on("submit", function(event){
    event.preventDefault();
    var writtenSong = $(".search-input").val();
    mySongSearch.search(writtenSong);
  })

});
