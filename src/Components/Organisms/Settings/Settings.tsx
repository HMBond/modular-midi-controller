import EditOffIcon from '@mui/icons-material/EditOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SettingsIcon from '@mui/icons-material/Settings';
import { Fab, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { Dialog, MidiSettings, SaveDialog } from '../..';
import { useStateContext } from '../../../context';
import Actions from './Actions';
import './Settings.css';

type SettingsProps = { restartMidi: () => Promise<any> };

function Settings({ restartMidi }: SettingsProps) {
  const { state, dispatch } = useStateContext();
  const [open, setOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  function handleOpenClick() {
    setOpen(true);
  }

  function handleCloseClick() {
    setOpen(false);
  }

  function handleThemeModeToggle(event: React.ChangeEvent, checked: boolean) {
    dispatch({ type: 'SET_INVERT_THEME', value: checked });
  }

  function handleLeftHandedChange() {
    dispatch({ type: 'SET_LEFT_HANDED', value: !state.leftHanded });
  }

  function handleShowEditButtonChange() {
    dispatch({ type: 'SET_SHOW_EDIT_BUTTON', value: !state.showEditButton });
  }

  function handleEditButtonClick() {
    dispatch({ type: 'SET_EDIT_MODE', value: !state.editMode });
  }

  function handleSaveDialogClose() {
    setSaveDialogOpen(false);
  }

  function handleSave(fileName: string) {
    dispatch({ type: 'SAVE_STATE_AS', fileName });
    setSaveDialogOpen(false);
  }

  const { leftHanded, showEditButton, editMode, invertTheme, fileName } = state;

  return (
    <div className={`settings__controls ${leftHanded ? 'row-reversed' : ''}`}>
      {showEditButton && (
        <Fab color="default" aria-label="edit" size="large" onClick={handleEditButtonClick}>
          {editMode ? <EditOffIcon /> : <ModeEditIcon />}
        </Fab>
      )}
      <Fab color="default" aria-label="settings" size="large" onClick={handleOpenClick}>
        <SettingsIcon />
      </Fab>
      <Dialog
        title="Settings"
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="settings"
        aria-describedby="global and midi settings"
        actions={Actions({ restartMidi, setOpen, setSaveDialogOpen })}
      >
        <div className="settings__general">
          <FormControlLabel
            control={<Switch checked={showEditButton} onChange={handleShowEditButtonChange} />}
            label="Show edit button"
          />
          <FormControlLabel
            control={<Switch checked={invertTheme} onChange={handleThemeModeToggle} />}
            label="Perform in light mode"
          />
          <FormControlLabel
            control={<Switch checked={leftHanded} onChange={handleLeftHandedChange} />}
            label="Left handed"
          />
        </div>
        <MidiSettings />
      </Dialog>
      <SaveDialog
        inputValue={fileName}
        onSubmit={handleSave}
        open={saveDialogOpen}
        onClose={handleSaveDialogClose}
      />
    </div>
  );
}

export default Settings;
