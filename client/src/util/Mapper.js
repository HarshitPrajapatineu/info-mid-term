import { Alert, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export const Mapper = ({
    element,
    onEvent = () => { },
    data,
    defaultValue,
    options
}) => {

    const [value, setValue] = useState(defaultValue);

    const rows = [];
    const columns = [];
    const [rowModesModel, setRowModesModel] = useState({});

    const [paginationModel, setPaginationModel] = useState(options?.paginationModel);
    const [loading, setLoading] = useState(false);


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
                value={defaultValue}
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
                value={defaultValue}
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
                onClick={(e) => {e.preventDefault(); onEvent({ action: d.action, e: e }) }}
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

    const renderDivider = () => {
        return (
            <>
                <Divider orientation="horizontal" variant="fullWidth" />
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
                        defaultValue={defaultValue}
                        value={value}
                        onChange={(e) => { setValue(e.target.value); onEvent({ action: "oninputchange", field: element.id, value: e.target.value }); }}
                    >
                        {d && d.options.map((option) =>
                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                        )}
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }

    const composeColumns = () => {
        const cols = Object.keys(data[0]);
        cols.map((col) => {
            if (col !== '_id') {
                columns.push({
                    field: col,
                    headerName: col.toUpperCase(),
                    type: 'string',
                    width: 180,
                    align: 'left',
                    headerAlign: 'left',
                    editable: false,
                });
            }
        });
        if (element?.data?.actions) {
            addActionColumn(element?.data?.actions)
        }
        console.log(columns);
        return columns;
    }

    const addActionColumn = (actions) => {
        columns.push({
            field: "actions",
            headerName: "ACTIONS",
            type: 'actions',
            width: 180,
            align: 'left',
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const acts = [];
                actions.map((action) => {
                    acts.push(
                        <GridActionsCellItem
                            icon={<Icon>{action.icon}</Icon>}
                            label={action.label}
                            disabled={localStorage.getItem("userId") === id}

                            className="textPrimary"
                            onClick={() => { onEvent({ action: action?.action, id: id }); }}
                            color="inherit"
                        />
                    )
                });

                console.log(acts);
                return acts;
            }
        })
    }

    const composeRows = () => {
        data.map((row, idx) => {
            rows.push({ ...row, id: row._id })
        });
        console.log(rows);
    }

    const renderTable = () => {
        function EditToolbar(props) {
            const { setRowModesModel } = props;

            const handleClick = () => {
                const id = 1;
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
                }));
            };

            return (
                <GridToolbarContainer>
                    <Button color="primary" startIcon={<Icon>{"add_icon"}</Icon>} onClick={handleClick}>
                        Add record
                    </Button>
                </GridToolbarContainer>
            );
        }

        return <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                rowModesModel={rowModesModel}
                pagination
                pageSizeOptions={[5]}
                paginationMode="server"
                loading={loading}
                rowCount={100}
                onPaginationModelChange={() => { setPaginationModel(); options?.setPaginationModel() }}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRowModesModel },
                }}
            />
        </Box>
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

        case "datatable":
            composeColumns();
            composeRows();
            return renderTable()

        case "divider":
            return renderDivider()

        default:
            break;
    }


}