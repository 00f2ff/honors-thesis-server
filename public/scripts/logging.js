function Log() {
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

Log.prototype.logServerData = function(data) {
	this.LOG.participant_id = data.participant_id;
	this.LOG.task_id = data.task_id;
	this.LOG.fingers = data.fingers;
}

Log.prototype.logInteraction = function(key, userEvent, text) {
	var interaction = {
		time: Date.now(),
		key: key,
		userEvent: userEvent,
		text: text
	}
	this.LOG.interactions.push(interaction);
	console.log(this.LOG);
}




var log = new Log();