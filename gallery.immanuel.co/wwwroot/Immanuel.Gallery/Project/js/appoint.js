$(function() {
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	
	var option = {
		clientid: 0,
		clientname: '',
		description: '',
		clientconfig: {
			configid: 0,
			subdmain: '',
			concurrent:0,
			duration:0,
			//businessHours: {}
			businessHours : {
				start: '09:00', // a start time (10am in this example)
				end: '18:00', // an end time (6pm in this example)
				dow: [ 1, 2, 3, 4, 5 ]
			},
			allowNonbookingHours : false,
			hiddenDays: [0,6]
		}
	};
	
	var config = {
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'today agendaWeek,agendaDay'
        },
		defaultView: 'agendaWeek',
		dayClick: function (date, allDay, jsEvent, view) {
		    //mLight.trigger("dayEvent");
		},
		eventClick: function (calEvent, allDay, jsEvent, view) {
			populateForm([ calEvent, allDay, jsEvent, view ]);
		},
		eventMouseover: function (calEvent, jsEvent) {
		    console.log("");
		},
		eventMouseout: function (calEvent, jsEvent) {
		    console.log("");
		},
		scrollTime: (option.clientconfig.businessHours && option.clientconfig.businessHours.start) ? option.clientconfig.businessHours.start : "09:00:00",
		timeFormat: 'h:mmTT{-h:mmTT}',
		hiddenDays: option.clientconfig.hiddenDays,
        editable: true,
	 	events:  events,
		businessHours : option.clientconfig.businessHours,
		eventConstraint :option.clientconfig.businessHours,
		editable: true,
		droppable: true,
		dropAccept: function(ev1) {
			return true;
		},
		eventDragStop: function( event, jsEvent, ui, view ) { 
			console.log(event);
		},
		drop: function( date, jsEvent, ui ) { 
			console.log(date);
		},
		eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) { 
			console.log(event);
		},
		eventResizeStop: function( event, jsEvent, ui, view ) { 
			console.log(event);
		},
		eventReceive: function(event, delta, revertFunc) {
			console.log(event);
		},
		eventRender: function(event, element) {
			console.log(event);
		},
		eventOverlap: function(stillEvent, movingEvent) {
			return option.clientconfig.concurrent;
		},
		selectable: true,
		selectHelper: true,
		selectConstraint: option.clientconfig.businessHours,
		select: function( start, end, jsEvent, view ){
			mLight.trigger("dayEvent", [start, end, jsEvent, view]);
		},
		dayRender: function(date, cell){
			
		},
		viewRender: function(currentView){
			var minDate = moment().add(-2,'weeks'),
			maxDate = moment().add(2,'weeks');
			// Past
			if (minDate >= currentView.start && minDate <= currentView.end) {
				$(".fc-prev-button").prop('disabled', true); 
				$(".fc-prev-button").addClass('fc-state-disabled'); 
			}
			else {
				$(".fc-prev-button").removeClass('fc-state-disabled'); 
				$(".fc-prev-button").prop('disabled', false); 
			};
			// Future
			if (maxDate >= currentView.start && maxDate <= currentView.end) {
				$(".fc-next-button").prop('disabled', true); 
				$(".fc-next-button").addClass('fc-state-disabled'); 
			} else {
				$(".fc-next-button").removeClass('fc-state-disabled'); 
				$(".fc-next-button").prop('disabled', false); 
			};
			//$("[data-date="+ moment().format("YYYY-MM-DD") +"]").css("background-color", "YELLOW");
		}
    };
	
	var newEvent = [], editEvent = [], delEvent = [];
	
	var events = [
			{
				title  : 'event1',
				start  : '2015-06-01',
				name:'user1',
				mobile:'123456',
				mobile:'some@mail.com'
			},
			{
				title  : 'event2',
				start  : '2015-06-05',
				end    : '2015-06-07',
				color:getRandomColor(),
				name:'user1',
				mobile:'123456',
				mobile:'some@mail.com'
			},
			{
				title  : 'event3',
				start  : '2015-06-09T12:30:00',
				allDay : false, // will make the time show
				color:getRandomColor()
			},
			{
				title  : 'event4',
				start  : '2015-06-09T12:30:00',
				end  : '2015-06-09T14:30:00',
				allDay : false, // will make the time show
				color:getRandomColor()
			}
		];

	var mLight = $('<div id="light" class="white_show"></div>');
	var mFade = '<div id="fade" class="black_show"></div>';
	var mClose = $('<a class="modalCloseImg" title="Close"></a>');
   
   var modalPopup = function() {
	   $(mFade).css('display', 'block');
       mLight.css('display', 'block');
       $('.clockpicker').clockpicker();
   }
   
   var closeModal = function() {
	   $(mFade).css('display', 'none');
       $(mLight).css('display', 'none');
   }
   
   var populateForm = function(evtData, jsEvent, view) {
	   modalPopup();
	   if (evtData.start){
		   $(".frm-container").find(".clock-num").first().val(evtData.start.format("MM-DD-YYYY"));
		   $(".frm-container").find(".clockpicker").first().val(evtData.start.get("hour") + ":" + evtData.start.get("minute"));
	   }
	   else {
		   $(".frm-container").find(".clock-num").first().val(moment().format("MM-DD-YYYY"));
		   $(".frm-container").find(".clockpicker").first().val("09:30");
	   }
	   
	   if (evtData.end){
		   $($(".frm-container").find(".clock-num")[1]).val(evtData.end.format("MM-DD-YYYY"));
		   $($(".frm-container").find(".clockpicker")[1]).val(evtData.end.get("hour") + ":" + evtData.end.get("minute"));
	   }
	   else {
		   $($(".frm-container").find(".clock-num")[1]).val(moment().format("MM-DD-YYYY"));
		   $($(".frm-container").find(".clockpicker")[1]).val("09:30");
	   }
   }
   
   var getForm = function() {
	   var form = $("<div class='frm-container'><div class='frm-header'><h2><b>Appointment Details</b></h2></div></div>");
	   form.append(getClock('From'));
	   form.append(getClock('To'));
	   form.append(getText('Name'));
	   form.append(getText('Mobile'));
	   form.append(getText('Email'));
	   form.append(getTextArea('Description'));
	   form.append(getCapcha());
	   mLight.append(mClose);
	   mLight.append(form);
	   mLight.append(getSaveButton());
	   return mLight;
   }
   
   var getClock = function(lblText){
	   return $('<div><label class="span2 app-label">' + lblText + '</label><div><input type="text" readonly class="span1 clock-num txtBlock"><input type="text" class="clockpicker span1 txtBlock" data-autoclose="true" value="09:30"></div></div>');
   }
   
   var getText = function(lblText) {
	   return $('<div><label class="span2 app-label">' + lblText + '</label><input type="text" class="span2 txtBlock"></div>');
   }
   
   var getTextArea = function(lblText) {
	   return $('<div><label class="span6 app-label">' + lblText + '</label><label class="span2 app-label">Captcha</label><textarea rows="5" style="margin-left: 2%;" class="span6 txtBlock" /></div>');
   }
   
   var getCapcha = function() {
	   return $('<div><img src="" style="margin-left: 2%;" class="span2"></div>');
   }
   
   var getSaveButton = function() {
	   return $("<div style='position:absolute;bottom:10px; right:10px;'><button>Save</button></div>");
   }
   
   $(mLight).on("dayEvent", function(evt, start, end, jsEvent, view) {
	   closeModal();
       populateForm( { start: start, end: end }, jsEvent, view);
       evt.preventDefault();
   });
   
   $(mClose).on("click", function(evt) {
       closeModal();
       evt.preventDefault();
   });
   
   //Calender
    $('#calendar').fullCalendar(config);
   

	$('#external-events p').each(function() {

		// store data so the calendar knows to render an event upon drop
		$(this).data('event', {
			title: $.trim($(this).text()), // use the element's text as the event title
			stick: true, // maintain when user navigates (see docs on the renderEvent method)
			color:getRandomColor()
		});

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});

	});

   
   $("body").append(getForm()).append(mFade);
});