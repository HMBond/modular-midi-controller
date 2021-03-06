import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEvent, useState } from 'react';
import { Dialog } from '../..';
import { View, ViewPropTypes } from '../../../types/View.types';

ViewDialog.propTypes = {
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  add: PropTypes.bool,
  view: ViewPropTypes.isRequired,
};

type Props = {
  onSubmit: (view: View) => void;
  open: boolean;
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void;
  onDelete?: () => void;
  add?: boolean;
  view: View;
};

function ViewDialog({ onSubmit, open, onClose, onDelete, add, view }: Props) {
  const [label, setLabel] = useState(view.label);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function handleSubmit() {
    onSubmit({ ...view, label });
  }

  const title = `${add ? 'New' : 'Edit'} View`;
  const submitLabel = add ? 'Add' : 'Save';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={title}
      submitLabel={submitLabel}
      actions={
        onDelete !== undefined && (
          <Button color="warning" size="small" aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </Button>
        )
      }
    >
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        fullWidth
        variant={'standard'}
        value={label}
        onChange={handleChange}
      />
    </Dialog>
  );
}

export default ViewDialog;
