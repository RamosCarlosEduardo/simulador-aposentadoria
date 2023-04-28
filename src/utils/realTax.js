export function realTax (i, inflaction) {
    return ((1+i)/(1+inflaction)) - 1
}