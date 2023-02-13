import { render } from "solid-js/web";
import "__mocks__";
import App from "./app";
import "./assets/main.css";

render(() => <App />, document.getElementById("root") as HTMLElement);
