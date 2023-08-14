export type PaddingType = 'small' | 'medium' | 'large';

export const gradients = [
  'bg-gradient-to-l from-violet-700 via-indigo-300 to-cyan-400',
  'bg-gradient-to-tl from-fuchsia-300 via-blue-300 to-red-400',
  'bg-gradient-to-l from-cyan-100 via-purple-300 to-white',
  'bg-gradient-to-br from-transparent via-orange-100 to-white',
  'bg-gradient-to-t from-cyan-600 via-cyan-400 to-indigo-100'
];

export const paddingTypes = {
  small: 'p-5',
  medium: 'p-10',
  large: 'p-20'
};

export const paddingKeys = Object.keys(paddingTypes) as PaddingType[];
