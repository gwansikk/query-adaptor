export type ElementTypeof<T> = T extends Array<infer U> ? U : never;
