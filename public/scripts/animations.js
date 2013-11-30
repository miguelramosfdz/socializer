$('.navbar').mouseenter(function () {
	$('.navmenu').fadeIn(500);
});

$('.navmenu').mouseenter(function () {
	$(this).show();
})

$('.navmenu').mouseleave(function () {
	$(this).fadeOut(500);
})