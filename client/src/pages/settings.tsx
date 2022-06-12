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

const FORM_STATE = {
  name: '',
  email: '',
  avatar: '',
  twitter: '',
  instagram: '',
  stripeKey: '',
  profileBio: '',
  stripeSecret: '',
  socialMediaLinks: [],
};

const Settings: NextPage = () => {
  const { isLoading, isError, data, error } = useQuery('user', () => {
    return axios.get('http://localhost:3000/api/user/getUser');
  });
  console.log(data);
  const { data: session } = useSession();
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

  const handleUploadPhoto = async (e: ChangeEvent<any>) => {
    const data = {
      file: e.target.files[0],
      bucketFolder: process.env.NEXT_PUBLIC_BUCKET_FOLDER_USER,
    };

    // if (user?.avatar) {
    //   const avatar = [user.avatar]
    //   const params = {
    //     files: avatar,
    //     bucketFolder: process.env.NEXT_PUBLIC_BUCKET_FOLDER_USER
    //   }
    //   deleteImages(params)
    // }

    // const avatar = await uploadImage(data)

    //   userUpdate({
    //     avatar: avatar.imageName,
    //     id: user?.id
    //   })
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut', delay: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <div>Settings</div>
        <div>
          <div>
            <div>
              <BaseInput
                marginTop={20}
                inputName="name"
                label="Display name"
                handleChange={handleChange}
                // defaultValue={user?.name || ''}
                placeholder="Enter your display name"
              />
            </div>
            <div>
              <BaseInput
                marginTop={20}
                inputName="email"
                label="Email"
                handleChange={handleChange}
                placeholder="Enter your email"
                // defaultValue={user?.email || ''}
              />
            </div>
          </div>
          <label htmlFor="upload-avatar">
            {/* {user?.avatar && (
              <>
                {isLoadingImage && (
                  <div tw="animate-pulse absolute sm:width[150px] sm:height[150px] width[120px] height[120px] bg-gray-300 transition-all flex justify-center align-items[center] object-fit[cover] border-radius[100%] mb-5" />
                )}
                {user?.avatar && (
                  <img
                    alt="user image"
                    tw="sm:width[150px] sm:height[150px] width[120px] height[120px] object-fit[cover] border-radius[100%] mb-5"
                    src={`${process.env.NEXT_PUBLIC_AWS_BASE_URL_BUCKET}${process.env.NEXT_PUBLIC_BUCKET_FOLDER_USER}/${user?.avatar}`}
                  />
                )}
              </>
            )} */}
            <div>
              <MdModeEdit size={25} />
            </div>
            {/* {!user?.avatar && <AvatarImageNotFound />} */}
          </label>
          <div>
            {/* <InputText
              type="file"
              name="image"
              tw="width[20%]"
              id="upload-avatar"
              disabled={isLoadingImage}
              onChange={handleUploadPhoto}
            /> */}
          </div>
        </div>
        <div>
          <BaseInput
            label="Bio"
            marginTop={20}
            inputName="profileBio"
            handleChange={handleChange}
            // defaultValue={user?.profileBio || ''}
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
              // defaultValue={getSocialMediaValue(
              //   user?.socialMediaLinks || [],
              //   'twitter'
              // )}
            />
          </div>
          <div>
            <BaseInput
              marginTop={20}
              inputName="instagram"
              label="Instagram"
              handleChange={handleChange}
              placeholder="Enter your Instagram URL"
              // defaultValue={getSocialMediaValue(
              //   user?.socialMediaLinks || [],
              //   'instagram'
              // )}
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
