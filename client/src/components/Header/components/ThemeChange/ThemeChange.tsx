import { FC, useCallback, useEffect, useState } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { BsFillEmojiSunglassesFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import styles from './ThemeChange.module.scss';

const DARK = 'dark';
const LIGHT = 'light';

const ThemeChange: FC = () => {
  const { setTheme } = useTheme();
  const [themeState, setThemeState] = useState(LIGHT);

  const handleSetTheme = useCallback((themeSelected: string) => {
    setTheme(themeSelected);
    setThemeState(themeSelected);
  }, []);

  useEffect(() => {
    setTheme(LIGHT);
  }, [setTheme]);

  return (
    <div className={styles.themeButton}>
      {themeState === DARK ? (
        <div onClick={() => handleSetTheme(LIGHT)}>
          <BsFillEmojiSunglassesFill className={styles.icon} size={22} />
        </div>
      ) : (
        <div onClick={() => handleSetTheme(DARK)}>
          <FaRegMoon className={styles.icon} size={20} />
        </div>
      )}
    </div>
  );
};

export default ThemeChange;
