export enum Types {
  ADD,
  EDIT,
  DELETE
}

type PriorityTypes = {
  [key: string]: string
}

export const PRIORITY_VALUE: PriorityTypes = {
  VERYHIGH: 'Very High',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  VERYLOW: 'Very Low',
}

export const PRIORITY = [
  {
    value: 'VERYHIGH',
    label: 'Very High',
    color: '#ED4C5C',
  },
  {
    value: 'HIGH',
    label: 'High',
    color: '#F8A541',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    color: '#00A790',
  },
  {
    value: ':LOW',
    label: 'Low',
    color: '#428BC1',
  },
  {
    value: 'VERYLOW',
    label: 'Very Low',
    color: '#8942C1',
  },
]