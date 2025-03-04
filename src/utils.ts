export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Humanizes numbers in GitHub style.
 * - When less than 1000, display as is
 * - When a multiple of 1000, display as 1k
 * - For every multiple of 1000, when in range `(1000,1050)` round down and display as 1k
 * - For every multiple of 1000, When in range `[1950,2000)` round up and display as 2k
 * - Else, divide by 1000 and display with 1 decimal point precision (1.1k)
 */
export function humanize(number: number): string {
    if (number < 1000)
        return number.toString();

    const rem = number % 1000;
    if (rem === 0 || rem < 50 || rem >= 950)
        return (number / 1000).toFixed(0) + "k";

    return (number / 1000).toFixed(1) + "k";
}
