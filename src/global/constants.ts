export enum Types {
  ADD,
  EDIT,
  DELETE
}

type Base = {
  [key: string]: string
}

export const PRIORITY_LABEL: Base = {
  VERYHIGH: 'Very High',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  VERYLOW: 'Very Low',
}

export const PRIORITY_COLOR: Base = {
  VERYHIGH: '#ED4C5C',
  HIGH: '#F8A541',
  MEDIUM: '#00A790',
  LOW: '#428BC1',
  VERYLOW: '#8942C1',
}

export const PRIORITY = [
  {
    label: PRIORITY_LABEL.VERYHIGH,
    color: PRIORITY_COLOR.VERYHIGH,
    value: 'VERYHIGH',
  },
  {
    label: PRIORITY_LABEL.HIGH,
    color: PRIORITY_COLOR.HIGH,
    value: 'HIGH',
  },
  {
    label: PRIORITY_LABEL.MEDIUM,
    color: PRIORITY_COLOR.MEDIUM,
    value: 'MEDIUM',
  },
  {
    label: PRIORITY_LABEL.LOW,
    color: PRIORITY_COLOR.LOW,
    value: 'LOW',
  },
  {
    label: PRIORITY_LABEL.VERYLOW,
    color: PRIORITY_COLOR.VERYLOW,
    value: 'VERYLOW',
  },
]