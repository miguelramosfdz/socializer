$(function () {

	$('.navbar').mouseenter(function () {
		$('.navmenu').fadeIn(500);
	});

	$('.navbar').mouseleave(function () {
		$('.navmenu').fadeOut(500);
	});

});