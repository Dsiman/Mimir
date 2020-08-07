module.exports = async (duration, type) => { 
    const totalMinutes = (duration / 1000) / 60;
    const totalMins = Math.floor(totalMinutes)
    const hourPart = Math.floor((totalMinutes / 60));
    const minutePart = Math.floor(totalMinutes % 60);
    let timeString = '';

    switch (type) {
        case 'Short' :
            if (hourPart > 0) {
                timeString = (hourPart > 0) ? (hourPart + 'h ') : '';
            } else {
                timeString = minutePart + 'min';
            }
            break;
        case 'Full' :
            timeString += (hourPart > 0) ? (hourPart + 'h ') : '';
            timeString += minutePart + 'min';
            break;
        default: timeString = totalMins
    }
    return timeString;
}