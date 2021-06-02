export const getAVD = (p: number, isFirst = true): number => {
  if (!isFirst) return p * 0.15
  if (p <= 2000000) return 100
  if (p > 2000000 && p <= 2351760) return 100 + (p - 2000000) * 0.1
  if (p > 2351760 && p <= 3000000) return p * 0.015
  if (p > 3000000 && p <= 3290320) return 45000 + (p - 3000000) * 0.1
  if (p > 3290320 && p <= 4000000) return p * 0.0225
  if (p > 4000000 && p <= 4428570) return 90000 + (p - 4000000) * 0.1
  if (p > 4428570 && p <= 6000000) return p * 0.03
  if (p > 6000000 && p <= 6720000) return 180000 + (p - 6000000) * 0.1
  if (p > 6720000 && p <= 20000000) return p * 0.0375
  if (p > 20000000 && p <= 21739120) return 750000 + (p - 20000000) * 0.1
  if (p > 21739120) return p * 0.0425
}

export const getContractFee = (p: number): number => {
  let c = 3000
  if (p <= 100000) c = 800
  if (p > 100000 && p <= 250000) c = 1000
  if (p > 250000 && p <= 500000) c = 1250
  if (p > 500000 && p <= 1000000) c = 1500
  if (p > 1000000 && p <= 2000000) c = 1750
  if (p > 2000000 && p <= 5000000) c = 2000
  if (p > 5000000 && p <= 10000000) c = 2500
  return c
}

export const getLoanLawerFee = (p: number): number => {
  let c = 0
  if (p <= 100000) c = 1800
  if (p > 100000 && p <= 150000) c = 2450
  if (p > 150000 && c <= 200000) c = 3100
  if (p > 200000 && p <= 250000) c = 3750
  if (p > 250000 && p <= 500000) c = 3750 + (Math.ceil((p - 250000) / 10000)) * 100
  if (p > 500000 && p <= 1000000) c = 6250 + (Math.ceil((p - 500000) / 10000)) * 75
  if (p > 1000000 && p <= 5000000) c = 10000 + (Math.ceil((p - 1000000) / 10000)) * 50
  if (p > 5000000) c = 30000 + (Math.ceil((p - 5000000) / 10000)) * 25
  return c
}
