export interface ErrorObject {
  type: string;
  message: string;
}

export interface ApiResponse {
  error: ErrorObject | null;
  data: object | null;
}
