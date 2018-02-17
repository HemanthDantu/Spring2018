var apiKey = '2d52b7fcc2ba4d69a87d755b06ea9309';
var bbcNewsApiUrl = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=' + apiKey;
var cnnApiUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=' + apiKey;
var entertainmentWeeklyApiUrl = 'https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=' + apiKey;
var independentApiUrl = 'https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=' + apiKey;
var newsweekApiUrl = 'https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=' + apiKey;
var theEconomistApiUrl = 'https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=' + apiKey;
var theGuardianApiUrl = 'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=' + apiKey;
var theNewYorkTimesApiUrl = 'https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=' + apiKey;
var timeApiUrl = 'https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=' + apiKey;
var buzzFeedApiUrl = 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=' + apiKey;
var mirrorApiUrl = 'https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=' + apiKey;
var theTelegraphApiUrl = 'https://newsapi.org/v1/articles?source=the-telegraph&sortBy=top&apiKey=' + apiKey;
var theWashingtonPostApiUrl = 'https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=' + apiKey;
var nationalGeographicApiUrl = 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=' + apiKey;

var apiList = [ bbcNewsApiUrl, cnnApiUrl, entertainmentWeeklyApiUrl, independentApiUrl, newsweekApiUrl, theEconomistApiUrl, theGuardianApiUrl, theNewYorkTimesApiUrl, timeApiUrl, buzzFeedApiUrl, mirrorApiUrl, theTelegraphApiUrl, theWashingtonPostApiUrl, nationalGeographicApiUrl ];

var searchInput = $('.search-input');
var clearBtn = $('.clear-btn');
var noResults = $('.no-results-found');

function insertContent(response, thisAPIindex) { 
  // needs to be declared here to be usable in the aricles' loop below
  var newArticleId;
  // prevents generating the same ids for each API response.articles list
  function generateId(response, thisAPIindex, thisArticleIndex) {
    // unless it's the 1st API on the apiList, the ids should start from the last article id + 1;
    if (thisAPIindex > 0) {
      var lastArticleId = $('.article-box').last().data('article-id');
      
      newArticleId = lastArticleId + 1;
    // if it's the 1st API on the apiList, the ids should start from 1
    } else {
      newArticleId = thisArticleIndex + 1;
    }
  }
  function setImage(image) {
    if (image !== null) {
      return image
    } else {
      return 'https://s1.postimg.org/5p0ja4usqn/no-image-icon-23480.jpg'
    }
  }
   
  $.each(response.articles, function(i, article) {
      var image = article.urlToImage
      generateId(response, thisAPIindex, i) // thisArticleIndex; f called here because applies to every article
      
      var articleBox = $('<div>', {
        class: 'article-box',
        'data-article-id': newArticleId,
        'data-source': response.source
      }); 
      // var articleImg = $('<img>', {
      //   src: article.urlToImage,
      //   class: 'article-img'
      // });
      var articleImg = $('<div>', {
        class: 'article-img',
        css: {
          'background': "url('" + setImage(image) + "')",
          // 'background': "url('" + article.urlToImage + "')",
          'background-position': 'center center',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        }
      });
      var readLaterBtn = $('<i>', {
        class: 'fa fa-bookmark-o read-later-btn',
        'aria-hidden': 'true'
      }); 
      var articleAuthor = $('<span>', {
        class: 'article-author',
        text: article.author
      });
      var articleTitle = $('<a>', {
        href: article.url,
        target: '_blank',
        class: 'article-title',
        text: article.title
      });
      var articleDesc = $('<p>', {
        class: 'article-description',
        text: article.description
      });
      var articledate=$('<p>',{
          class: 'article-date',
          text:article.date
      });
      var articleShareBox = $('<span>', {
        class: 'article-share-box'
      })
      var articleFBshare = $('<a>', {
        href: 'https://www.facebook.com/sharer/sharer.php?u=' + article.url,
        target: '_blank',
        class: 'share-btn'
      });
      var fbIcon = $('<i>', {
          class: 'fa fa-facebook-square share-icon',
          'aria-hidden': 'true'
      })
      var articleTwitterShare = $('<a>', {
          href: 'https://twitter.com/home?status=' + article.url,
          target: '_blank',
          class: 'share-btn'
      });
      var twitterIcon = $('<i>', {
          class: 'fa fa-twitter-square share-icon',
          'aria-hidden': 'true'
      });

      articleBox.append(articleImg, readLaterBtn, articleAuthor, articleTitle, articleDesc, articledate, articleFBshare, articleTwitterShare, articleShareBox);

      articleFBshare.append(fbIcon);
      articleTwitterShare.append(twitterIcon);
      articleShareBox.append(articleFBshare, articleTwitterShare);
    
      var articlesList = $('.articles-list');
      articlesList.append(articleBox);
  });  
};

function loadTopHeadlines() {
  $.each(apiList, function(i, apiUrl) {  
    
    $.ajax ({
      url: apiUrl,
    }).done(function(response) {
       insertContent(response, i); // thisAPIindex
    }).fail(function(error) {
       console.log(error);
    });
  })
};

loadTopHeadlines();

var filteredSourceData = [];

