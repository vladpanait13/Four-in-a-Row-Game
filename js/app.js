const game = new Game();

$('#begin-game').click( 
	function() {
		game.startGame();
		$(this).hide();
		$('#play-area').css('opacity','1');
	});

$(document).keydown( function(event) { 
	game.handleKeyDown(event); 
});
