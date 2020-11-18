import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

export default theme;
