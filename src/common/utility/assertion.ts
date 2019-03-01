export function assertIsDefined(value: any, description: string) {
    assert(typeof value !== 'undefined', description);
}

export function assert(value: boolean, errorMessage: string) {
    if (!value) {
        throw new Error(errorMessage);
    }
}
