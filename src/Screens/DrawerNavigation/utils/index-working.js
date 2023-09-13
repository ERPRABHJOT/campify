import moment from "moment"
// get days in months
export const getdDaysInMonth = (mon) => {
    var daysInMonth = moment(mon).daysInMonth();
    var arrDays = [];
    while(daysInMonth) {
      let current = moment(mon).date(daysInMonth);
      arrDays.push({day: moment(current).format('dd'), date:  moment(current).format('DD')});
      daysInMonth--;
    }
    
    return arrDays.reverse();
}
// get times  format
export const getTimes = (start="12:00 AM", end="11:59 PM") => {
    const items = [];
        new Array(24).fill().forEach((acc, index) => {
                items.push(moment( {hour: index} ).format('h:mm A'));
                items.push(moment({ hour: index, minute: 30 }).format('h:mm A'));
        })
        return items;
}

 // events according date seleted
export const groupEvents = (arr) => { 
    arr.sort((a, b) => {
        var aStart = moment(a.start, 'hh:mm A');
        var bStart = moment(b.start, 'hh:mm A');            

        var aDuration = moment.duration(moment(a.end, 'hh:mm A').diff(aStart));
        var bDuration = moment.duration(moment(b.end, 'hh:mm A').diff(bStart));

        if (aStart.isBefore(bStart)) {
            return -1;
        } else if (aStart.isAfter(bStart)) {
            return 1;
        } else {
            if (aDuration.asMinutes() > bDuration.asMinutes()) {
              return -1;
            } else if (aDuration.asMinutes() < bDuration.asMinutes()) {
              return 1;
            } else {
              return 0;
            }
        }
    });

    let events = arr
    
    let overlapping = []
    let nonOverlapping = []

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventStart = moment(`${event.date} ${event.start}`, 'DD-MM-YYYY hh:mm A');
        const eventEnd = moment(`${event.date} ${event.end}`, 'DD-MM-YYYY hh:mm A');
        let isOverlapping = false;
        
        for (let j = 0; j < overlapping.length; j++) {
            const existingEvent = overlapping[j];
            const existingEventStart = moment(`${existingEvent.date} ${existingEvent.start}`, 'DD-MM-YYYY hh:mm A');
            const existingEventEnd = moment(`${existingEvent.date} ${existingEvent.end}`, 'DD-MM-YYYY hh:mm A');
            
                if((eventStart >= existingEventStart && eventStart <= existingEventEnd) || (eventEnd >= existingEventStart && eventEnd <= existingEventEnd)){
                overlapping[j].events.push(event);
                isOverlapping = true;
            break;
            }
        }
        

        if (!isOverlapping) {
            nonOverlapping.push({
                date: event.date,
                start: event.start,
                end: event.end,
                events: [event]
            });
            overlapping.push(nonOverlapping[nonOverlapping.length - 1]);
        }
    }

    return overlapping;
}