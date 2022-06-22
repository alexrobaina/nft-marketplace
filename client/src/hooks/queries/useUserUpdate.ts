import axios from 'axios';

export const userUpdate = async (data: { avatar: string; id: string }) => {
  try {
    const response = await axios.put('/api/updateUser', data);

    return {
      success: 'Update user success',
      response,
    };
  } catch (error: { message: string } | unknown) {
    return {
      error: error || 'Update user unsuccessful',
    };
  }
};
