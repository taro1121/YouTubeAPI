'use strict';

  const base_keyword = "tour+de+france+";
  const base_sort = "date";
  const API_KEY = "AIzaSyA32cMvDzG0p2BmwnILQgeNbslN33SWah0"; //Restricted Key for PROD "AIzaSyDrbGysEfXL2VFj9ohsyxM6q2M1_T2SvXs"
  let $videoSrc;

  $(document).ready(function() {
    // initDummyLoad(); //for DEV purpose.  comment out "Ln121 search()" in init() method as well to save resource.

  // When user click search btn, render "Tour de France" videos (24) with the keyword ordered by date.
    $("#search_form").on("submit", function(e) {
      e.preventDefault();
      search();
    });

  // When use click sort menu, capture sort criteria and search word then create api request.
    $(".sort").on("click", function(e) {
      e.preventDefault();
      let $sortValue = $(this).attr("value");
      console.log("$sortValue is: " + $sortValue);

      sortBy(copyKeyword(), $sortValue);
    });

  // when the modal is opened autoplay it
    $('#myModal').on('shown.bs.modal', function(e) {
  // set the video src to autoplay and not to show related video.
      $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
  // stop playing the youtube video when user closes the modal by removing ?autoplay parameter from link.
    $('#myModal').on('hide.bs.modal', function(e) {
      $("#video").attr('src',$videoSrc);
    })
    $(window).on("resize", resetVideoHeight);//work on later
  });

  // base search fn.  search by base + custom keyword and sort by date (up to 24).
  function search() {
    let keyword = encodeURIComponent($("#search").val()).replace(/%20/g, "+");
    console.log("keyword is: " + keyword);
    createRequest(keyword, base_sort);
  }

  // fn to copy keyword in the search box.
  function copyKeyword() {
    let search_keyword = encodeURIComponent($("#search").val()).replace(/%20/g, "+");
    console.log("search_keyword is: " + search_keyword);
    return search_keyword;
  }

  // fn to sort by the menu label and custom keyword.
  function sortBy(keyword, sortValue) {
      createRequest(keyword, sortValue);
  }

  function createRequest(keyword, sortValue) {
    let api_keyword = base_keyword + keyword;
    console.log("api_keyword is: " + api_keyword);

    let request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: api_keyword,
      maxResults: 24,
      order: sortValue,
      publishedAfter: "2010-01-01T00:00:00Z"
    });

    console.log("request is: " + request);
    request.execute(response => {
      let results = response.result;
        $("#results").html("");
        resultsLoop(results);
        resetVideoHeight();
    });
  }

  // fn to render results
  function resultsLoop(data){
    $("#results").html("");
    $.each(data.items, (i, item) => {
      const thumb = item.snippet.thumbnails.medium.url;
      const channel_title = item.snippet.channelTitle.substring(0,45);
      const title = item.snippet.title.substring(0,45);
      const desc = item.snippet.description.substring(0,45);
      const pdate = new Date(item.snippet.publishedAt);
      const date = (pdate.getMonth() + 1)+ "/" + pdate.getDate()  + "/" + pdate.getFullYear();
      const videoid = item.id.videoId;
      const time = new Date($.now());

      $("#results").append(`
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 panel">
          <button type="button" class="btn btn-primary video-btn" data-toggle="modal" data-src="https://www.youtube.com/embed/${videoid}" data-target="#myModal">
            <img src="${thumb}" alt="thumbnail image">
          </button>
          <div class="details">
            <p>${channel_title}</p>
            <p>${title}</p>
            <p>${desc}</p>
            <p>Published Date: ${date}</p>
          </div>
      </div>
      `);
      $("#footer-modify").html(`<p>Last Updated: ${time}`);

  // Get video link every time #result is rendered.
      $('.video-btn').on('click', function() {
        $videoSrc = $(this).data("src");
      });
    });
  }

  // set up google api.
  function init() {
    gapi.client.setApiKey(API_KEY);
    gapi.client.load("youtube", "v3", function() {
      search();
    });
  }


  //DEV test purpose.
  function initDummyLoad() {
    $.getJSON("dev/response_sample.json", function(json) {
      var results_data = json;
      resultsLoop(results_data);
    });
  }
  // for mobile.  Work on later.
  function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16)
  }