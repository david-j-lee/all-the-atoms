import React from 'react';

import { useGovernor } from '@techempower/react-governor';

import { tableActions, getTheme, getElements } from './actions/tableActions';

export const INITIAL_STATE = {
  ...getElements(),
  // elements: [],
  // temperatureUnit: '',

  search: '',
  temperature: '',

  theme: getTheme(),

  displayValue: 'atomic-mass',
  displayValueText: 'Atomic Mass',
  menuMobileOpen: false,
  showAtomicWeightOnMobile: true,
  showAtomicNumberOnMobile: true,
};

const contract = {
  ...tableActions,
};

const Context = React.createContext(INITIAL_STATE);

export default function ContextProvider(props) {
  const [context, actions] = useGovernor(INITIAL_STATE, contract);

  const { children } = props;

  return (
    <Context.Provider value={[context, actions]}>{children}</Context.Provider>
  );
}

export function useContext() {
  return React.useContext(Context);
}
