import { Box, Slider, Typography } from '@mui/material';
import debounce from 'lodash/debounce';
import { useState } from 'react';
import { useMidiContext, useStateContext } from '../../../context';
import { SliderModule } from '../../../types/Module.types';
import { SLIDER_DEBOUNCE_WAIT } from '../../definitions';

const dispatchDebounced = debounce(
  (id, value, dispatch, module) =>
    dispatch({
      type: 'UPDATE_MODULE',
      id,
      module: {
        ...module,
        value,
      },
    }),
  SLIDER_DEBOUNCE_WAIT
);

function MidiSlider(module: SliderModule) {
  const { id, channel, value, orientation, label } = module;
  const { midiState } = useMidiContext();
  const { state, dispatch } = useStateContext();
  const [localValue, setLocalValue] = useState<number | number[]>(value);

  function handleChange(event: Event, value: number | number[]) {
    midiState.output?.channels[channel].sendPitchBend(value);
    setLocalValue(value);
    dispatchDebounced(id, value, dispatch, module);
  }

  const style = orientation === 'horizontal' ? { width: 250 } : { height: 250 };

  return (
    <Box sx={style}>
      {label && <Typography component="label">{label}</Typography>}
      <Slider
        disabled={!midiState.output || state.editMode}
        orientation={orientation ? orientation : 'vertical'}
        value={localValue}
        onChange={handleChange}
        min={-1}
        max={1}
        step={0.01}
      />
    </Box>
  );
}

export default MidiSlider;
