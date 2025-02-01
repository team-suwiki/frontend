import { MajorSearch } from 'components';
import { Modal } from 'components/common';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Arrows, OptionBox, SelectedOption, SelectedOption_M } from 'styles/common';
import { subStr } from 'utils/subString';

const MajorSelect = () => {
  const [searchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const majorType = searchParams.get('majorType') || '전체';

  const handleOptionBoxClick = () => {
    setModalIsOpen(true);
  };
  const handleModalRequestClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <OptionBox id="major" onClick={handleOptionBoxClick}>
        <SelectedOption id="major">{majorType}</SelectedOption>
        <SelectedOption_M>{subStr(majorType, 3)}</SelectedOption_M>
        <Arrows
          id="major"
          alt="arrow"
          src={`/images/icon_${modalIsOpen ? 'up' : 'down'}_arrow_solid_24.svg`}
        />
      </OptionBox>
      <Modal opened={modalIsOpen} onClose={handleModalRequestClose}>
        <MajorSearch setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
};

export default MajorSelect;
