/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
      },
    },
    fontSize: {
      0: "0px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      7: "7px",
      8: "8px",
      9: "9px",
      10: "10px",
      11: "11px",
      12: "12px",
      13: "13px",
      14: "14px",
      15: "15px",
      16: "16px",
      17: "17px",
      18: "18px",
      19: "19px",
      20: "20px",
      21: "21px",
      22: "22px",
      23: "23px",
      24: "24px",
      25: "25px",
      26: "26px",
      27: "27px",
      28: "28px",
      29: "29px",
      30: "30px",
      31: "31px",
      32: "32px",
      33: "33px",
      34: "34px",
      35: "35px",
      36: "36px",
      37: "37px",
      38: "38px",
      39: "39px",
      40: "40px",
      41: "41px",
      42: "42px",
      43: "43px",
      44: "44px",
      45: "45px",
      46: "46px",
      47: "47px",
      48: "48px",
      49: "49px",
      50: "50px",
      51: "51px",
      52: "52px",
      53: "53px",
      54: "54px",
      55: "55px",
      56: "56px",
      57: "57px",
      58: "58px",
      59: "59px",
      60: "60px",
      61: "61px",
      62: "62px",
      63: "63px",
      64: "64px",
      65: "65px",
      66: "66px",
      67: "67px",
      68: "68px",
      69: "69px",
      70: "70px",
      71: "71px",
      72: "72px",
      73: "73px",
      74: "74px",
      75: "75px",
      76: "76px",
      77: "77px",
      78: "78px",
      79: "79px",
      80: "80px",
      81: "81px",
      82: "82px",
      83: "83px",
      84: "84px",
      85: "85px",
      86: "86px",
      87: "87px",
      88: "88px",
      89: "89px",
      90: "90px",
      91: "91px",
      92: "92px",
      93: "93px",
      94: "94px",
      95: "95px",
      96: "96px",
      97: "97px",
      98: "98px",
      99: "99px",
      100: "100px",
      101: "101px",
      102: "102px",
      103: "103px",
      104: "104px",
      105: "105px",
      106: "106px",
      107: "107px",
      108: "108px",
      109: "109px",
      110: "110px",
      111: "111px",
      112: "112px",
      113: "113px",
      114: "114px",
      115: "115px",
      116: "116px",
      117: "117px",
      118: "118px",
      119: "119px",
      120: "120px",
      121: "121px",
      122: "122px",
      123: "123px",
      124: "124px",
      125: "125px",
      126: "126px",
      127: "127px",
      128: "128px",
      129: "129px",
      130: "130px",
      131: "131px",
      132: "132px",
      133: "133px",
      134: "134px",
      135: "135px",
      136: "136px",
      137: "137px",
      138: "138px",
      139: "139px",
      140: "140px",
      141: "141px",
      142: "142px",
      143: "143px",
      144: "144px",
      145: "145px",
      146: "146px",
      147: "147px",
      148: "148px",
      149: "149px",
      150: "150px",
    },
    fontWeight: {
      extralight: "100",
      thin: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    spacing: {
      px: "1px",
      0: "0",
      0.75: "7.5px",
      1: "10px",
      1.5: "15px",
      2: "20px",
      2.5: "25px",
      3: "30px",
      4: "40px",
      5: "50px",
      6: "60px",
      7: "70px",
      8: "80px",
      9: "90px",
      10: "100px",
      11: "110px",
      12: "120px",
    },
    opacity: {
      0: "0",
      20: "0.2",
      40: "0.4",
      60: "0.6",
      80: "0.8",
      100: "1",
    },
    lineHeight: {
      0: "0px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      7: "7px",
      8: "8px",
      9: "9px",
      10: "10px",
      11: "11px",
      12: "12px",
      13: "13px",
      14: "14px",
      15: "15px",
      16: "16px",
      17: "17px",
      18: "18px",
      19: "19px",
      20: "20px",
      21: "21px",
      22: "22px",
      23: "23px",
      24: "24px",
      25: "25px",
      26: "26px",
      27: "27px",
      28: "28px",
      29: "29px",
      30: "30px",
      31: "31px",
      32: "32px",
      33: "33px",
      34: "34px",
      35: "35px",
      36: "36px",
      37: "37px",
      38: "38px",
      39: "39px",
      40: "40px",
      41: "41px",
      42: "42px",
      43: "43px",
      44: "44px",
      45: "45px",
      46: "46px",
      47: "47px",
      48: "48px",
      49: "49px",
      50: "50px",
      51: "51px",
      52: "52px",
      53: "53px",
      54: "54px",
      55: "55px",
      56: "56px",
      57: "57px",
      58: "58px",
      59: "59px",
      60: "60px",
      61: "61px",
      62: "62px",
      63: "63px",
      64: "64px",
      65: "65px",
      66: "66px",
      67: "67px",
      68: "68px",
      69: "69px",
      70: "70px",
      71: "71px",
      72: "72px",
      73: "73px",
      74: "74px",
      75: "75px",
      76: "76px",
      77: "77px",
      78: "78px",
      79: "79px",
      80: "80px",
      81: "81px",
      82: "82px",
      83: "83px",
      84: "84px",
      85: "85px",
      86: "86px",
      87: "87px",
      88: "88px",
      89: "89px",
      90: "90px",
      91: "91px",
      92: "92px",
      93: "93px",
      94: "94px",
      95: "95px",
      96: "96px",
      97: "97px",
      98: "98px",
      99: "99px",
      100: "100px",
      101: "101px",
      102: "102px",
      103: "103px",
      104: "104px",
      105: "105px",
      106: "106px",
      107: "107px",
      108: "108px",
      109: "109px",
      110: "110px",
      111: "111px",
      112: "112px",
      113: "113px",
      114: "114px",
      115: "115px",
      116: "116px",
      117: "117px",
      118: "118px",
      119: "119px",
      120: "120px",
      121: "121px",
      122: "122px",
      123: "123px",
      124: "124px",
      125: "125px",
      126: "126px",
      127: "127px",
      128: "128px",
      129: "129px",
      130: "130px",
      131: "131px",
      132: "132px",
      133: "133px",
      134: "134px",
      135: "135px",
      136: "136px",
      137: "137px",
      138: "138px",
      139: "139px",
      140: "140px",
      141: "141px",
      142: "142px",
      143: "143px",
      144: "144px",
      145: "145px",
      146: "146px",
      147: "147px",
      148: "148px",
      149: "149px",
      150: "150px",
    },
    extend: {
      colors: {
        black: "#000000",
        softBlack: "#1B1D1E",
        white: "#fff",
        green: "#C5EE53",
        orange: "#FB7800",
        grayDark: "#B0B0B0",
        gray: "#E7E7E7",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          "@screen sm": {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@screen md": {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@screen lg": {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@screen xl": {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          },
          "@screen 2xl": {
            width: "100%",
            maxWidth: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
          },
        },
      });
    },
  ],
};
