import { useState } from 'react';
import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { MdModeEdit } from 'react-icons/md';
import { useFormik } from 'formik';
import type { NextPage } from 'next';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BaseInput from 'components/common/BaseInput';
import BaseButton from 'components/common/BaseButton';
import BaseText from 'components/common/BaseText';
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import styles from './Settings.module.scss';

const FORM_STATE = {
  name: '',
  email: '',
  image: '',
  twitter: '',
  instagram: '',
  profileBio: '',
  socialMediaLinks: [],
};

const Settings: NextPage = () => {
  const { isLoading, isError, data, error } = useQuery('user', () => {
    return axios.get('http://localhost:3000/api/user/getUser');
  });
  const [nftURI, setNftURI] = useState('');
  const [hasURI, setHasURI] = useState(false);
  const { data: session }: any = useSession();
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const getSocialMediaValue = (socialMedia: Array<any>, network: string): string => {
    let link = '';
    socialMedia.forEach((socialLink: string) => {
      if (network === 'instagram') {
        socialLink.includes('instagram') && (link = socialLink);
      }
      if (network === 'twitter') {
        socialLink.includes('twitter') && (link = socialLink);
      }
    });
    return link;
  };

  const formik = useFormik({
    initialValues: FORM_STATE,
    onSubmit: async (values: any) => {
      console.log(values);
    },
  });

  const { handleChange, handleSubmit } = formik;

  if (session === null) {
    router.push('/');
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }
  console.log(session?.user?.socialMediaLinks);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut', delay: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          {session?.user?.image && (
            <div className={styles.contentAvatar}>
              <Image
                width={150}
                height={150}
                loading="lazy"
                objectFit="contain"
                className={styles.userImage}
                src={`${session?.user?.image}`}
              />
              {/* <div>
                <MdModeEdit size={25} />
              </div> */}
            </div>
          )}
          {/* <label htmlFor="upload-avatar"></label> */}
          {/* {!user?.avatar && <AvatarImageNotFound />} */}
          <div>
            <BaseText bold size={20} text="Settings" />
            <BaseText marginTop={10} thin text="Edit profile." />
          </div>
        </div>
        <div>
          <div>
            <BaseText bold marginTop={35} size={20} text="About you" />
            <BaseInput
              marginTop={20}
              inputName="name"
              label="Display name"
              handleChange={handleChange}
              value={session?.user?.name || ''}
              placeholder="Enter your display name"
            />
            <BaseInput
              disabled
              marginTop={20}
              label="Email"
              inputName="email"
              handleChange={handleChange}
              placeholder="Enter your email"
              value={session?.user?.email || ''}
            />
          </div>
        </div>
        <div>
          <BaseInput
            label="Bio"
            marginTop={20}
            inputName="profileBio"
            handleChange={handleChange}
            value={session?.user?.profileBio || ''}
            placeholder="Tell about yourself in a few words"
          />
        </div>
        <div>
          <BaseText bold marginTop={35} size={20} text="Social media" />
          <div>
            <BaseInput
              marginTop={10}
              label="Twitter"
              inputName="twitter"
              handleChange={handleChange}
              placeholder="Enter your Twitter URL"
              value={getSocialMediaValue(
                session?.user?.socialMediaLinks || [],
                'twitter',
              )}
            />
          </div>
          <div>
            <BaseInput
              marginTop={20}
              inputName="instagram"
              label="Instagram"
              handleChange={handleChange}
              placeholder="Enter your Instagram URL"
              value={getSocialMediaValue(
                session?.user?.socialMediaLinks || [],
                'instagram',
              )}
            />
          </div>
        </div>
        <div>
          <BaseButton marginTop={20} type="submit" text="Save" />
        </div>
      </form>
    </motion.div>
  );
};

export default Settings;
