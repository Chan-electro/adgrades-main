/*
 * Minimal Zod-like runtime + type helpers to support the portfolio dataset without shipping the full
 * dependency. Only implements the subset of APIs we rely on inside this project.
 */

type ParseCtx = {
  path: string[];
};

class Schema<T> {
  constructor(protected readonly parser: (input: unknown, ctx: ParseCtx) => T) {}

  parse(input: unknown): T {
    return this.parser(input, { path: [] });
  }

  parseWithPath(input: unknown, path: string[]): T {
    return this.parser(input, { path });
  }

  optional(): Schema<T | undefined> {
    return new Schema((input, ctx) => {
      if (input === undefined) return undefined;
      return this.parser(input, ctx);
    });
  }

  default(value: T): Schema<T> {
    return new Schema((input, ctx) => {
      if (input === undefined) return value;
      return this.parser(input, ctx);
    });
  }
}

function makeError(message: string, ctx: ParseCtx) {
  const location = ctx.path.length > 0 ? ` at ${ctx.path.join(".")}` : "";
  return new TypeError(`${message}${location}`);
}

function string() {
  return new Schema<string>((input, ctx) => {
    if (typeof input !== "string") {
      throw makeError("Expected string", ctx);
    }
    return input;
  });
}

function number() {
  return new Schema<number>((input, ctx) => {
    if (typeof input !== "number" || Number.isNaN(input)) {
      throw makeError("Expected number", ctx);
    }
    return input;
  });
}

function enumType<const Values extends readonly [string, ...string[]]>(values: Values) {
  const set = new Set<string>(values);
  return new Schema<Values[number]>((input, ctx) => {
    if (typeof input !== "string" || !set.has(input)) {
      throw makeError(`Expected one of: ${values.join(", ")}`, ctx);
    }
    return input as Values[number];
  });
}

function array<S extends Schema<unknown>>(schema: S) {
  return new Schema<Array<Infer<S>>>((input, ctx) => {
    if (!Array.isArray(input)) {
      throw makeError("Expected array", ctx);
    }
    return input.map((item, index) => schema.parseWithPath(item, [...ctx.path, String(index)]));
  });
}

function record<S extends Schema<unknown>>(schema: S) {
  return new Schema<Record<string, Infer<S>>>((input, ctx) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      throw makeError("Expected record", ctx);
    }
    const result: Record<string, Infer<S>> = {};
    for (const [key, value] of Object.entries(input)) {
      result[key] = schema.parseWithPath(value, [...ctx.path, key]);
    }
    return result;
  });
}

function object<Shape extends Record<string, Schema<unknown>>>(shape: Shape) {
  type Output = { [Key in keyof Shape]: Infer<Shape[Key]> };
  return new Schema<Output>((input, ctx) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      throw makeError("Expected object", ctx);
    }
    const result: Partial<Output> = {};
    for (const key of Object.keys(shape)) {
      const schema = shape[key];
      const value = (input as Record<string, unknown>)[key];
      result[key as keyof Shape] = schema.parseWithPath(value, [...ctx.path, key]) as Output[keyof Shape];
    }
    return result as Output;
  });
}

export type Infer<S extends Schema<unknown>> = S extends Schema<infer Output> ? Output : never;

export const z = {
  string,
  number,
  enum: enumType,
  array,
  record,
  object,
};

export type ZodSchema<T> = Schema<T>;

export type infer<S extends Schema<unknown>> = Infer<S>;

/* eslint-disable @typescript-eslint/no-namespace */
export namespace z {
  export type infer<S extends Schema<unknown>> = Infer<S>;
}
/* eslint-enable @typescript-eslint/no-namespace */
