$(window).load(function () {
  $(window).scroll(function () {
    var wintop = $(window).scrollTop(),
      docheight = $('#wrapper').height(),
      winheight = $(window).height()

    var totalScroll = (wintop / (docheight - winheight)) * 100
    $('.progressBar').css('width', totalScroll + '%')
  })
})
