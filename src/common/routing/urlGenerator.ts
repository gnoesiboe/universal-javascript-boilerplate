export const DOMAIN = `http://localhost:3000`;

const API_PREFIX = '/api';

export const AUTHENTICATION_PREFIX = `${API_PREFIX}/authentication`;

export function createApiLoginPath(): string {
    return `${AUTHENTICATION_PREFIX}/login`;
}

export function createApiProfilePath(): string {
    return `${API_PREFIX}/profile`;
}
