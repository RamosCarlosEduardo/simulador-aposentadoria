export function realTax (tax, inflaction) {
    return ((1+tax)/(1+inflaction)) - 1
}