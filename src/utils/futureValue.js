export function fv (i, nper, pmt, pv = null, type = null) {
    let hasPv = !isNaN(pv) ? true : false
    let isPrePaid = !!type

    let numerador = ((1+i)**nper)-1
    let vf = pmt * (numerador/i)
    
    if (isPrePaid) {vf *= (1 + i)}
    if (hasPv) {vf += pv * (1 + i)**nper}
    
    return vf
}