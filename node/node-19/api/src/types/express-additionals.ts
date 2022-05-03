export enum EResponseCode {
    OK = 200,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_ERROR = 500,
}

export interface ExtendedErrorInput {
    message: string
    code: EResponseCode
}


export class ExtendedError extends Error {
    code: EResponseCode

    constructor(p: ExtendedErrorInput) {
        super(p.message);
        this.code = p.code
    }
};



