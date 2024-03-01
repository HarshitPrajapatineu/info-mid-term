import { Alert, Button, TextField, Typography } from "@mui/material";

export const Mapper = (element) => {

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
                key={element.id}
                />
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
                key={element.id}
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
                key={element.id}
                sx={{ mt: 3, mb: 2 }}>
                {d.label}
            </Button>
        </>)
    }

    const renderAlert = (element) => {
        const d = element.data
        return ( <>
            <Alert
                variant="outlined"
                sx={{ display: d.display }}
                key={element.id}
                severity={d.severity}>
                {d.label}
            </Alert>
        </>)
    }

    const renderHeading = (element) => {
        const d = element.data
        return (
            <Typography 
            key={element.id}
            component={d.component} 
            variant={d.variant}>
              {d.label}
            </Typography>
            )
    }

    switch (element.type) {

        case "textfield":
            return renderTextField(element)

        case "textarea":
            return renderTextArea(element)

        case "button":
            return renderButton(element)

        case "alert":
            return renderAlert(element)

        case "heading":
            return renderHeading(element)

        default:
            break;
    }

    
}