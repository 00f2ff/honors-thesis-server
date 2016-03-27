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

	// Logging
	this.LOG = {
		participant_id: undefined,
		fingers: undefined,
		participant_userAgent: navigator.userAgent, // I'll parse for OS later
		participant_browser: determineBrowser(),
		task_id: undefined,
		task_start_time: Date.now(),
		task_end_time: undefined,
		interactions: []
	}
}

function determineBrowser() {
	// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
		// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	    // Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	    // Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	    // Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	if (isChrome)  return "Chrome";
	if (isEdge)    return "Edge";
	if (isIE)      return "Internet Explorer";
	if (isSafari)  return "Safari";
	if (isFirefox) return "Firefox";
	if (isOpera)   return "Opera";
}

Global.prototype.addInteraction = function(key, userEvent, text) {
	var interaction = {
		time: Date.now(),
		key: key,
		userEvent: userEvent,
		text: text
	}
	this.LOG.interactions.push(interaction);
	console.log(this.LOG);
}

Global.prototype.cell = function(attributes) {
	var cell = $('<div class="cell"></div>');
	// assumes attributes come in prefixed with 'data-'
	var that = this;
	cell.attr(attributes)
		.on('mouseover', function() {
			// only highlight and read cells when search is not focused
			if (!$('#search input:focus').length) {
				$(this).css('background-color', 'yellow');
				// Read out information depending on type of cell
				// console.log(that);
				console.log($(this))
				if ($(this).attr('data-name')) { // LinkList
					that.msg.text = $(this).data('name');
				} else if ($(this).data('title')) { // Table
					that.msg.text = $(this).data('title') + '  ' + $(this).data('price');
				} else if ($(this).data('text')) {
					that.msg.text = $(this).data('text');
				}
				speechSynthesis.speak(that.msg);
				console.log(that.msg.text);
			}
		}).on('mouseout', function(event) {
			$(this).css('background-color', 'blue');
			// add interaction when search is not focused
			if (!$('#search input:focus').length) {
				that.addInteraction(event.keyCode, 'hover', that.msg.text);
			}
			// cancel speech
			speechSynthesis.cancel();
		});
	return cell;
}
