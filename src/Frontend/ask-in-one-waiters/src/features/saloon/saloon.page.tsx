import { Fab } from "@mui/material";
import { useState } from "react";
import Footer from "../../components/footer/footer.component";
import AskTitle from "../../components/title/asktitle.component";
import AddIcon from '@mui/icons-material/Add';
import { SaloonTable, SaloonTableProps } from "./saloon-table";
import { HandleTableModal } from "./handle-table.modal";
import { ConfirmationDialog } from "../../components/dialogs/confirmation.dialog";

const defaultTables: SaloonTableProps[] = [
    {
        id: "1", items: [
            {
                name: 'Coca-Cola 1L',
                amount: 2,
                price: 3.50
            }
        ]
    },
    {
        id: "2", items: [
            {
                name: 'Coca-Cola 1L',
                amount: 2,
                price: 3.50
            },
            {
                name: 'Pizza da casa',
                amount: 2,
                price: 7
            }
        ]
    },
]

export function Saloon() {
    const [tables, setTables] = useState<SaloonTableProps[]>(defaultTables);
    const [currentTable, setCurrentTable] = useState<SaloonTableProps>();
    const [handleTableModalVisible, setHandleTableModalVisible] = useState(false);
    const [handleConfirmationVisible, setHandleConfirmationVisible] = useState(false);

    const onAddTable = async () => {
        await setCurrentTable(undefined);
        await setHandleTableModalVisible(true);
    }

    const onEditTable = async (table: SaloonTableProps) => {
        await setCurrentTable(table);
        await setHandleTableModalVisible(true);
    }

    const onCancelTable = async (table: SaloonTableProps) => {
        await setCurrentTable(table);
        await setHandleConfirmationVisible(true);
    }

    const onPayTable = async (table: SaloonTableProps) => {
        console.log('pay ' + table.id)
    }

    const drawSaloonTables = () => {
        return tables
            //.sort((a, b) => Number(a.id) - Number(b.id))
            .map((table, index) => <SaloonTable
                key={index}
                id={table.id}
                items={table.items}
                onEdit={onEditTable}
                onCancel={onCancelTable}
                onPay={onPayTable}
            />)
    }

    return <>
        <AskTitle text="Mesas" />

        <div style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>
            {tables && drawSaloonTables()}
        </div>

        <Fab size="medium" color="primary" aria-label="add" sx={{
            position: 'fixed', bottom: 66, right: 10
        }} onClick={onAddTable}>
            <AddIcon />
        </Fab>

        {handleTableModalVisible && <HandleTableModal
            item={currentTable!}
            title={currentTable ? `Editando Mesa ${currentTable.id}` : 'Nova Mesa'}
            onClose={async () => await setHandleTableModalVisible(false)}
            onSave={async (item: SaloonTableProps) => {
                if (currentTable) {
                    const index = tables.findIndex(t => t.id === currentTable.id);
                    tables.splice(index, 1, item)

                    await setTables(tables);
                }
                else {
                    await setTables([...tables,
                    {
                        id: String(item.id),
                        items: [],
                        onEdit: onEditTable,
                        onCancel: onCancelTable,
                        onPay: onPayTable
                    }])
                }

                await setHandleTableModalVisible(false)
            }}
        />}

        {handleConfirmationVisible && <ConfirmationDialog
            item={currentTable!}
            dialogText={`Deseja realmente excluir a mesa ${currentTable?.id} ?`}
            onClose={async () => await setHandleConfirmationVisible(false)}
            onConfirm={async (item) => {
                const index = tables.findIndex(t => t.id === item.id);
                tables.splice(index, 1)
                await setTables(tables);

                await setHandleConfirmationVisible(false);
            }}
            open={handleConfirmationVisible}
        />}

        <Footer />
    </>
}