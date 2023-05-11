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
  'normal': 'Medium',
  'low': 'Low',
  'very-low': 'Very Low',
}

export const PRIORITY_COLOR: Base = {
  'very-high': '#ED4C5C',
  'high': '#F8A541',
  'normal': '#00A790',
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
    label: PRIORITY_LABEL['normal'],
    color: PRIORITY_COLOR['normal'],
    value: 'normal',
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