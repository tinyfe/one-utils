export default function randomColor() {
  const color = ((Math.random() * 0xffffff) << 0).toString(16);
  return `#${color}`;
}
