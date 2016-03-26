# honors-thesis-server -- Fingers Version

If I had considered the prospect of data collection, the entire site would have been Node.js from the beginning. :(

Document structure:

[{
	participant_id: int, # from URL
	fingers: boolean, # from URL
	participant_os: string, # navigator.userAgent (just part of)
	participant_browser: string, # http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser for name, and navigator.userAgent for version
	task_id: int, # from URL
	task_start_time: Date,
	task_end_time: Date, # ask users to press 'right arrow' or something to end task
	interactions: [ # these occur on particular interactions, not page load (like previous)
		{
			time: Date,
			key: string,
			hover: boolean,
			press: boolean
			text: string
		},
		{
			...
		}
	]
}]

When I'm running non-Fingers version, collect all key data, (should rely on same code), and don't take text (set as "" or something). This will help me build an ordered list of keypresses taken

Todo:

* Add keylogging code (make sure keys aren't added on every hover event; make sure it wasn't the previous)
* Add pause / resume task key + functionality to remove paused time. Since pause key would be pressed twice, I could remove time difference from each later interaction. If all key logs subtract a pauseTime variable, I could initialize that variable as 0, and then += pause time whenever it occurs
* Add complete button to end the task. I don't want to hit the database every single time there's a new interaction (this could just be right arrow or something)
* Create a sub-folder containing all Fingers scripts, and another that will contain all non-Fingers scripts
* Add a URL thing that tells app it's running Fingers or non-Fingers, affecting which index page loads as well as 'fingers' param in document
* test mongo model with mLab
* Add rest of metric code
* Test metric code (run through tasks a few times as different people using different systems)

