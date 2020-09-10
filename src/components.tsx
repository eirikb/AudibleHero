import { React, on, set } from './domdom';
import { MDCRipple } from '@material/ripple';
import { MDCSelect } from '@material/select';
import { MDCLinearProgress } from '@material/linear-progress';
import { MDCSwitch } from '@material/switch';
import { OptChildren } from '@eirikb/domdom';
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
    linkUrl: string;
  },
  __: { children: OptChildren }
) => void = ({ title, subTitle, actions, imageUrl, linkUrl }, { children }) => (
  <div class="mdc-card">
    <a class="mdc-card__primary-action" href={linkUrl} target="_blank">
      <div
        class="mdc-card__media mdc-card__media--square"
        style={`background-image: url("${imageUrl}")`}
      />
      <h2 class="mdc-typography mdc-typography--headline6">{title}</h2>
      <h3 class="mdc-typography mdc-typography--subtitle2">{subTitle}</h3>
    </a>
    <div class="mdc-typography mdc-typography--body2">{children}</div>
    <div class="mdc-card__actions">
      <div class="mdc-card__action-buttons">{actions}</div>
    </div>
  </div>
);

export const Select: <T>(_: {
  model: string;
  label: string;
  options: { label: string; value: T }[];
}) => void = ({ model, label, options }) => {
  const element = (
    <div class="mdc-select mdc-select--filled demo-width-class">
      <div class="mdc-select__anchor">
        <span class="mdc-select__ripple"></span>
        <span class="mdc-select__selected-text"></span>
        <span class="mdc-floating-label">{label}</span>
        <span class="mdc-line-ripple"></span>
      </div>

      <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul class="mdc-list">
          {options.map(({ label, value }) => (
            <li class="mdc-list-item" data-value={JSON.stringify(value)}>
              <span class="mdc-list-item__ripple"></span>
              <span class="mdc-list-item__text">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  const select = new MDCSelect(element);
  select.listen('MDCSelect:change', () => {
    try {
      const value = JSON.parse(select.value);
      set(model, value);
    } catch (e) {}
  });
  on(`!+* ${model}`, value => {
    select.value = JSON.stringify(value);
  }).attach(element);
  on(`- ${model}`, () => {
    select.value = '';
  }).attach(element);

  return element;
};

export const Switch: (_: { label: string; model: string }) => void = ({
  label,
  model,
}) => {
  const element = (
    <div class="mdc-switch">
      <div class="mdc-switch__track"></div>
      <div class="mdc-switch__thumb-underlay">
        <div class="mdc-switch__thumb"></div>
        <input
          type="checkbox"
          id="basic-switch"
          class="mdc-switch__native-control"
          role="switch"
          aria-checked="false"
        />
      </div>
    </div>
  );

  const switchControl = new MDCSwitch(element);
  switchControl.listen('change', () => set(model, switchControl.checked));
  on(`!+* ${model}`, value => (switchControl.checked = value)).attach(element);
  on(`- ${model}`, () => (switchControl.checked = false)).attach(element);

  return (
    <div>
      {element}
      <label for="basic-switch">{label}</label>
    </div>
  );
};
