module.exports = async () => {
    // Get todays date
    var today = new Date();

    // How many days are in this month
    var lastday = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate()
    
    // Return how many days in this month
    return lastday
};