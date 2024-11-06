import { Operacoes } from './operacoes';

describe('Operacoes', () => {
  it('soma should return the sum of two positive numbers', () => {
    expect(Operacoes.soma(2, 3)).toBe(5);
  });

  it('soma should return the sum of a positive and a negative number', () => {
    expect(Operacoes.soma(5, -3)).toBe(2);
  });

  it('soma should return the sum of two negative numbers', () => {
    expect(Operacoes.soma(-2, -3)).toBe(-5);
  });

  it('soma should return the sum when one of the numbers is zero', () => {
    expect(Operacoes.soma(0, 5)).toBe(5);
    expect(Operacoes.soma(5, 0)).toBe(5);
  });

  it('soma should return zero when both numbers are zero', () => {
    expect(Operacoes.soma(0, 0)).toBe(0);
  });
});
