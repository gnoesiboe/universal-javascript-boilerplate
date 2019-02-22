import jwt from 'jsonwebtoken';
import { Account } from '../..//common/model/Account';

export const PRIVATE_KEY: string = 'Testasdflkasjdfsdf';

export function createAccountToken(account: Account): string {
    const accountAsString: string = JSON.stringify({
        ...account,
        exp: '1d',
    });

    return jwt.sign(accountAsString, PRIVATE_KEY);
}
