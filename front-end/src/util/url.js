export function getUrlParams() {
  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

export function removeHashParams(value) {
  if (typeof value !== 'string') return '';
  const split = value.split('#');
  return split[0];
}