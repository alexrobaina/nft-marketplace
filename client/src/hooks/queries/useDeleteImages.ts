import axios from 'axios';

export const useDeleteImages = async (data: {
  files: Array<[string, string]>;
  bucketFolder: string;
}) => {
  const bucketFolder = data?.bucketFolder || '';
  const url = `/api/deleteFilesS3?bucketFolder=${bucketFolder}`;
  try {
    return await axios.post(url, JSON.stringify(data || {}));
  } catch (error) {
    console.log(error);
  }
};
