import type { KeyboardEvent } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useToast } from './useToast';

interface SearchHook {
  (
    key?: string,
  ): [
    React.MutableRefObject<HTMLInputElement | null>,
    (e: KeyboardEvent<HTMLInputElement>) => void,
  ];
}

const useSearch: SearchHook = (key = 'q') => {
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getValue = (key: string) => searchParams.get(key) || '';
  const value = getValue(key);
  const option = getValue('option') || 'lectureTotalAvg';
  const majorType = getValue('majorType') || '전체';

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const inputValue = inputRef.current?.value.trim() || '';
    if (inputValue.length < 2) {
      toast({ message: '두 글자 이상 입력해주세요' });

      return;
    }
    navigate(`/search?q=${inputValue}&option=${option}&majorType=${majorType}`);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return [inputRef, handleKeypress];
};

export default useSearch;
