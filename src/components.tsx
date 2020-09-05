import { React, on } from './domdom';
import { MDCRipple } from '@material/ripple';
import { OptChildren } from '@eirikb/domdom';
import { MDCLinearProgress } from '@material/linear-progress';

export const Button: (
  _: { onClick: () => void },
  __: { children: OptChildren }
) => void = ({ onClick }, { children }) => {
  const button = (
    <button class="mdc-button" onClick={onClick}>
      <span class="mdc-button__label">{children}</span>
    </button>
  );

  new MDCRipple(button);
  return button;
};

export const Grid: (_: any, opts: { children: OptChildren }) => void = (
  {},
  { children }
) => (
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">{children}</div>
  </div>
);

export const Cell: (
  _: { span: number },
  __: { children: OptChildren }
) => void = ({ span }, { children }) => (
  <div class={`mdc-layout-grid__cell mdc-layout-grid__cell--span-${span}`}>
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
      <section class="mdc-card__media">
        <img
          class="mdc-card__media-item mdc-card__media-item--2x"
          src={media}
        />
      </section>
    ) : (
      ''
    )}
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">{title}</h1>
      <h2 class="mdc-card__subtitle">{subtitle}</h2>
    </section>
    <section class="mdc-card__actions">{actions}</section>
  </div>
);

export const Progress: (_: { path: string; determinate: boolean }) => void = ({
  path,
  determinate,
}) => {
  const element = (
    <div class="mdc-linear-progress">
      <div class="mdc-linear-progress__buffer">
        <div class="mdc-linear-progress__buffer-bar"></div>
        <div class="mdc-linear-progress__buffer-dots"></div>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  );
  const linearProgress = new MDCLinearProgress(element);
  linearProgress.determinate = determinate;
  on(`!+* ${path}`, progress => (linearProgress.progress = progress)).attach(
    element
  );
  return element;
};
