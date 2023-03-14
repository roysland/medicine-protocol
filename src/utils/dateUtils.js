import moment from 'moment';
export function getWeekArray (todaysDate) {
    let startDate = moment().subtract(3, 'days');
    const endDate = moment().add(3, 'days');
    const dateArray = [];

    while (startDate <= endDate) {
        dateArray.push(startDate.format("YYYY-MM-DD"));
        startDate = startDate.add(1, 'days');
    }
    return dateArray;
};
