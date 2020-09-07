import { React, on } from './domdom';
import { MDCRipple } from '@material/ripple';
import { OptChildren } from '@eirikb/domdom';
import { MDCLinearProgress } from '@material/linear-progress';
import { Domode } from '@eirikb/domdom/dist/types';

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

export const ButtonLink: (_: {
  url: string;
  title: string;
  target: string;
}) => void = ({ url, title, target }) => (
  <a
    class="mdc-button mdc-button--compact mdc-card__action"
    target={target}
    href={url}
  >
    {title}
  </a>
);

export const Card: (
  _: {
    title: string;
    subTitle: string;
    actions: Domode[];
    imageUrl?: string;
  },
  __: { children: OptChildren }
) => void = ({ title, subTitle, actions, imageUrl }, { children }) => (
  <div class="mdc-card">
    <div class="mdc-card__primary-action" tabindex="0">
      <div
        class="mdc-card__media mdc-card__media--square"
        style={`background-image: url("${imageUrl}")`}
      />
      <div class="demo-card__primary">
        <h2 class="demo-card__title mdc-typography mdc-typography--headline6">
          {title}
        </h2>
        <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">
          {subTitle}
        </h3>
      </div>
      <div class="demo-card__secondary mdc-typography mdc-typography--body2">
        {children}
      </div>
    </div>
    <div class="mdc-card__actions">
      <div class="mdc-card__action-buttons">{actions}</div>
    </div>
  </div>
);
