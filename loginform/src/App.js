import React from 'react';
import LoginForm from './Components/LoginForm';

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <LoginForm />
      </ColorModeProvider>
    </ThemeProvider>
  );
}
