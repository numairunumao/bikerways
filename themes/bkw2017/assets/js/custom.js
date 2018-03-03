jQuery(document).ready(function($) {
  $('.owl-carousel').owlCarousel({
		loop: true,
		items: 1,
		thumbs: true,
		thumbImage: true,

	});

  $('#small-menu-button').on('click', function() {
    $('.right-side').toggleClass('active');
    $('.top-bar-mobile').toggleClass('active');
    $('.footer').toggleClass('active');
    $('.mobile-menu').toggleClass('active');
  });



	
});
