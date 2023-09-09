import path from 'path';

export default {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@headers': path.resolve(__dirname, 'src/components/headers/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
    },
  },
};
