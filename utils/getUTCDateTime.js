const getUTCDateTime = () => {
    const currentDate = new Date();
    return new Date(Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        currentDate.getUTCHours(),
        currentDate.getUTCMinutes(),
        currentDate.getUTCSeconds(),
        currentDate.getUTCMilliseconds()
    ))
}

export default getUTCDateTime