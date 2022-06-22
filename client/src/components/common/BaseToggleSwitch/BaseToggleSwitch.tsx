import { FC } from 'react';
import c from 'classnames';
import styles from './BaseToggleSwitch.module.scss';

interface Props {
  checked: boolean;
  handleCheck: Function;
}

const BaseToggleSwitch: FC<Props> = ({ checked, handleCheck }) => {
  return (
    <label className={styles.switch}>
      <input onChange={() => handleCheck()} checked={checked} type="checkbox" />
      <span className={c(styles.slider, styles.round)}></span>
    </label>
  );
};

export default BaseToggleSwitch;
