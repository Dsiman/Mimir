module.exports = async () => {     // What day is it
    var day = new Date().toLocaleDateString(undefined, {
        day:'numeric',
    })
    
    return day
}