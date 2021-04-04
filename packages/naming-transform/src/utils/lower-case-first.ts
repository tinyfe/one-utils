export function lowerCaseFirst(str: string): string {
  return str.replace(/^\w/, s => s.toLowerCase());
}
