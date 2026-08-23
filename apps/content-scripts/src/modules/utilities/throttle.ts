/*--
- Simple utility throttle function with no return value
- Example usage:
  const throttledFunc = throttle(function() {
      // This function will only be called at most once every 1000 milliseconds
  }, 1000)
--*/
export default function throttle<This, Args extends unknown[]>(
  func: (this: This, ...args: Args) => void,
  limit: number,
): (this: This, ...args: Args) => void {
  let lastFunc: ReturnType<typeof setTimeout> | undefined;
  let lastRan: number | undefined;
  return function (this: This, ...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      const previousRun = lastRan;
      const context = this;
      lastFunc = setTimeout(
        function () {
          if (Date.now() - previousRun >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - previousRun),
      );
    }
  };
}
