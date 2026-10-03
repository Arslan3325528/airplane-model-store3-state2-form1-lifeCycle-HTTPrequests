//! Приймає два числа a і b та повертає випадкове число в диапазоні від a до b включно

export function  generatesRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
