//! Cтворює Promise для імітації затримки HTTP-запитів, який стане fulfilled через (ms) мс
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function delay(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
}