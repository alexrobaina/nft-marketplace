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
import content from '../../../content/meta.json';
import styles from './Create.module.scss';
import Card from 'components/common/Card';

const FORM_STATE = {
  name: '',
  email: '',
  image: '',
  twitter: '',
  instagram: '',
  profileBio: '',
  socialMediaLinks: [],
};

const Create: NextPage = () => {
  const { isLoading, isError, data, error } = useQuery('user', () => {
    return axios.get('http://localhost:3000/api/user/getUser');
  });
  const [nftURI, setNftURI] = useState('');
  const [hasURI, setHasURI] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const formik = useFormik({
    initialValues: FORM_STATE,
    onSubmit: async (values: any) => {
      console.log(values);
    },
  });

  const { handleChange, handleSubmit, values } = formik;

  if (session === null) {
    router.push('/');
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut', delay: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.info}>
          <div>
            <BaseText bold size={20} text="Create NFT Metadata" />
            <BaseText
              thin
              text="This information will b displaayeed publiicaly so be careful what yoou share."
            />
          </div>
        </div>
        <div className={styles.containerForm}>
          <div>
            <BaseInput
              inputName="name"
              label="Name"
              placeholder="My NFT name"
              handleChange={handleChange}
              // defaultValue={values.name || ''}
            />
            <BaseInput
              marginTop={20}
              inputName="description"
              label="Description"
              handleChange={handleChange}
              placeholder="Enter NFT description"
              // defaultValue={user?.email || ''}
            />
          </div>
          <div>
            <Card
              marginTop={30}
              name={content[0].name}
              image={content[0].image}
              category={content[0].category}
              description={content[0].description}
              price={content[0].attributes[2].value}
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

export default Create;
