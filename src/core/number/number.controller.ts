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
  const absNum = Math.abs(num);
  const digits = absNum.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === absNum;
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

  if (isNaN(num)) {
    return res.status(400).json({ number: numStr, error: true });
  }

  const absNum = Math.abs(num);
  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  const digitSum = absNum
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);

  try {
    const [funFactResponse] = await Promise.all([
      axios.get(`http://numbersapi.com/${num}/math`),
    ]);

    return res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: num < 0 ? `-${digitSum}` : digitSum, // Append "-" for negatives
      fun_fact: funFactResponse.data,
    });
  } catch (error) {
    return res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: num < 0 ? `-${digitSum}` : digitSum,
      fun_fact: "No fun fact available",
    });
  }
};

export { classifyNumber };
