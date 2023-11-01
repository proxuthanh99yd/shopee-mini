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

export class DateFormat {
    static full(date) {
        if (!date) return "";
        date = new Date(date);
        const newDate =
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
            +
            "/"
            +
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1)
            +
            "/"
            +
            date.getFullYear()
            +
            " "
            +
            (date.getHours() + 1 < 10 ? "0" + date.getHours() : date.getHours())
            +
            ":"
            +
            (date.getMinutes() + 1 < 10 ? "0" + date.getMinutes() : date.getMinutes());
        return newDate;
    }
}

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

export function stockCalculator(classify) {
    return classify.reduce((prev, curr) => {
        return Number(prev) + Number(curr.stock)
    }, 0);
}
export function stockAndCartCalculator(id, stock, cartStock) {
    const cart = cartStock.find(cart => cart.classify.id == id);
    if (cart) {
        const cal = Number(stock) - Number(cart.quantity);
        if (cal > 0) {
            return cal
        }
        return 0;
    }
    return undefined;
}

export function checkoutTotalCalculator(items) {
    return items.reduce((prev, curr) => (prev + (curr.quantity * discountCalculator(curr.classify.price, curr.product.discount))), 0).toFixed(2)
}

export function discountOrderTotalCalculator(items) {
    return items.reduce((p, c) => {
        return p + (discountCalculator(c.price, c.product.discount) * c.quantity)
    }, 0).toFixed(2)
}

export function addToCartCalculator(classifyId, stock, myCart) {

    if (Number(stock) === 0) {
        if (classifyId) {
            return "Out of stock"
        } else {
            return "Choose Variation"
        }
    } else if (myCart.length > 0) {
        if (stockAndCartCalculator(classifyId, stock, myCart)) {
            return stockAndCartCalculator(classifyId, stock, myCart)
        }
        if (Number(stock) > 0) {
            return stock
        }
        else {
            return 0;
        }
    } else {
        if (Number(stock) > 0) {
            return stock
        }
        else {
            return 0;
        }
    }
}

export function orderStatus(status) {
    switch (status) {
        case 0:
            return "📦⏳🙄 Wait for confirmation"
        case 1:
            return "📦🚚💨 Is being transported"
        case 2:
            return "📦📝🚶‍♂️ The order has been delivered"
        case 3:
            return "📦❌🙄 Order has been cancelled"
        default:
            return "Unknown status"
    }
}

