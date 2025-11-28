export type Status = 'idle' | 'loading' | 'loaded' | 'error';

type ExcludeZero<T extends number> = T extends 0 ? never : T;
export type NonZeroNumber = ExcludeZero<number>;

export type ThunkArgs = {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
};
