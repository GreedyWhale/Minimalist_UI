interface requestOptions {
  method: string;
  action: string;
  name: string;
  file: File;
}
interface CustomError extends Error {
  status: number,
  method: string,
  url: string
}

export { requestOptions, CustomError }