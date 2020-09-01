import { React } from './domdom';
import { MDCRipple } from '@material/ripple';
import { OptChildren } from '@eirikb/domdom';

export const Button: (
  _: { onClick: () => void },
  __: { children: OptChildren }
) => void = ({ onClick }, { children }) => {
  const button = (
    <button className="mdc-button" onClick={onClick}>
      <span className="mdc-button__label">{children}</span>
    </button>
  );

  new MDCRipple(button);
  return button;
};

export const Grid: (_: any, opts: { children: OptChildren }) => void = (
  {},
  { children }
) => (
  <div className="mdc-layout-grid">
    <div className="mdc-layout-grid__inner">{children}</div>
  </div>
);

export const Cell: (
  _: { span: number },
  __: { children: OptChildren }
) => void = ({ span }, { children }) => (
  <div className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${span}`}>
    {children}
  </div>
);

export const Card: (_: {
  media: string;
  title: string;
  subtitle: string;
  actions: string;
}) => void = ({ media, title, subtitle, actions }) => (
  <div class="mdc-card">
    {media ? (
      <section className="mdc-card__media">
        <img
          className="mdc-card__media-item mdc-card__media-item--2x"
          src={media}
        />
      </section>
    ) : (
      ''
    )}
    <section class="mdc-card__primary">
      <h1 className="mdc-card__title mdc-card__title--large">{title}</h1>
      <h2 className="mdc-card__subtitle">{subtitle}</h2>
    </section>
    <section class="mdc-card__actions">{actions}</section>
  </div>
);
