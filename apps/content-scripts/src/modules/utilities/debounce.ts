export default function debounce<Args extends readonly unknown[]>(
  func: (...args: Args) => void,
  timeout = 300,
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
