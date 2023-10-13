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

export function minPriceCalculator(prices) {
    let min = prices[0].price;
    prices.forEach((element) => {
        min = Math.min(min, element.price);
    });
    return min;
}
export function maxPriceCalculator(prices) {
    let max = prices[0].price;
    prices.forEach((element) => {
        max = Math.max(max, element.price);
    });
    return max;
}

export function discountCalculator(price, discount) {
    return price - price * (discount / 100);
}