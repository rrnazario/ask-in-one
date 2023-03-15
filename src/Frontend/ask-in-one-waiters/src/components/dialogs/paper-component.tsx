import { Paper } from "@mui/material";
import Draggable from "react-draggable";

export function PaperComponent(props: any) {
    return (
        <Draggable
            handle={`#${props.handleArea ?? "draggable-dialog-title"}`}
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}