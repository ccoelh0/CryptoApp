class ApiError extends Error {
  public statusCode: number;

  public code: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || "";
  }
}

export default ApiError;
