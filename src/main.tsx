import { init, set } from "./domdom";
import App from "./views/App";
import "./main.scss";

init(document.body, App);

set("route", "books");
