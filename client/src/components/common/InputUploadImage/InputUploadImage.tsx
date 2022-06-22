import { useCallback, useRef, useEffect, useState, FC } from 'react';
import c from 'classnames';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import styles from './inputUploadImage.module.scss';

interface Props {
  oldImages: any;
  marginTop?: number;
  inputName?: string;
  setFieldValue: any;
  marginBottom?: number;
}

const InputUploadImage: FC<Props> = ({
  marginTop,
  inputName,
  oldImages,
  marginBottom,
  setFieldValue,
}) => {
  const [previewImage, setPreviewImage] = useState<any>(oldImages);
  const [newPreviewsImage, setNewPreviewsImage] = useState<any>([]);
  const fileUpload: any = useRef();

  const handleChangeImage = useCallback((e) => {
    e.preventDefault();
    const fileList = Array.from(e.target.files);

    const mappedFiles = fileList.map((file: any) => ({
      ...file,
      preview: URL.createObjectURL(file),
      imageName: file,
    }));
    setNewPreviewsImage(mappedFiles);

    setFieldValue('newImages', e.target.files);
  }, []);

  const removeNewPreviewImage = useCallback(
    (image: any) => {
      const imagePreview = newPreviewsImage.filter((preview: any) => {
        return preview.preview !== image;
      });
      setNewPreviewsImage(imagePreview);
    },
    [newPreviewsImage],
  );

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click();
  }, []);

  useEffect(() => {
    if (oldImages) {
      if (oldImages.length > 0 && previewImage.length === 0) {
        setPreviewImage(oldImages);
      }
    }
  }, [oldImages]);

  return (
    <div>
      <div className={styles.containerImagePreview}>
        {newPreviewsImage &&
          newPreviewsImage.map((image: any) => {
            return (
              <div key={image.preview} className={styles.containerImage}>
                <img
                  alt="pets-love"
                  src={image.preview}
                  className={styles.imagePreview}
                />
                <div className={styles.middle}>
                  <div
                    onClick={() => removeNewPreviewImage(image.preview)}
                    className={styles.containerIcon}
                  >
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {newPreviewsImage.length === 0 && (
        <div
          style={{ marginTop, marginBottom, width: '100%' }}
          className={styles.colInputImage}
        >
          <input
            multiple
            type="file"
            name={inputName}
            ref={fileUpload}
            className={styles.inputFile}
            onChange={handleChangeImage}
            placeholder="placeholderImages"
          />
          <label
            onClick={onClickFileUpload}
            className={c(styles.textInput, styles.btnTertiary)}
          >
            <div>
              <AiOutlineCloudUpload className={styles.icon} size={48} />
            </div>
            <span className={styles.textFileUp}>Upload a file</span>
            <span>PNG, JPG, GIF, up to 10MB</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default InputUploadImage;
