import { on, React } from "../domdom";
import Books from "./Books";
import Update from "./Update";

export default (
  <div>
    {on("route", (route) => {
      switch (route) {
        case "books":
          return <Books />;
        case "update":
          return <Update />;
        default:
          return "?";
      }
    })}
  </div>
);
