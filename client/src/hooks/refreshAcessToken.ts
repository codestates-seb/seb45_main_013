import axios from 'axios';
import { getCookieValue } from './getCookie';

const apiUrl = process.env.REACT_APP_API_URL;

export const refreshAccessToken = async () => {
  const refreshToken = getCookieValue('refresh_token');

  try {
    const response = await axios.post(`${apiUrl}/refreshToken`, {}, { headers: { Refresh: refreshToken } });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    document.cookie = `access_token=${response.data.accessToken}; path=/;`;
    document.cookie = `refresh_token=${response.data.refreshToken}; path=/; expires=${expirationDate.toUTCString()};`;

    return response.data.accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
