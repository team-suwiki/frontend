import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Arrows, Option, OptionBox, Options, SelectedOption } from 'styles/common';
import type { SortOption } from 'types/common';

interface OptionSelectProps {
  list: SortOption[];
  itemTitle: keyof SortOption;
  location: string;
}

const OptionSelect = ({ list, itemTitle, location }: OptionSelectProps) => {
  const [select, onSelect] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q') ?? '';
  const option = searchParams.get('option') ?? 'modifiedDate';
  const majorType = searchParams.get('majorType') ?? '전체';
  const selectedOption = list.find((row) => row.option === option) as SortOption;
  const OptionName = selectedOption[itemTitle];
  const isMain = location === 'main';

  const handleSelect = (option: string) => {
    if (isMain) {
      navigate(`/?option=${option}&majorType=${majorType}`);
    } else {
      navigate(`/search?q=${searchValue}&option=${option}&majorType=${majorType}`);
    }
  };

  return (
    <OptionBox
      id={String(isMain)}
      select={select}
      icon={isMain ? selectedOption?.icon : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(!select);
      }}
    >
      <SelectedOption id={String(isMain)}>{OptionName}</SelectedOption>
      <Arrows src={`/images/icon_${select ? 'up' : 'down'}_arrow_solid_24.svg`} />
      {select && (
        <Options>
          {list.map((option) => {
            return (
              <Option
                className={String(isMain)}
                id={option[itemTitle] === OptionName ? 'selected' : undefined}
                key={option.name}
                onClick={() => handleSelect(option.option)}
              >
                {isMain ? (
                  <img
                    loading="lazy"
                    alt={option.icon}
                    src={`/images/icon_color_${option.icon}_36.svg`}
                    style={{ marginRight: '10px' }}
                  />
                ) : null}
                {option[itemTitle]}
              </Option>
            );
          })}
        </Options>
      )}
    </OptionBox>
  );
};

export default OptionSelect;
