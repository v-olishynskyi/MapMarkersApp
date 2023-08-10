export const wait = async (ms: number) =>
  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, ms),
  );
