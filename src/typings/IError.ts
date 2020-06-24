export interface IErrorProd {
  code: string;
  message: string;
  method: string[];
}

export interface IErrorDev {
  message: string;
  path: string[];
  extensions: {
    code: string;
  };
}
