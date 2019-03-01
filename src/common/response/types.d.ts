export type Response<Result, Meta = {}> = {
    result: Result;
    success: boolean;
    meta: Meta;
};

export type AccountProfileResponseResult = {
    id: number;
    email: string;
    userId: number;
};

export type AuthenticationLoginResponseResult = {
    token: string;
};

export type ErrorResponseResult = {
    message: string;
};
