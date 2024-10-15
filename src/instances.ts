class OpenRouterErrorResponse {
  error: {
    message: string;
    code: number;
  };

  user_id?: string;

  constructor(data: { error: {
    message: string;
    code: number;
  }; user_id?: string; }) {
    this.error = data.error;
    this.user_id = data.user_id;
  };
}

export { OpenRouterErrorResponse };
