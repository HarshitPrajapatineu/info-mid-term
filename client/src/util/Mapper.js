import { Alert, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, Select, TextField, Toolbar, Typography, styled } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import { forwardRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import PostCard from "../components/PostCard/PostCard";

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
                onClick={(e) => { e.preventDefault(); onEvent({ action: d.action, e: e }) }}
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

    const renderSelectDropdown = () => {
        const d = element.data
        return (
            <>
                <Typography
                    id={element.id}
                    htmlFor="object-value-default-button"
                >
                    {d.label}
                </Typography>
                <Select
                    value={defaultValue}
                    name={d.name}
                    id="object-value-default-button"
                    aria-labelledby="object-value-default-label object-value-default-button"
                    placeholder="Choose a character…"
                    onChange={(e, newValue) => { onEvent({ action: "oninputchange", field: element.id, value: newValue }); }}
                >
                    {d && d.options.map((option) =>
                        <Option key={option.label} value={option.value}>{option.label}</Option>
                    )}
                </Select>
            </>
        )
    }

    function Select(props) {
        const slots = {
            root: StyledButton,
            listbox: Listbox,
            popup: Popup,
            ...props.slots,
        };

        return <BaseSelect {...props} slots={slots} />;
    }

    Select.propTypes = {
        /**
         * The components used for each slot inside the Select.
         * Either a string to use a HTML element or a component.
         * @default {}
         */
        slots: PropTypes.shape({
            listbox: PropTypes.elementType,
            popup: PropTypes.elementType,
            root: PropTypes.elementType,
        }),
    };

    const blue = {
        100: '#DAECFF',
        200: '#99CCF3',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const CustomButton = forwardRef(function CustomButton(props, ref) {
        const { ownerState, ...other } = props;
        return (
            <button
                type="button"
                {...other}
                ref={ref}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span>{other.children}</span>
                <Icon>{"unfold_more_rounded_icon"}</Icon>
            </button>
        );
    });

    CustomButton.propTypes = {
        children: PropTypes.node,
        ownerState: PropTypes.object.isRequired,
    };

    const StyledButton = styled(CustomButton, { shouldForwardProp: () => true })(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        min-width: 320px;
        padding: 8px 12px;
        border-radius: 8px;
        text-align: left;
        line-height: 1.5;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      
        &:hover {
          background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
          border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
        }
      
        &.${selectClasses.focusVisible} {
          outline: 0;
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
      
        & > svg {
          font-size: 1rem;
          vertical-align: middle;
        }
        `,
    );

    const Listbox = styled('ul')(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 320px;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 2px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
            };
        `,
    );

    const Option = styled(BaseOption)(
        ({ theme }) => `
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;
      
        &:last-of-type {
          border-bottom: none;
        }
      
        &.${optionClasses.selected} {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
      
        &.${optionClasses.highlighted} {
          background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
          color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        }
      
        &.${optionClasses.highlighted}.${optionClasses.selected} {
          background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
          color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
        }
      
        &:focus-visible {
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
        `,
    );

    const Popup = styled('div')`
        z-index: 1;
      `;


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
                    width: 140,
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
            width: 100,
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

    const renderPostCardList = () => {
        return (
            <Box
            sx={{
              marginTop: 2
            }}
          >
                {/*
                render post on iteration of coming data if data changes
                */}
                {
                    data.map((pcard, idx) => {
                        return (<>
                            <PostCard key={idx} data={pcard}>

                            </PostCard>
                            <Toolbar variant='dense' ></Toolbar>
                        </>
                        )})
                }
            </Box>
        )
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

        case "dropdown":
            return renderSelectDropdown()

        case "radiobutton":
            return renderRadioButtonGroup()

        case "datatable":
            composeColumns();
            composeRows();
            return renderTable()

        case "divider":
            return renderDivider()

        case "postcardlist":
            return renderPostCardList()

        default:
            break;
    }


}