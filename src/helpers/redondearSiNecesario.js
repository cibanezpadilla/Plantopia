
export function redondearSiNecesario(numero) {
    if (Number.isInteger(numero)) {
      return numero
    } else {
      return parseFloat(numero.toFixed(1))
    }
  }