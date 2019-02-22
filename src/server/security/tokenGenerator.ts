import jwt from 'jsonwebtoken';
import { Account } from '../..//common/model/Account';

export const PRIVATE_KEY: string = 'Testasdflkasjdfsdf';

export function createAccountToken(account: Account): string {
    return jwt.sign(JSON.stringify(account), PRIVATE_KEY);
}
