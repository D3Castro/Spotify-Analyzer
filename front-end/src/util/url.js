export function getUrlParams() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const vars = {};
  for (const [key, value] of urlSearchParams.entries()) {
    vars[key] = value;
  }
  return vars;
}

export function removeHashParams(value) {
  if (typeof value !== 'string') return '';
  const split = value.split('#');
  return split[0];
}