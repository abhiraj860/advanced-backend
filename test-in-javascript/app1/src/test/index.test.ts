import { describe, expect, it } from '@jest/globals';
import { sum, multiply } from '../index';

describe('Testing sum function', () => {
  it('should sum 1 and 2 correctly', () => {
    const finalAnswer = sum(1, 2);
    expect(finalAnswer).toBe(3);
  });
  it('should return the sum of negative numbers correctly', ()=>{
    const finalAnswer = sum(-1, -2);
    expect(finalAnswer).toBe(-3);
  });
});

describe('Testing multiply function', ()=>{
  it('should multiply 4 and 5', ()=>{
    const finalAnswer = multiply(4, 5);
    expect(finalAnswer).toBe(20);
  });
  it('should multiply negative numbers correctly', ()=>{
    const finalAnswer = multiply(8, -9);
    expect(finalAnswer).toBe(-72);
  });
});