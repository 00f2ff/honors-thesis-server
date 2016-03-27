function Global() {
	// Speech Synthesis API
	// See https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section for documentation
	var msg = new SpeechSynthesisUtterance();
	msg.voice = window.speechSynthesis.getVoices()[1];
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1.25; // 0.1 to 10
	// msg.pitch = 2; //0 to 2
	msg.lang = 'en-US';
	this.msg = msg;
}

Global.prototype.cell = function(attributes) {
	var cell = $('<div class="cell"></div>');
	// assumes attributes come in prefixed with 'data-'
	var that = this;
	cell.attr(attributes)
		.on('mouseover', function() {
			// only highlight and read cells when search is not focused and unpaused
			if (!$('#search input:focus').length && !log.paused) {
				$(this).css('background-color', 'yellow');
				// Read out information depending on type of cell
				if ($(this).attr('data-name')) { // LinkList
					that.msg.text = $(this).data('name');
				} else if ($(this).data('title')) { // Table
					that.msg.text = $(this).data('title') + '  ' + $(this).data('price');
				} else if ($(this).data('text')) {
					that.msg.text = $(this).data('text');
				}
				speechSynthesis.speak(that.msg);
			}
		}).on('mouseout', function() {
			$(this).css('background-color', 'blue');
			// add interaction when search is not focused and unpaused
			if (!$('#search input:focus').length && !log.paused) {
				log.logInteraction($(this).data('keycode'), 'hover', that.msg.text);
			}
			// cancel speech
			speechSynthesis.cancel();
		});
	return cell;
}
