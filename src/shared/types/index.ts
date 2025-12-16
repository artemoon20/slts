type ResponseModel<T> = {
  data: T;
  message?: string;
  status?: number;
  error?: string;
};

export type { ResponseModel };
