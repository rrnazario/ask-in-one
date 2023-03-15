import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReducer } from "react";

interface OrdersGridProps {
    items: OrderItem[],
    onEdit?: (item: OrderItem) => Promise<any>,
    onDelete?: (item: OrderItem) => Promise<any>,
}

export interface OrderItem {
    name: string,
    amount: number,
    price: number
}

export function OrdersGrid({ items, onEdit, onDelete }: OrdersGridProps) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
   
    const formatNumber = (n: number): string => {
        return `${n.toLocaleString("pt-BR", {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            useGrouping: false,
        })}`
    }

    const calculateTotal = (item: OrderItem): number => {
        return item.amount * item.price
    }

    const handleEdit = async (item: OrderItem) => {
        await onEdit!(item)
        await forceUpdate()
    }

    const handleDelete = async (item: OrderItem) => {
        await onDelete!(item)
        await forceUpdate()
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 190 }} aria-label="tabela de itens do pedido">
                <TableHead>
                    <TableRow>
                        {onEdit && <TableCell align="center" sx={{ fontSize: '10px' }}>Editar</TableCell>}
                        {onDelete && <TableCell align="center" sx={{ fontSize: '10px' }}>Excluir</TableCell>}
                        <TableCell>Produto</TableCell>
                        <TableCell align="right">Qtde.</TableCell>
                        <TableCell align="right">Preço</TableCell>
                        <TableCell align="right">Total</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {items && items.map((item) => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {onEdit && <TableCell align="right">
                                <IconButton aria-label="editar item do pedido" size="small" onClick={async () => await handleEdit(item)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>}
                            {onDelete && <TableCell align="right">
                                <IconButton aria-label="excluir item do pedido" size="small" onClick={async () => await handleDelete(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>}
                            
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                            <TableCell align="right">{formatNumber(item.price)}</TableCell>
                            <TableCell align="right">{formatNumber(calculateTotal(item))}</TableCell>                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}