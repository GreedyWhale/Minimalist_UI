import { requestOptions, CustomError } from "./ajax.d";

function getError(options: requestOptions, xhr: XMLHttpRequest): CustomError {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `使用 ${options.method} 请求 ${options.action} 失败。响应状态码：${xhr.status}`;
  }

  const err: any = new Error(msg);
  err.status = xhr.status;
  err.method = options.method;
  err.url = options.action;
  return err;
}

function getResponse(xhr: XMLHttpRequest): any {
  const response = xhr.responseText || xhr.response;
  if(!response) {
    return response;
  }
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
}
function ajax(options: requestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.action, true);
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(getError(options, xhr))
      }
      resolve(getResponse(xhr))
    }
    xhr.onerror = () => {
      reject(getError(options, xhr))
    }
    const formData = new FormData();
    formData.append(options.name, options.file);
    xhr.send(formData);
  })
}

export default ajax;