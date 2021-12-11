import React, { useContext } from 'react';
import { WebMidi } from 'webmidi';
import './MidiSettings.css';
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
} from '@mui/material';
import { MidiContext } from '../../Organisms/ContextProviders/MidiContextProvider';

function MidiSettings({ restartMidi }) {
  const { inputDevice, setInputDevice, outputDevice, setOutputDevice } =
    useContext(MidiContext);

  return (
    <div className="midi-settings">
      <Button variant="contained" onClick={async () => await restartMidi()}>
        Restart Midi
      </Button>
      {inputDevice && inputDevice.id && (
        <FormControl fullWidth>
          <InputLabel id="output-select-label">Input Device</InputLabel>
          <Select
            labelId="input-select-label"
            id="input-select"
            value={inputDevice && inputDevice.id ? inputDevice.id : ''}
            label="Input Device"
            onChange={setInputDevice}
          >
            {WebMidi.inputs.map((input) => (
              <MenuItem key={input.id} value={input.id}>
                {input.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {WebMidi.inputs.length === 0 && (
        <Alert severity="warning">No input devices found</Alert>
      )}
      {outputDevice && outputDevice.id && (
        <FormControl fullWidth>
          <InputLabel id="output-select-label">Output Device</InputLabel>
          <Select
            labelId="output-select-label"
            id="output-select"
            value={outputDevice && outputDevice.id ? outputDevice.id : ''}
            label="Output Device"
            onChange={setOutputDevice}
          >
            {WebMidi.outputs.map((output) => (
              <MenuItem key={output.id} value={output.id}>
                {output.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {WebMidi.outputs.length === 0 && (
        <Alert severity="warning">No output devices found</Alert>
      )}
    </div>
  );
}

export default MidiSettings;