import { Interceptor } from "./types";

export const logging = (interceptor: Promise<any>): Promise<any> => {
  return (
    interceptor ||
    console.warn("[chain]", "interceptor is not returning a response")
  );
};
