export const activityEquals = (a, b) => {
    return a.type === b.type && a.duration === b.duration && a.description === b.description;
}