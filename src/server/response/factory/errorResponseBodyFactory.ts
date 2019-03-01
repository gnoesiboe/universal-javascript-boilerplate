import { createResponseBody } from './responseBodyFactory';
import { ErrorResponseResult } from '../../../common/response/types';

export const createNotFoundResponseBody = (message: string) => {
    return createResponseBody<ErrorResponseResult>({ message }, false);
};
