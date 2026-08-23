export function createTypefullyUrl(
  extraParams: Record<string, string> = {},
  pathname?: string,
): string {
  const params = {
    ref: "minimal-twitter",
    utm_source: "minimal-twitter-extension",
    ...extraParams,
  };
  const url = new URL(`https://typefully.com/${pathname || ""}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}
