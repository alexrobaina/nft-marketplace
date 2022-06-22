import React from 'react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useUserSession } from 'hooks/useUserSession';
import content from '../../../content/meta.json';
import BaseText from 'components/common/BaseText';

import styles from './Profile.module.scss';
import BaseButton from 'components/common/BaseButton';

const Profile: NextPage = () => {
  useUserSession('/');

  const { isLoading, isError, data, error } = useQuery('user', () => {
    return axios.get('http://localhost:3000/api/user/getUser');
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.container}
      transition={{ ease: 'easeOut', delay: 0.3 }}
    >
      <div className={styles.collectionListContainer}>
        <BaseText bold size={35} text="Your NFTs" />
        <div className={styles.selector}>
          <BaseText marginTop={50} text="Your Collection" />
        </div>
        <div className={styles.collection}>
          {content.map((nft) => {
            return (
              <div className={styles.nftItem}>
                <img className={styles.nftItemList} src={nft.image} />
                <BaseText size={14} text={nft.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.nftSelected}>
        <img className={styles.nftImageSelected} src={content[0].image} />
        <BaseText size={14} bold text={content[0].name} />
        <BaseText size={12} text={content[0].description} />
        <BaseText marginTop={20} marginBottom={5} text="Information" size={16} bold />
        <div className={styles.nftattributes}>
          <BaseText text="Attack" size={14} medium />
          <BaseText text="10" size={14} medium />
        </div>
        <div className={styles.nftattributes}>
          <BaseText text="Attack" size={14} medium />
          <BaseText text="40" size={14} medium />
        </div>
        <div className={styles.nftattributes}>
          <BaseText text="Attack" size={14} medium />
          <BaseText text="56" size={14} medium />
        </div>
        <div className={styles.actions}>
          <BaseButton text="Download Image" />
          <BaseButton text="Transfer?" />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
