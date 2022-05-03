export interface Storage {
    setToken: (token: string) => void
    getToken: () => string
    removeToken: () => void
}
const TOKEN_KEY: 'token' = 'token';
export const storage: Storage = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    getToken() {
        return String(localStorage.getItem(TOKEN_KEY))
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
}
