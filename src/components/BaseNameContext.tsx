import { createContext, ReactNode, useContext } from 'react';
import { LocaleType } from '../interfaces';

const BaseNameContext = createContext<LocaleType | ''>('');
type BaseNameType = LocaleType | '';

interface Props {
  children: ReactNode;
  value?: BaseNameType;
}

const BaseNameProvider = ({ children, value = '' }: Props) => {
  return (
    <BaseNameContext.Provider value={value}>
      {children}
    </BaseNameContext.Provider>
  );
};

const useBaseName = () => {
  const context = useContext(BaseNameContext);
  if (context === undefined) {
    throw new Error('useBaseName must be used within a BaseNameProvider');
  }
  return context;
};

export { useBaseName, BaseNameProvider };
