import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Avatar, Card, CardContent, Typography, CardActions, Collapse, IconButton, IconButtonProps, styled } from "@mui/material";
import { brown, green, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { OrderItem, OrdersGrid } from './orders';



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export interface SaloonTableProps {
    id: string,
    items: OrderItem[],

    onCancel?: (table: SaloonTableProps) => Promise<any>,
    onPay?: (table: SaloonTableProps) => Promise<any>,
    onEdit?: (table: SaloonTableProps) => Promise<any>,
}

export function SaloonTable(props: SaloonTableProps) {
    const { items, id, onEdit, onCancel, onPay } = props;
    
    const [expanded, setExpanded] = useState(false);
    const [totalValue, setTotalValue] = useState('32,50');
    const color = new Date().getMilliseconds() % 2 === 0 ? brown[500] : green[500];

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        calculateTotal();
    })

    const calculateTotal = async () => {
        const total = items
            .map(item => item.amount * item.price)
            .reduce((previous, current) => previous += current, 0);

        await setTotalValue(total.toLocaleString("pt-BR", {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            useGrouping: false,
        }));
    }

    return <div style={{ paddingLeft: 10, width: 345 }}>
        <Avatar sx={{ bgcolor: color, top: 30, left: 10, width: 60, height: 60 }} variant="rounded">
            {id}
        </Avatar>
        <Card sx={{ maxWidth: 345, bgcolor: grey[200] }}>
            <CardContent>
                <Typography component="h2" variant="h3" color="text.primary" align="right">
                    R$&nbsp;{totalValue}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="editar mesa" onClick={() => onEdit!(props)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="fechar conta" onClick={() => onPay!(props)}>
                    <PaidIcon />
                </IconButton>
                <IconButton aria-label="cancelar conta" onClick={() => onCancel!(props)}>
                    <DeleteForeverIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="exibir itens"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <OrdersGrid items={items} />
                </CardContent>
            </Collapse>
        </Card>
    </div>
}