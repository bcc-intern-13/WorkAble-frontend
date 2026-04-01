import localFont from 'next/font/local'

export const poppins = localFont({
  src: [
    {
      path: '../../assets/fonts/Poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/Poppins/Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
})

export const inter = localFont({
  src: [
    {
      path: "../../assets/fonts/Inter/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter/Inter_18pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter",
})