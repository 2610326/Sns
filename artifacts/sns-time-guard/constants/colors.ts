const light = {
  text: '#17312D',
  tint: '#4F8477',
  background: '#F3F6F1',
  foreground: '#17312D',
  card: '#FFFFFF',
  cardForeground: '#17312D',
  primary: '#4F8477',
  primaryForeground: '#FFFFFF',
  secondary: '#E5F0EB',
  secondaryForeground: '#325147',
  muted: '#E9EFE9',
  mutedForeground: '#71817A',
  accent: '#D8ED83',
  accentForeground: '#26351C',
  destructive: '#C85F4F',
  destructiveForeground: '#FFFFFF',
  border: '#DCE5DC',
  input: '#DCE5DC',
};

const dark = {
  text: '#E7F1EA',
  tint: '#A5D2C4',
  background: '#111814',
  foreground: '#E7F1EA',
  card: '#1B2520',
  cardForeground: '#E7F1EA',
  primary: '#A5D2C4',
  primaryForeground: '#17312D',
  secondary: '#26342E',
  secondaryForeground: '#D0E2D9',
  muted: '#26332D',
  mutedForeground: '#A0B1A8',
  accent: '#D0DF91',
  accentForeground: '#26351C',
  destructive: '#E58172',
  destructiveForeground: '#271613',
  border: '#34423A',
  input: '#34423A',
};

const colors = { light, dark, radius: 22 };

export const accentPalettes = {
  sage: {
    label: '세이지',
    swatch: '#86B6A8',
    light: { tint: '#4F8477', primary: '#4F8477', primaryForeground: '#FFFFFF', secondary: '#E5F0EB', secondaryForeground: '#325147', accent: '#D8ED83', accentForeground: '#26351C' },
    dark: { tint: '#A5D2C4', primary: '#A5D2C4', primaryForeground: '#17312D', secondary: '#263A32', secondaryForeground: '#D3E9DF', accent: '#D0DF91', accentForeground: '#26351C' },
  },
  rose: {
    label: '로즈',
    swatch: '#E8A9B8',
    light: { tint: '#A85E73', primary: '#A85E73', primaryForeground: '#FFFFFF', secondary: '#F7E8EC', secondaryForeground: '#65414D', accent: '#F5D8E0', accentForeground: '#513746' },
    dark: { tint: '#E6A6B7', primary: '#E6A6B7', primaryForeground: '#3D202B', secondary: '#3A2930', secondaryForeground: '#F2D9E1', accent: '#69414E', accentForeground: '#FFE7EE' },
  },
  lavender: {
    label: '라벤더',
    swatch: '#B7A8E0',
    light: { tint: '#7565A8', primary: '#7565A8', primaryForeground: '#FFFFFF', secondary: '#EEEAF8', secondaryForeground: '#4F456B', accent: '#E5DDF7', accentForeground: '#40365E' },
    dark: { tint: '#C1B2EB', primary: '#C1B2EB', primaryForeground: '#2D2444', secondary: '#302A40', secondaryForeground: '#E5DDF8', accent: '#4D416C', accentForeground: '#F0EAFF' },
  },
  sky: {
    label: '스카이',
    swatch: '#9FC9E8',
    light: { tint: '#4F7FA7', primary: '#4F7FA7', primaryForeground: '#FFFFFF', secondary: '#E5F0F8', secondaryForeground: '#36556E', accent: '#D9EAF7', accentForeground: '#2E4B62' },
    dark: { tint: '#A4CBE8', primary: '#A4CBE8', primaryForeground: '#1C3548', secondary: '#263746', secondaryForeground: '#D6E8F4', accent: '#3A5368', accentForeground: '#E4F3FF' },
  },
  peach: {
    label: '피치',
    swatch: '#E9B28F',
    light: { tint: '#A56645', primary: '#A56645', primaryForeground: '#FFFFFF', secondary: '#F7ECE4', secondaryForeground: '#684C3D', accent: '#F5DFD0', accentForeground: '#583F32' },
    dark: { tint: '#E7B18F', primary: '#E7B18F', primaryForeground: '#3C251A', secondary: '#3B2D25', secondaryForeground: '#F0DCCE', accent: '#694B3A', accentForeground: '#FFE9D9' },
  },
  mint: {
    label: '민트',
    swatch: '#8ECFC0',
    light: { tint: '#397F72', primary: '#397F72', primaryForeground: '#FFFFFF', secondary: '#E2F2EE', secondaryForeground: '#2D554D', accent: '#D1EEE4', accentForeground: '#285349' },
    dark: { tint: '#96D7C7', primary: '#96D7C7', primaryForeground: '#15352E', secondary: '#233A34', secondaryForeground: '#D1EBE3', accent: '#31534A', accentForeground: '#E2FAF1' },
  },
} as const;

export type ThemeMode = 'system' | 'light' | 'dark';
export type AccentPaletteId = keyof typeof accentPalettes;

export default colors;
