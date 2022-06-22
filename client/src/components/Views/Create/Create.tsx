import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BaseInput from 'components/common/BaseInput';
import BaseButton from 'components/common/BaseButton';
import BaseText from 'components/common/BaseText';
import InputUploadImage from 'components/common/InputUploadImage';
import BaseToggleSwitch from 'components/common/BaseToggleSwitch';

import styles from './Create.module.scss';

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
  const [nftURI, setNftURI] = useState('');
  const [hasURI, setHasURI] = useState(false);
  const { data: session }: any = useSession();
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleHasURI = () => {
    setHasURI(!hasURI);
  };

  const formik = useFormik({
    initialValues: FORM_STATE,
    onSubmit: async (values: any) => {
      console.log(values);
    },
  });

  const { handleChange, handleSubmit, setFieldValue } = formik;

  if (session === null) {
    router.push('/');
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
          <div className={styles.switchMeta}>
            <BaseText bold text="Do you have meta data already?" />
            <BaseToggleSwitch handleCheck={handleHasURI} checked={hasURI} />
          </div>
        </div>
        {!hasURI && (
          <>
            <div className={styles.containerForm}>
              <div>
                <BaseInput
                  label="Name"
                  inputName="name"
                  placeholder="My NFT name"
                  handleChange={handleChange}
                />
                <BaseInput
                  marginTop={20}
                  label="Description"
                  inputName="description"
                  handleChange={handleChange}
                  placeholder="Enter NFT description"
                />
              </div>
              <InputUploadImage
                oldImages={[]}
                inputName="file"
                setFieldValue={setFieldValue}
              />
            </div>
            <div className={styles.powers}>
              <BaseInput inputName="health" label="Health" handleChange={handleChange} />
              <BaseInput label="Attack" inputName="attack" handleChange={handleChange} />
              <BaseInput label="Speed" inputName="speed" handleChange={handleChange} />
            </div>
            <div>
              <BaseButton marginTop={20} type="submit" text="Save" />
            </div>
          </>
        )}
        {hasURI && (
          <div className={styles.containerForm}>
            <BaseInput
              inputName="uriLink"
              label="URI Link"
              handleChange={handleChange}
              placeholder="http://link.com/data/json"
            />
            <BaseInput
              marginTop={20}
              inputName="price"
              placeholder="0.8"
              label="Price (ETH)"
              handleChange={handleChange}
            />
            <div>
              <BaseButton marginTop={20} type="submit" text="List" />
            </div>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default Create;
