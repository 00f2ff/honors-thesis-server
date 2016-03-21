# honors-thesis-server -- Fingers Version

If I had considered the prospect of data collection, the entire site would have been Node.js from the beginning. :(

Document structure:

{
	participant_id: int, # from URL
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
}

}

Study design: Assign each participant an ID and ask them to input it into the application when prompted


Todo:

* Add participant ID input (URL param?)
* Add task ID input (URL param?)
* Add keylogging code (make sure keys aren't added on every hover event; make sure it wasn't the previous)
* Add pause / resume task key + functionality to remove paused time. Since pause key would be pressed twice, I could remove time difference from each later interaction. If all key logs subtract a pauseTime variable, I could initialize that variable as 0, and then += pause time whenever it occurs

