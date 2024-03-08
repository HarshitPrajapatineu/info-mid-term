import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Mapper = ({
    element,
    onEvent = () => { },
    data
}) => {

    const renderTextField = () => {
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
                onChange={(e) => { onEvent({ action: "oninputchange", field: element.id, value: e.target.value }); }}
            />
        </>)
    }

    const renderTextArea = () => {
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
                onChange={(e) => { onEvent({ action: "oninputchange", field: element.id, value: e.target.value }); }}
                autoFocus />
        </>)
    }

    const renderButton = () => {
        const d = element.data
        return (<>
            <Button
                variant="contained"
                type={d.type}
                fullWidth
                disabled={d.disabled}
                onClick={(e) => { onEvent({ action: "submit", e: e }) }}
                key={element.id}
                sx={{ mt: 3, mb: 2 }}>
                {d.label}

            </Button>
        </>)
    }

    const renderAlert = () => {
        const d = element.data
        return (<>
            <Alert
                variant="filled"
                style={{ width: "92%" }}
                sx={{ display: d.display }}
                key={element.id}
                severity={d.severity}>
                {d.label}
            </Alert>
        </>)
    }

    const renderHeading = () => {
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

    const renderPasswordText = () => {
        const d = element.data
        return (
            <>
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
                    onChange={(e) => { onEvent({ action: "oninputchange", field: element.id, value: e.target.value }); }}
                    type="password"
                />
            </>
        )
    }

    const renderRadioButtonGroup = () => {
        const d = element.data
        return (
            <Box width={'100%'} >
                <FormControl>
                    <Typography variant="body1" id={element.id}>{d.label} : </Typography>
                    <RadioGroup row
                        sx={{
                            alignItems: 'right',
                        }}
                        aria-labelledby={element.id}
                        name="controlled-radio-buttons-group"
                        value={d.default}
                        onChange={(e) => { onEvent({ action: "onradiobuttonchange", field: element.id, value: e.target.value }); }}
                    >
                        {d && d.options.map((option) =>
                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                        )}
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }

    switch (element.type) {

        case "textfield":
            return renderTextField()

        case "textarea":
            return renderTextArea()

        case "button":
            return renderButton()

        case "alert":
            return renderAlert()

        case "heading":
            return renderHeading()

        case "password":
            return renderPasswordText()

        case "radiobutton":
            return renderRadioButtonGroup()

        default:
            break;
    }


}