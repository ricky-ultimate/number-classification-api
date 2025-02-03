import axios from "axios";
import { Request, Response } from "express";

const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isArmstrong = (num: number): boolean => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === num;
};

const isPerfect = (num: number): boolean => {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

const classifyNumber = async (req: Request, res: Response) => {
  const numStr = req.query.number as string;
  const num = parseInt(numStr, 10);

  // Handle invalid input
  if (isNaN(num)) {
    return res.status(400).json({ number: numStr, error: true });
  }

  // Determine properties
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  try {
    // Use Promise.all for parallel execution
    const [funFactResponse] = await Promise.all([
      axios.get(`http://numbersapi.com/${num}/math`),
    ]);

    return res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0),
      fun_fact: funFactResponse.data,
    });
  } catch (error) {
    return res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0),
      fun_fact: "No fun fact available",
    });
  }
};

export { classifyNumber };
