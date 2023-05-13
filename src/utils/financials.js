export function realTax (i, inflaction) {
    return ((1+i)/(1+inflaction)) - 1
}

export function fv (i, nper, pmt, pv = null, type = null) {
    let hasPv = !isNaN(pv) ? true : false
    let isPrePaid = !!type

    let numerador = ((1+i)**nper)-1
    let vf = pmt * (numerador/i)
    
    if (isPrePaid) {vf *= (1 + i)}
    if (hasPv) {vf += pv * (1 + i)**nper}
    
    return vf
}

export function nper (i, vf, pmt, pv = null, type = null) {
    return (Math.log(i * vf + pmt) - Math.log(i * pv + pmt))/Math.log(1 + i)
}

export function taxYearToMonth (anualTax){
    return Math.pow(1 + anualTax, 1/12) - 1
}