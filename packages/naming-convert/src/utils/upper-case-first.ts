export function upperCaseFirst(str: string): string {
  return str.replace(/^\w/, s => s.toUpperCase());
}
