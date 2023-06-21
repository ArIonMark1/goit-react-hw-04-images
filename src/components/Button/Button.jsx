// import { PureComponent } from 'react';
import './Button.scss';

export default function Button({ onConfirm, children }) {
  return (
    <button
      id="LoadMoreButton"
      type="button"
      className="Button"
      onClick={onConfirm}
    >
      {children}
    </button>
  );
}
