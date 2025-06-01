export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: T): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

class DeprecatedResultError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DeprecatedResultError";
    this.message = "This result is deprecated";
  }
}

export const ensureOnlyLastResult = <Params extends unknown[], Result>(
  promisedFn: (...params: Params) => Promise<Result>
) => {
  let lastTaskId: symbol;

  return (...params: Params): Promise<Result> =>
    new Promise<Result>((resolve, reject) => {
      const activeTaskId = Symbol("activeTaskId");
      lastTaskId = activeTaskId;

      promisedFn(...params)
        .then((response) => {
          if (lastTaskId === activeTaskId) {
            resolve(response);
          } else {
            reject(new DeprecatedResultError());
          }
        })
        .catch((err) => {
          if (lastTaskId === activeTaskId) {
            reject(err);
          } else {
            reject(new DeprecatedResultError());
          }
        });
    });
};

export const ignoreDeprectatedResultError =
  (passToNextHandler?: (err: Error) => void) =>
  (err: Error): void => {
    if (err instanceof DeprecatedResultError) {
      return;
    }

    if (passToNextHandler) {
      return passToNextHandler(err);
    }
  };
