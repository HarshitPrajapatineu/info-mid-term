import { Alert, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import { useState } from "react";

export const Mapper = ({
    element,
    onEvent = () => { },
    data
}) => {


    const [value, setValue] = useState(element?.data?.default);

    const [rows, setRows] = useState();
    const [rowModesModel, setRowModesModel] = useState({});

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

    const renderDivider = () => {
        return (
            <>
                <Divider />
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
                        defaultValue={d.default}
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

    const renderTable = () => {

        console.log(data);

        let columns = [];

        const handleRowEditStop = (params, event) => {
            if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                event.defaultMuiPrevented = true;
            }
        };

        const handleEditClick = (id) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        };

        const handleSaveClick = (id) => () => {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        };

        const handleDeleteClick = (id) => () => {
            setRows(rows.filter((row) => row.id !== id));
        };

        const handleCancelClick = (id) => () => {
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            });

            const editedRow = rows.find((row) => row.id === id);
            if (editedRow.isNew) {
                setRows(rows.filter((row) => row.id !== id));
            }
        };

        const processRowUpdate = (newRow) => {
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        };

        const handleRowModesModelChange = (newRowModesModel) => {
            setRowModesModel(newRowModesModel);
        };

        function EditToolbar(props) {
            const { setRows, setRowModesModel } = props;

            const handleClick = () => {
                const id = 1;
                setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
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


        const getActions = ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<Icon>{"save_icon"}</Icon>}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<Icon>{"cancel_icon"}</Icon>}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<Icon>{"edit_icon"}</Icon>}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<Icon>{"delete_icon"}</Icon>}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />,
            ];
        }

        const createColumns = () => {
            let columns = [];
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
                    })
                }
            });
            console.log(columns);
            return columns;
        }
        const cols = [
            { field: 'name', headerName: 'Name', width: 180, editable: true },
            {
                field: 'age',
                headerName: 'Age',
                type: 'number',
                width: 80,
                align: 'left',
                headerAlign: 'left',
                editable: true,
            },
            {
                field: 'joinDate',
                headerName: 'Join date',
                type: 'date',
                width: 180,
                editable: true,
            },
            {
                field: 'role',
                headerName: 'Department',
                width: 220,
                editable: true,
                type: 'singleSelect',
                valueOptions: ['Market', 'Finance', 'Development'],
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,

                cellClassName: 'actions',
                getActions: getActions({}),
            },
        ];

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
                rows={data}
                columns ={createColumns()}
                // editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                rowSelection
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
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
            return renderTable()

        case "divider":
            return renderDivider()

        default:
            break;
    }


}