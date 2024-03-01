import { Alert, Button, TextField } from "@mui/material";

export const Mapper = (element) => {


    switch (element.type) {

        case "textfield":
            return renderTextField(element)

        case "textarea":
            return renderTextArea(element)

        case "button":
            return renderButton(element)

        case "alert":

            return <>
                <Alert
                    variant="outlined"
                    sx={{ display: d.display }}
                    severity={d.severity}>
                    {d.label}
                </Alert>
            </>
        default:
            break;
    }

    const renderTextField = (element) => {
        const d = element.data
        return (<>
            <TextField
                margin="normal"
                required={d.required}
                fullWidth
                id={element.id}
                label={d.label}
                name={d.name}
                autoComplete={d.name}
                disabled={d.disabled}
                autoFocus />
        </>)
    }

    const renderTextArea = (element) => {
        const d = element.data
        return (<>
            <TextField
                margin="normal"
                required={d.required}
                fullWidth
                id={element.id}
                label={d.label}
                name={d.name}
                autoComplete={d.name}
                disabled={d.disabled}
                multiline
                rows={6}
                autoFocus />
        </>)
    }

    const renderButton = (element) => {
        const d = element.data
        return (<>
            <Button
                variant="contained"
                type={d.type}
                fullWidth
                disabled={d.disabled}
                sx={{ mt: 3, mb: 2 }}>
                {d.label}
            </Button>
        </>)
    }
}