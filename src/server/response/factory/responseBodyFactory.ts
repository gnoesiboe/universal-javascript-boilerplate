import { Response } from './../../../common/response/types';

export function createResponseBody<R, M = {}>(
    result: R,
    success: boolean = true,
    meta?: M
): Response<R, M> {
    return { result, success, meta };
}
