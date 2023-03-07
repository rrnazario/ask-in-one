import { Avatar, Card, CardActions, CardContent, Collapse, Fab, IconButton, IconButtonProps, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { brown, green, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer.component";
import AskTitle from "../../components/title/asktitle.component";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

interface TableProps {
    id: string,
    items: OrderItem[]
}

interface OrderItem {
    name: string,
    amount: number,
    price: number,
    itemTotal: number,
}

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

function OrderTable({ items }: TableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="tabela de itens do pedido">
                <TableHead>
                    <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell align="right">Qtde.</TableCell>
                        <TableCell align="right">Preço</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="right">{item.itemTotal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function SaloonTable(props: TableProps) {
    const [expanded, setExpanded] = useState(false);

    const color = new Date().getMilliseconds() % 2 === 0 ? brown[500] : green[500];

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return <div style={{ paddingLeft: 10 }}>
        <Avatar sx={{ bgcolor: color, top: 30, left: 10, width: 60, height: 60 }} variant="rounded">
            {props.id}
        </Avatar>
        <Card sx={{ maxWidth: 345, bgcolor: grey[200] }}>
            <CardContent>
                <Typography component="h2" variant="h3" color="text.primary" align="right">
                    R${'32,50'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
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
                    <OrderTable id={props.id} items={props.items} />
                </CardContent>
            </Collapse>
        </Card>
    </div>
}

export function Saloon() {
    const [tables, setTables] = useState<TableProps[]>([
        {
            id: "1", items: [
                {
                    name: 'Coca-Cola 1L',
                    amount: 2,
                    price: 3.50,
                    itemTotal: 7
                }
            ]
        },
        {
            id: "2", items: [
                {
                    name: 'Coca-Cola 1L',
                    amount: 2,
                    price: 3.50,
                    itemTotal: 7
                },
                {
                    name: 'Pizza da casa',
                    amount: 2,
                    price: 7,
                    itemTotal: 14
                }
            ]
        },
    ]);

    useEffect(() => { }, []);

    return <>
        <AskTitle text="Mesas" />
        <div style={{
            alignItems: 'center'
        }}>
            {tables && tables.map((table, index) => <SaloonTable id={table.id} items={table.items} />)}
        </div>

        <Fab size="medium" color="primary" aria-label="add" sx={{
            position: 'fixed', bottom: 66, right: 10
        }}>
            <AddIcon />
        </Fab>
        <Footer />
    </>
}