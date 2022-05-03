export interface ICommonFetchParams {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {},
}

export interface ISuccessResponse {
    success: boolean,
    data?: {},
    errorMessage: string | typeof Error
}

export interface IErrorResponse {
    success: boolean,
    errorMessage: string | typeof Error
}


//user

export interface IAuthData {
    email: string,
    password: string,
    data?: {}
}

export interface IAuthResult {
    success: boolean,
    errorMessage: string
}

export interface IRegResult {
    success: boolean,
    errorMessage: string
}

export interface IRegData {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

//course

export interface IStdResult {
    success: boolean,
    data?: {},
    errorMessage: string
}

export interface IAddCourseRequestData {
    title: string
    description: string
    id?:string
    access?: string[]
}
