import { FC } from 'react';
import c from 'classnames';
import styles from './BaseText.module.scss';

interface Props {
  text?: string;
  size?: number;
  color?: string;
  bold?: boolean;
  thin?: boolean;
  testId?: string;
  center?: boolean;
  medium?: boolean;
  regular?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

const BaseText: FC<Props> = ({
  size,
  testId,
  text = 16,
  marginTop,
  marginLeft,
  marginRight,
  thin = true,
  marginBottom,
  color = '',
  bold = false,
  medium = false,
  center = false,
  regular = false,
}) => {
  return (
    <div
      style={{
        color,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        fontSize: size,
      }}
      data-testid={`text-${testId}`}
      className={c(
        styles.text,
        bold && styles.bold,
        thin && styles.thin,
        center && styles.center,
        medium && styles.medium,
        regular && styles.regular,
      )}
    >
      {text}
    </div>
  );
};

export default BaseText;
