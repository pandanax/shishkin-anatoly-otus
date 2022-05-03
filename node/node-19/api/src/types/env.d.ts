declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONN_STRING: string
            DB_NAME: string
            USER_COLLECTION_NAME: string
            NODE_ENV: 'development' | 'production';
            PORT?: string;
        }
    }
}

export {}
