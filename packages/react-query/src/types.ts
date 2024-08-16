export type ElementTypeof<T extends Array<unknown>> = T extends Array<infer U> ? U : never;
