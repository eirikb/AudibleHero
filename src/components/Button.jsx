// import '@material/button/mdc-button.scss';
// import "@material/button/mdc-button.scss";
import { MDCRipple } from '@material/ripple';

export default ({ children }) => {
  const button = <button className="mdc-button">
    <span className="mdc-button__label">{children}</span>
  </button>;

  new MDCRipple(button);
  return button
}
