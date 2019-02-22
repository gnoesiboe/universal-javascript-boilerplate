import { Account } from './../../common/model/Account';

const accounts: Account[] = [
    {
        id: 1,
        email: 'gijs.nieuwenhuis@freshheads.com',
        password: 'Test12345',
        userId: 3,
    },
];

export function findAccountWithEmailAndPassword(
    email: string,
    password: string
): Account | undefined {
    return accounts.find(
        cursorAccount =>
            cursorAccount.email === email && cursorAccount.password === password
    );
}

export function findAccountWithId(id: number): Account | undefined {
    return accounts.find(cursorAccount => cursorAccount.id === id);
}
