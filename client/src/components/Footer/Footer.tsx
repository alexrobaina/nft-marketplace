import { FC } from 'react';
import { BsGithub } from 'react-icons/bs';
import { AiFillLinkedin, AiOutlineFileProtect } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  const handleLink = (link: string) => {
    window.open(link);
  };

  return (
    <div data-testid="footer-app" className={styles.footer}>
      <div
        className={styles.link}
        onClick={() =>
          handleLink(
            'https://docs.google.com/document/d/1pmNKkARCLqnc4-q_jguSTOfsm4X2BW6BCbAzFUijxgY/edit?usp=sharing',
          )
        }
      >
        <AiOutlineFileProtect size={30} />
      </div>
      <div
        className={styles.link}
        onClick={() => handleLink('https://github.com/alexrobaina')}
      >
        <BsGithub size={30} />
      </div>
      <div
        className={styles.link}
        onClick={() => handleLink('https://www.instagram.com/alexrobaina')}
      >
        <FiInstagram size={30} />
      </div>
      <div
        className={styles.link}
        onClick={() => handleLink('https://www.linkedin.com/in/alexrobaina')}
      >
        <AiFillLinkedin size={30} />
      </div>
    </div>
  );
};

export default Footer;
