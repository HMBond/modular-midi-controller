import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import { FormEvent, MouseEvent, ReactNode } from 'react';
import './Dialog.css';

function Dialog({
  children,
  onSubmit,
  open,
  onClose,
  title,
  text,
  actions,
  submitLabel = 'OK',
  dividers,
  ...restProps
}: DialogProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit && onSubmit();
  }

  function handleCloseClick(event: MouseEvent) {
    onClose(event, 'closeClick');
  }

  return (
    <MuiDialog
      aria-label={title}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      {...restProps}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers={dividers} className="dialog__content">
          {text && <DialogContentText>{text}</DialogContentText>}
          {children}
        </DialogContent>
        <DialogActions>
          <div className="dialog__left-actions">{actions}</div>
          <Button onClick={handleCloseClick}>Close</Button>
          {onSubmit && <Button type="submit">{submitLabel}</Button>}
        </DialogActions>
      </form>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  dividers: PropTypes.bool,
};

type DialogProps = {
  children?: ReactNode;
  onSubmit?: () => void;
  open: boolean;
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void;
  title: string;
  text?: string;
  actions?: ReactNode;
  submitLabel?: string;
  dividers?: boolean;
  [prop: string]: unknown;
};

export default Dialog;
