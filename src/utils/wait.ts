export function wait(millisecond: number) {
  return new Promise((res, _) => {
    setTimeout(res, millisecond);
  });
}
