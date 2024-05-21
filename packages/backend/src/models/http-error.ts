export class HttpError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    // 유지 보수 및 디버깅을 위한 스택 추적 설정
    // Object.setPrototypeOf(this, new.target.prototype);
    // Error.captureStackTrace(this);
  }
}