function searchInArticles(searchValue) {
  var authorsList = $('.article-author').toArray();
  var titlesList = $('.article-title').toArray();
  var descriptionsList = $('.article-description').toArray();
  
  var articlesContentList = titlesList.concat(authorsList, descriptionsList);
  var showedArticlesList = []; // relates to articles shown after search input provided
  var listOfChosenFiltersArticleList = []
  
  $('.articles-list').find('.article-box').hide();
   
  if (filteredSourceData.length > 0) {
    $('.articles-list').find('.article-box').hide();
    $.each(filteredSourceData, function(i, source) {
      
     var chosenFiltersArticleList =  $(".all-articles-container .article-box[data-source='" + source +"']").toArray()

      listOfChosenFiltersArticleList.push(chosenFiltersArticleList)
    })

    $.each(listOfChosenFiltersArticleList, function(i, chosenFiltersArticleList) {
      $.each(chosenFiltersArticleList, function(j, article) {
        var articleContentValue = $(this).text().toLowerCase();

        if (articleContentValue.indexOf(searchValue) != -1) {
          console.log(searchValue)
          console.log('here')
          $(this).fadeIn();
          showedArticlesList.push(article);
        }
      })
    })
  } else {
    $.each(articlesContentList, function(i, articleContent) {
      var articleContentValue = $(this).text().toLowerCase();

      if (articleContentValue.indexOf(searchValue) != -1) {
        noResults.hide();
        $(articleContent).parent().fadeIn();
        showedArticlesList.push(articleContent);
      }   
    })
  }
  


  if (showedArticlesList.length == 0) {
    console.log('tu')
    noResults.fadeIn();
  }
};

$('.search-input').on('keypress', function (element) {
  if (element.keyCode == 13) {   
    var searchValue = $('.search-input').val().toLowerCase();
    searchInArticles(searchValue);
    element.preventDefault();
  }
});

function showAllArticlesHideClearBtn() {
  clearBtn.removeClass('is-visible')
  noResults.hide();
  $('.all-articles-container .article-box').hide(); // when any article was displayed because of search input it should disappear now; shoul be removed  when search input functionality fixed (searching only within filtered when filter activated)
  if (filteredSourceData.length > 0) {
     $.each(filteredSourceData, function(i, sourceData) {
       $(".article-box[data-source='" + sourceData +"']").fadeIn();   
    });
  } else {
    $('.article-box').fadeIn();
  }
}

searchInput.on('keyup', function() {
  if ($(this).val().length > 0) {
    clearBtn.addClass('is-visible')
  } else {
    showAllArticlesHideClearBtn();
  }
})

clearBtn.on('click', function() {
  searchInput.val('');
  showAllArticlesHideClearBtn()
});

$(document).on('click', '.read-later-btn.fa-bookmark-o', function() {
  var readLaterContainer = $('.read-later-container');
  
  $(this).toggleClass('fa-bookmark fa-bookmark-o')
  $(this).parent().clone().hide().appendTo(readLaterContainer).toggleClass('read-later-article').fadeIn()
  readLaterContainer.find('.read-later-btn').addClass('remove-from-read-later-container') 
})

$(document).on('click', '.remove-from-read-later-container', function() {
  var thisArticleId = $(this).parent().data('article-id');
  $(".article-box[data-article-id='" + thisArticleId +"']").find('.read-later-btn').toggleClass('fa-bookmark fa-bookmark-o')
})

$(document).on('click', '.read-later-btn.fa-bookmark', function() {
  var thisArticleId = $(this).parent().data('article-id')
  
  $(".article-box[data-article-id='" + thisArticleId +"']").find('.remove-from-read-later-container').parent().fadeOut('fast', function() {
    $(this).remove();
  });
  $(this).toggleClass('fa-bookmark fa-bookmark-o')
});

$(document).click(function(){                   
  $('.dropdown-list').slideUp('fast');
});

$('.dropdown-btn').on('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
  $('.dropdown-list').slideToggle('fast');
});

// activating filter
$('.option').on('click', function() {
  var source = $(this).data('source');
  var removeBtn = $("<i class='fa fa-times remove-btn' aria-hidden='true'></i>");
  
  $('.all-articles-container .article-box').hide(); 
  $(this).clone().hide().appendTo($('.chosen-filters')).fadeIn();
  removeBtn.appendTo($('.chosen-filters .option').last());
  $(this).addClass('inactive');
  
  filteredSourceData.push(source);
  var searchValue = $('.search-input').val().toLowerCase();
  console.log(searchValue)
  if (searchValue.length > 0) {
    console.log('ds')
    searchInArticles(searchValue);
  } else {
    $.each(filteredSourceData, function(i, sourceData) {
     $(".article-box[data-source='" + sourceData +"']").fadeIn();   
    });
  }

});

$(document).on('click', '.remove-btn', function() {
  var sourceData = $(this).parent().data('source');
  
  $(this).parent().fadeOut('fast', function() {
    $(this).remove();
  });
  $(".option[data-source='" + sourceData +"']").removeClass('inactive');
  $(".all-articles-container .article-box[data-source='" + sourceData +"']").hide();
  filteredSourceData.splice($.inArray(sourceData, filteredSourceData), 1);
  
  if ($('.all-articles-container .article-box:visible').length == 0) {
    $('.article-box').fadeIn(); // 1000????
  };
  if (searchInput.val().length > 0) {
      var searchValue = $('.search-input').val().toLowerCase();
      searchInArticles(searchValue);
  };
});