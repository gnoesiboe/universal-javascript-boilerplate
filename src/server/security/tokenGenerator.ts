import jwt from 'jsonwebtoken';
import { Account } from '../..//common/model/Account';

export const PRIVATE_KEY: string = '33b3142684b828d74ef413543d5ee134e376986d';

export function createAccountToken(account: Account): string {
    const accountAsString: string = JSON.stringify(account);

    return jwt.sign(accountAsString, PRIVATE_KEY);
}
