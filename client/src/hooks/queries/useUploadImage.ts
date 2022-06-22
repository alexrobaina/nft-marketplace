export const useUploadImage = async (data: {
  file: HTMLInputElement;
  bucketFolder: string;
}) => {
  const file = data.file;
  const filename = encodeURIComponent(file?.name || '');
  const formData = new FormData();

  try {
    const response = await fetch(
      `/api/uploadFilesS3?file=${filename}&bucketFolder=${data.bucketFolder}`,
    );
    const { url, fields } = await response.json();
    Object.entries({ ...fields, file }).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });

    return {
      success: 'Upload image is success',
      imageName: fields.key.replace(`${data.bucketFolder}/`, ''),
    };
  } catch (error: { message: string } | unknown) {
    return {
      error: error || 'Somothing is wrong',
    };
  }
};
