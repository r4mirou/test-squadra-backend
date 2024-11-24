export function logText(object: unknown) {
  return JSON.stringify(object);
}

export function logMask(object: unknown) {
  return JSON.stringify(object, (key, value) => {
    if (key === 'password') return '********';
    if (key === 'role') return '********';
    if (key === 'permissions') return '********';

    return value;
  });
}
