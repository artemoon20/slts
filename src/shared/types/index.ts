type ResponseModel<T> = {
    data: T;
    message?: string;
    status?: number;
}

export type { ResponseModel };