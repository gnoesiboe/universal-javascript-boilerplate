import { AccountProfileResponseResult } from '../../../common/response/types';
import { Account } from '../../../common/model/Account';
import { createResponseBody } from './responseBodyFactory';

export const createAccountProfileResponseBody = (account: Account) => {
    const result = {
        id: account.id,
        email: account.email,
        userId: account.userId,
    };

    return createResponseBody<AccountProfileResponseResult>(result);
};
