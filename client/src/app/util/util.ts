export function getCookie(key: string) {
    const value = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return value ? value.pop() : "";
}

export function currencyFormat(amount: number, symbol: string, isStart : boolean = true) {
    return isStart? `${symbol} ${amount.toFixed(2)}` : `${amount} ${symbol}`
}