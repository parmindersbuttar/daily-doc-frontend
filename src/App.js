import React from 'react';
import Root from './routes'
import { StateProvider } from './state';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from './state/auth/reducers';
import reducers from "./state/reducers";

const App = () => {
    const initialState = {
        auth: AUTH_INITIAL_STATE
    }
    return (
        <StateProvider initialState={initialState} reducer={reducers}>
            <Root />
        </StateProvider>
    );
}

export default App;