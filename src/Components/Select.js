import React, { useState } from 'react';
import classnames from 'classnames';
import { defaultConfig } from './config.js';
import chevronUpDown from './icons/chevron-up-down.svg';
import spinnerIcon from './icons/spinner.svg';

const SelectedOption = ({ onClick, icon, label, isLoading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="selected-option"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-labelledby="listbox-label"
    >
      <span className="icon">
        {!isLoading && icon && <img src={icon} alt={label} />}
        {isLoading && (
          <img className="loading" src={spinnerIcon} alt="Loading..." />
        )}
        <span className="label">{label}</span>
      </span>
      <span className="arrow-icon">
        <img alt="Open" src={chevronUpDown} />
      </span>
    </button>
  );
};

export const Select = ({
  config = defaultConfig,
  options,
  selectedIcon,
  selectedLabel,
  selectedValue,
  isLoading,
  onChange,
}) => {
  const [listOpened, setListOpened] = useState(false);
  const { styles: { select: { mainClass, className } = {} } = {} } = config;
  if (isLoading) {
    return (
      <div className={classnames(mainClass, className)}>
        <SelectedOption isLoading={isLoading} label="Loading" />
      </div>
    );
  }
  const onSelect = (value) => {
    setListOpened(false);
    onChange(value);
  };
  const onBlur = (ev) => {
    if (ev.relatedTarget) {
      ev.stopPropagation();
      return;
    }
    setListOpened(false);
  };
  return (
    <div className={classnames(mainClass, className)} onBlur={onBlur}>
      <SelectedOption
        icon={selectedIcon}
        onClick={() => setListOpened(!listOpened)}
        label={selectedLabel}
      />
      <ul
        className={classnames('list-container', { 'list-hidden': !listOpened })}
        tabIndex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant={`listbox-option-${selectedValue}`}
      >
        {options.map(({ icon, value, label }) => (
          <li
            key={value}
            className={classnames('list-option', {
              highlight: value === selectedValue,
            })}
            id={`listbox-option-${value}`}
            role="option"
            onClick={() => onSelect(value)}
          >
            <div className="content">
              {icon && <img src={icon} alt={label} />}
              <span className="label">{label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
