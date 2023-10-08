export const dateFormat = (date) => {
    if (!date) return "";
    const newDate =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
        +
        "/"
        +
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1)
        // +
        // "/"
        // +
        // date.getFullYear()
        +
        " "
        +
        (date.getHours() + 1 < 10 ? "0" + date.getHours() : date.getHours())
        +
        ":"
        +
        (date.getMinutes() + 1 < 10 ? "0" + date.getMinutes() : date.getMinutes());
    return newDate;
};