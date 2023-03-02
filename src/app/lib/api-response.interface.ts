export type ErrorObject = {
  type: string;
  message: string;
}

export type ApiResponse = {
  error: ErrorObject | null;
  data: object | null;
}
