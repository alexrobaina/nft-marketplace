import { FC, useState } from 'react';
import ThemeChange from './components/ThemeChange';
import BaseTitle from '../../components/common/BaseTitle';
import c from 'classnames';
import ToggleMenu from 'components/common/ToggleMenu';
import { AiOutlineProfile } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header: FC = () => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const activeLink = (href: string) => router.asPath === href;

  return (
    <div data-testid="header-app" className={styles.header}>
      <div className={styles.navigationContainer}>
        <BaseTitle size={32} title="Saifu" />
        <Link href="/">
          <div className={c(activeLink('/') && styles.activeLink, styles.linkNavigation)}>
            Marketplace
          </div>
        </Link>
        <Link href="/nft/create">
          <p
            className={c(
              activeLink('/nft/create') && styles.activeLink,
              styles.linkNavigation,
            )}
          >
            Create
          </p>
        </Link>
      </div>
      <div className={styles.containerActions}>
        <div onClick={() => setOpenMenu(!isOpenMenu)} className={styles.avatarGradient}>
          <ToggleMenu isOpen={isOpenMenu}>
            <div className={styles.containarMenu}>
              <Link href="/profile">
                <div className={styles.buttonMenu}>
                  <AiOutlineProfile size={30} />
                  Profile
                </div>
              </Link>
              <Link href="/settings">
                <div className={styles.buttonMenu}>
                  <IoMdSettings size={25} />
                  Settings
                </div>
              </Link>
            </div>
          </ToggleMenu>
        </div>
        <ThemeChange />
      </div>
    </div>
  );
};

export default Header;
