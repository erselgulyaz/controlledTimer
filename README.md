# controlledTimer
controlledTimer is a forward / reverse time management application. You can set the start and end times and you can access different functions in both cases.

Values you can enter: day: hour: minute: second

## Properties
* Pure javascript
* Ecmascript 6
* Editable properties

## Test Address
[projects.erselgulyaz.com/controlledtimer/](http://projects.erselgulyaz.com/controlledtimer/)

## Usage
#### Install with terminal
```html
npm install controlledtimer
```
#### Import your js file
```html
import controlledTimer from './controlledTimer'
```
#### Init
```html
import controlledTimer from './controlledTimer'
```
## Using to Parameters
```html
const timerEl = new controlledTimer({  
	container: '#controlledtimer-container',  
	selector: '#controlledtimer-selector',  
	start: '00:58',  
	end: '00:00',  
	direction: 'down', /* up, down */  
	startCallback: () => {    
		console.log("start");  
	},  
	endCallback: () => {    
		console.log("end");  
	}
});

const killButton = document.querySelector("#controlledtimer-kill");
const restartButton = document.querySelector("#controlledtimer-restart");
const playPauseButton = document.querySelector("#controlledtimer-playpause");

killButton.addEventListener("click", () => { 
	timerEl.kill();
});
restartButton.addEventListener("click", () => {  
	timerEl.restart();
});

playPauseButton.addEventListener("click", () => {  
	timerEl.playPause();
});
```

## Parameters

<table>
	<tr>
      <td>Name</td>
      <td>Type</td>
      <td>Default</td>
      <td>Description</td>
    </tr>
    <tr>
      <td>
      <strong>container</strong>
      </td>
      <td>
      string
      </td>
      <td>
"#controlledtimer-container"
      </td>
      <td>
      <p>This is a container field selector. The presence of the section where the study will be performed is controlled by this selector.</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>selector</strong>
      </td>
      <td>
      string
      </td>
      <td>
"#controlledtimer-selector"
      </td>
      <td>
      <p>The created template is inserted into this selector.</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>start</strong>
      </td>
      <td>
      string
      </td>
      <td>
"00:58"
      </td>
      <td>
      <p>Start Time</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>end</strong>
      </td>
      <td>
      string
      </td>
      <td>
"00:00"
      </td>
      <td>
      <p>End Time</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>direction</strong>
      </td>
      <td>
      string
      </td>
      <td>
"down"
      </td>
      <td>
      <p>How to count from start time to end time is determined by this feature. Only the "up" and "down" options can be written.</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>startCallback</strong>
      </td>
      <td>
      function
      </td>
      <td>
function
      </td>
      <td>
      <p>  
It is a function that runs once when the time starts. You can run a function in your application.</p>
      </td>
    </tr>
    <tr>
      <td>
      <strong>endCallback</strong>
      </td>
      <td>
      function
      </td>
      <td>
function
      </td>
      <td>
      <p>  
It is a function that runs once when the time expires. You can run a function in your application.</p>
      </td>
    </tr>
     

</table>