import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query'
import BaseLayout from './layouts/BaseLayout/BaseLayout';
import './App.css';

const queryClient = new QueryClient()

function App() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <div className="App">
                        <BaseLayout />
                    </div>
                </BrowserRouter>
            </QueryClientProvider>
        </React.StrictMode>
    );
}

export default App;
