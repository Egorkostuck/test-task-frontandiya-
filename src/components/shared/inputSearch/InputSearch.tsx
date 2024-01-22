import { ChangeEvent, FC, useState } from 'react';

import 'styles/components/input-search.scss';
import { delay } from 'components/shared/inputSearch/config';
import useDebounced from 'hooks/useDebounced';

interface Props {
  onInputChange: (value: string) => void;
}

const InputSearch: FC<Props> = ({ onInputChange }) => {
  const [searchProfile, setSearchProfile] = useState('');

  useDebounced({
    callback: () => onInputChange(searchProfile),
    delay,
    dependencies: [searchProfile],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchProfile(e.target.value);
  };

  return (
    <input
      onChange={handleInputChange}
      className="input-search"
      placeholder="Enter GitHub username"
      maxLength={30}
    />
  );
};

export default InputSearch;
