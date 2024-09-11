export const formataBRL = (value) => {
    const formatador = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatador.format(value);
};