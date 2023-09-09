const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@headers': path.resolve(__dirname, 'src/components/headers/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
    },
  },
};
