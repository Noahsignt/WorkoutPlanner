export const activityEquals = (a, b) => {
    return a.type === b.type && a.duration === b.duration && a.description === b.description;
}

export const getDateRange = (dateOne, dateTwo) => {
    let startDate = new Date(dateOne);
    let endDate = new Date(dateTwo);

    let dateList = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        dateList.push(`${year}-${month}-${day}`);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
}