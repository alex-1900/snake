export function makeRandom(min: number, max: number): number {
  const range: number = max - min;   
  const rand: number = Math.random();   
  return(min + Math.round(rand * range));  
}
