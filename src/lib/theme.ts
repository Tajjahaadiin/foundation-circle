import { createSystem, defaultConfig, defineStyle } from '@chakra-ui/react';
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#04A51E' },
          100: { value: '#186114' },
          200: { value: '#bfdeff' },
          300: { value: '#99caff' },
          // ...
          950: { value: '#001a33' },
        },
        bgSite: {
          50: { value: '#1D1D1D' },
        },
        card: { value: '#262626' },
        bdr: { value: '#3F3F3F' },
        text: {
          50: { value: '#909090' },
          100: { value: '#FFFFFF' },
          200: { value: '#fff' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.50}' },
          contrast: { value: '{colors.brand.100}' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.200}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
        },
        text: {
          light: { value: '{colors.text.50}' },
          bright: { value: '{colors.text}.100' },
          white: { value: '{colors.text}.200' },
        },
        bgSite: {
          solid: { value: '{colors.bgSite.50}' },
        },
      },
      fonts: {
        body: { value: 'Plus Jakarta Sans, Poppins, serif' },
      },
    },
  },
  globalCss: {
    'html,body': {
      bg: 'bgSite.solid',
    },
  },
});
export const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bgSite.solid',

  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'text.light',
    top: '2.5',
    insetStart: '3',
  },
  _peerFocusVisible: {
    color: 'text.light',
    top: '-3',
    insetStart: '2',
  },
});
