import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { Fab } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { ViewDialog } from '../..';
import { useStateContext } from '../../../context';
import { View, ViewPropTypes } from '../../../types/View.types';
import './ViewActions.css';

ViewActions.propTypes = {
  view: ViewPropTypes.isRequired,
};

type Props = {
  view: View;
};

function ViewActions({ view }: Props) {
  const { state, dispatch } = useStateContext();
  const [showEditDialog, setShowEditDialog] = useState(false);

  function handleEditClick() {
    setShowEditDialog(true);
  }

  function handleLeftClick() {
    dispatch({ type: 'MOVE_VIEW', view: view, toPlace: view.place - 1 });
  }

  function handleRightClick() {
    dispatch({ type: 'MOVE_VIEW', view: view, toPlace: view.place + 1 });
  }

  function handleEditDialogClose() {
    setShowEditDialog(false);
  }

  function handleEditDialogSubmit(updated: View) {
    dispatch({ type: 'UPDATE_VIEW', id: view.id, view: updated });
    setShowEditDialog(false);
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_VIEW', id: view.id });
  }

  return (
    <div className="view-actions">
      <Fab
        style={{ '--order': 0 } as CSSProperties}
        className="view-actions__button view-actions__button--edit"
        color="primary"
        size="small"
        aria-label="delete"
        onClick={handleEditClick}
      >
        <EditIcon />
      </Fab>
      {view.place > 1 && (
        <Fab
          style={{ '--order': 1 } as CSSProperties}
          className="view-actions__button view-actions__button--left"
          color="secondary"
          size="small"
          aria-label="move view left"
          onClick={handleLeftClick}
        >
          <ArrowLeft />
        </Fab>
      )}
      {view.place !== state.views.length && (
        <Fab
          style={{ '--order': 1 } as CSSProperties}
          className="view-actions__button view-actions__button--right"
          color="secondary"
          size="small"
          aria-label="move view right"
          onClick={handleRightClick}
        >
          <ArrowRight />
        </Fab>
      )}
      <ViewDialog
        open={showEditDialog}
        onClose={handleEditDialogClose}
        onSubmit={handleEditDialogSubmit}
        onDelete={handleDelete}
        view={view}
      />
    </div>
  );
}

export default ViewActions;
