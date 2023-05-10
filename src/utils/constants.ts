export enum Types {
  ADD,
  EDIT,
  DELETE
}

type Base = {
  [key: string]: string
}

export const PRIORITY_LABEL: Base = {
  'very-high': 'Very High',
  'high': 'High',
  'medium': 'Medium',
  'low': 'Low',
  'very-low': 'Very Low',
}

export const PRIORITY_COLOR: Base = {
  'very-high': '#ED4C5C',
  'high': '#F8A541',
  'medium': '#00A790',
  'low': '#428BC1',
  'very-low': '#8942C1',
}

export const PRIORITY = [
  {
    label: PRIORITY_LABEL['very-high'],
    color: PRIORITY_COLOR['very-high'],
    value: 'very-high',
  },
  {
    label: PRIORITY_LABEL['high'],
    color: PRIORITY_COLOR['high'],
    value: 'high',
  },
  {
    label: PRIORITY_LABEL['medium'],
    color: PRIORITY_COLOR['medium'],
    value: 'medium',
  },
  {
    label: PRIORITY_LABEL['low'],
    color: PRIORITY_COLOR['low'],
    value: 'low',
  },
  {
    label: PRIORITY_LABEL['very-low'],
    color: PRIORITY_COLOR['very-low'],
    value: 'very-low',
  },
]