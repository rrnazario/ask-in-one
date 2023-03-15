import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import Draggable from 'react-draggable'

function PaperComponent(props: any) {
  return (
    <Draggable
      handle={`#${props.handleArea ?? "draggable-dialog-title"}`}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export interface ConfirmationDialogProps<T> {
    item: T;
    dialogText: string;
    dialogTitle?: string;
    open: boolean;

    onClose: (item: T) => Promise<any>;
    onConfirm: (item: T) => Promise<any>;
}

export function ConfirmationDialog<T>(props: ConfirmationDialogProps<T>) {
    const { onClose, onConfirm, dialogText, dialogTitle, open } = props;

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle>{dialogTitle ?? 'Atenção'}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={async () => await onConfirm(props.item)} color={'primary'}>
                    Confirmar
                </Button>
                <Button autoFocus onClick={async () => await onClose(props.item)} color={'error'}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}