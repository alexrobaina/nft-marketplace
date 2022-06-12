import { FC, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { VARIANTS_OPACITY } from '../../../constants/animation';
import styles from './Layout.module.scss';
import Header from 'components/Header';

interface Props {
  testID: string;
  children?: ReactElement;
}

const Layout: FC<Props> = ({ children, testID }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={styles.layout}
      variants={VARIANTS_OPACITY}
      transition={{ ease: 'easeOut', delay: 0.2 }}
    >
      <Header />
      <div data-testid={`layout-${testID}`} className={styles.row}>
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;
