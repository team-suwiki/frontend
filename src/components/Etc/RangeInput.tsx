import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface RangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  setSlide: (value: number) => void;
}

const RangeInput = ({
  min = 0,
  max = 5,
  step = 0.5,
  defaultValue = 0,
  setSlide,
}: RangeInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [isChanging, setIsChanging] = useState(false);

  const getPercent = useMemo(
    () => (value: number) => ((value - min) / (max - min)) * 100,
    [max, min]
  );

  const changeInputProgressPercentStyle = useCallback(() => {
    inputRef.current?.style.setProperty(
      '--webkitProgressPercent',
      `${getPercent(inputRef.current?.valueAsNumber || 0)}%`
    );
  }, [getPercent]);

  useEffect(() => {
    changeInputProgressPercentStyle();
    const inputElement = inputRef.current;

    if (!inputElement) return;

    const handleUpAndLeave = () => setIsChanging(false);
    const handleDown = () => setIsChanging(true);

    inputElement.addEventListener('mousemove', changeInputProgressPercentStyle);
    inputElement.addEventListener('mousedown', handleDown);
    inputElement.addEventListener('mouseup', handleUpAndLeave);
    inputElement.addEventListener('mouseleave', handleUpAndLeave);

    return () => {
      inputElement.removeEventListener('mousemove', changeInputProgressPercentStyle);
      inputElement.removeEventListener('mousedown', handleDown);
      inputElement.removeEventListener('mouseup', handleUpAndLeave);
      inputElement.removeEventListener('mouseleave', handleUpAndLeave);
    };
  }, [isChanging, changeInputProgressPercentStyle]);

  useEffect(() => {
    if (!inputRef?.current) return;
    changeInputProgressPercentStyle();
  }, [inputRef, changeInputProgressPercentStyle]);

  return (
    <CustomSlider
      className="range"
      type="range"
      ref={inputRef}
      min={min}
      max={max}
      step={step}
      value={sliderValue}
      onChange={(e) => {
        setSliderValue(Number(e.target.value));
      }}
      onMouseUp={(e) => setSlide(Number(e.currentTarget.value))}
      onTouchEnd={() => setSlide(Number(inputRef.current?.value))}
    />
  );
};

const useSlider = (defaultState: number) => {
  const [state, setSlide] = useState(defaultState);
  const Slider = () => <RangeInput setSlide={setSlide} defaultValue={state} />;

  return { state, Slider, setSlide };
};

export default useSlider;

const CustomSlider = styled.input`
  &.range {
    --thumbSize: 24px;
    --trackSize: 8px;
    --thumbBg: #336af8;
    --trackBg: #f2f2f2;
    --progressBg: #336af8;

    /* webkit progress workaround */
    --webkitProgressPercent: 0%;
  }

  &.range {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: var(--thumbSize);
    width: 65%;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 550px) {
      width: 90%;
    }
  }

  &.range:focus {
    outline: none;
  }

  /* Thumb */
  &.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }

  &.range::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }

  &.range::-ms-thumb {
    -ms-appearance: none;
    appearance: none;
    width: var(--thumbSize);
    height: var(--thumbSize);
    background-color: var(--thumbBg);
    border-radius: calc(var(--thumbSize) / 2);
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
    cursor: pointer;
  }

  /* Track */
  &.range::-webkit-slider-runnable-track {
    height: var(--trackSize);
    background-image: linear-gradient(
      90deg,
      var(--progressBg) var(--webkitProgressPercent),
      var(--trackBg) var(--webkitProgressPercent)
    );
    border-radius: calc(var(--trackSize) / 2);
  }

  &.range::-moz-range-track {
    height: var(--trackSize);
    background-color: var(--trackBg);
    border-radius: calc(var(--trackSize) / 2);
  }

  &.range::-ms-track {
    height: var(--trackSize);
    background-color: var(--trackBg);
    border-radius: calc(var(--trackSize) / 2);
  }

  /* Progress */
  &.range::-moz-range-progress {
    height: var(--trackSize);
    background-color: var(--progressBg);
    border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
  }

  &.range::-ms-fill-lower {
    height: var(--trackSize);
    background-color: var(--progressBg);
    border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
  }
`;
