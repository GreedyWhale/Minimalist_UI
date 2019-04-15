interface requestOptions {
  method: string;
  action: string;
  name: string;
  file: File;
  onProgress: (e: ProgressEvent) => void;
  headers?: Object;
  withCredentials?: boolean;
}
interface CustomError extends Error {
  status: number;
  method: string;
  url: string;
}

export { requestOptions, CustomError };
