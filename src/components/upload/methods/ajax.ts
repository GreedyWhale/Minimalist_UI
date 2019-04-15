import { requestOptions, CustomError } from "./ajax.d";

function getError(options: requestOptions, xhr: XMLHttpRequest): CustomError {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `使用 ${options.method} 请求 ${
      options.action
    } 失败。XMLHttpRequest.status：${xhr.status}`;
  }

  const err: any = new Error(msg);
  err.status = xhr.status;
  err.method = options.method;
  err.url = options.action;
  return err;
}

function getResponse(xhr: XMLHttpRequest): any {
  const response = xhr.responseText || xhr.response;
  if (!response) {
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
        reject(getError(options, xhr));
      }
      resolve(getResponse(xhr));
    };
    xhr.onerror = () => {
      reject(getError(options, xhr));
    };
    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e: ProgressEvent) {
        options.onProgress(e);
      };
    }
    const formData = new FormData();
    formData.append(options.name, options.file);
    if (options.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }
    const headers: any = options.headers || {};
    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
    xhr.send(formData);
  });
}

export default { ajax };
