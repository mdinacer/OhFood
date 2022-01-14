import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import {createBrowserHistory} from "history";
import {HistoryRouter} from "./app/layout/HistoryRouter";
import {Provider} from "react-redux";
import {store} from "./app/store/configureStore";
import "./styles.scss";

export const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <HistoryRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HistoryRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
