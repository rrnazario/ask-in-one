import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import { PaperComponent } from "../../components/dialogs/paper-component";
import { OrderItem } from "./orders";

interface HandleOrderDialogProps {
    item: OrderItem
    onClose: () => Promise<any>,
    onSave: (item: OrderItem) => Promise<any>,
}
export function HandleOrderDialog({ item, onClose, onSave }: HandleOrderDialogProps) {
    const emptyOrder: OrderItem = {
        amount: 0,
        name: '',
        price: 0
    }
    const [currentItem, setCurrentItem] = useState(item ?? emptyOrder);

    const onSaveDialog = async () => {
        await onSave(currentItem);
    }

    return <>
        <Dialog
            open
            onClose={onClose}
            maxWidth={'xl'}
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title">

            <DialogTitle>{'Item da Mesa'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Produto"
                            type="text"
                            variant="standard"
                            value={currentItem.name}
                            onChange={async (c) => await setCurrentItem({ ...currentItem, name: c.target.value })}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Qtde."
                            type="number"
                            variant="standard"
                            value={currentItem.amount}
                            onChange={async (c) => await setCurrentItem({ ...currentItem, amount: Number(c.target.value) })}
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onSaveDialog}>Salvar</Button>
            </DialogActions>
        </Dialog>
    </>
}