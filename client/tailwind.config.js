/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    screens: {
      360: '360px',
      600: '600px',
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      myColor: {
        mainBlue: '#279EFF',
        subBlue: '#1DBCE7',
        darkBlue: '#096DBE',
        skyBlue: '#78C1F3',
        blue: '#9AC5F4',
        Gray00: '#A1A1A',
        Gray10: '#2E2E2E',
        Gray30: '#595959',
        Gary60: '#A6A6A6',
        HighlightGray: '#2962FF',
        CoolGary90: '#F5F6F8',
        CoolGary80: '#DEE2E9',
      },
    },
    fontWeight: {
      default: '400',
      bold: '600',
    },
    boxShadow: {
      0: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      1: '01dp',
      2: '02dp',
      3: '03dp',
      4: '03dp',
    },
    spacing: {
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      48: '48px',
      52: '52px',
      56: '56px',
      60: '60px',
    },
    extend: {
      width: {
        360: '360px',
      },
      minWidth: {
        360: '360px',
      },
      maxWidth: {
        600: '600px',
      },
    },
  },
  plugins: [],
};
