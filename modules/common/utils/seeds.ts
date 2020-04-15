export function generateBalanceOperationValues(
  min: number,
  max: number,
  rate: number,
) {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
  const fee = Math.round(amount * (rate / 100));
  const net = amount - fee;
  return { amount, fee, net };
}
