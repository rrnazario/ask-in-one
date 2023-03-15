import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid, IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { OrderItem, OrdersGrid } from "./orders";
import { SaloonTableProps } from "./saloon-table";
import AddIcon from '@mui/icons-material/Add';
import { HandleOrderDialog } from "./handle-order.modal";
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


export interface HandleTableModalProps {
  onClose: () => Promise<any>,
  onSave: (item: SaloonTableProps) => Promise<any>,
  title?: string,
  item: SaloonTableProps,
}

export interface HandleTableModalResult {
  currentTableNumber?: number;
}

export function HandleTableModal({ item, title, onSave, onClose }: HandleTableModalProps) {
  const [currentTableNumber, setCurrentTableNumber] = useState(item ? item.id : 1);
  const [orderItems, setOrderItems] = useState<OrderItem[] | undefined>(item ? item.items : undefined);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [dialogItem, setDialogItem] = useState<OrderItem>();

  const onModalSave = async () => {
    //TODO: Validate whether table number already exists in the current saloon
    await onSave({ ...item, id: String(currentTableNumber), items: orderItems! });
  }

  const onDeleteItem = async (item: OrderItem) => await HandleItem(item.name, item, true);
  const onEditItem = async (item: OrderItem) => {
    await setDialogItem(item);
    await setShowEditDialog(true);
  }

  const onSaveEditItem = async (newItem: OrderItem) => {
    await setShowEditDialog(false)
    await HandleItem(dialogItem?.name ?? '', newItem);
  }

  const HandleItem = async (name: string, item: OrderItem, deleteIt: boolean = false) => {
    const local = [...orderItems!]

    if (name === '') {
      await setOrderItems([...local, item]);
    }
    else {
      const index = local.findIndex(t => t.name === name);

      deleteIt ? local.splice(index, 1) : local.splice(index, 1, item)

      await setOrderItems(local);
    }
  }

  const onAddClick = async () => {
    await setDialogItem(undefined);
    await setShowEditDialog(true);
  }

  return <>
    <Dialog 
      open
      onClose={onClose}
      maxWidth={'xl'}
      fullWidth
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title">
      <DialogTitle>{title ? title : 'Nova Mesa'}</DialogTitle>
      <DialogContent>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nº mesa"
              type="number"
              size="small"
              variant="standard"
              value={currentTableNumber}
              onChange={async (c) => await setCurrentTableNumber(Number(c.target.value))}
            />
          </Grid>
          {item && item.items && <>
            <div style={{
              marginTop: 'auto',
              marginLeft: 'auto'
            }}>
              <IconButton aria-label="editar mesa" onClick={onAddClick}>
                <AddIcon />
              </IconButton>
            </div>
          </>}

          {orderItems && <Grid item xs={12}>
            <OrdersGrid
              items={orderItems!}
              onEdit={onEditItem}
              onDelete={onDeleteItem} />
          </Grid>}
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onModalSave}>Salvar</Button>
      </DialogActions>
    </Dialog>

    {showEditDialog && <HandleOrderDialog
      item={dialogItem!}
      onClose={async () => await setShowEditDialog(false)}
      onSave={onSaveEditItem}
    />}
  </>
}