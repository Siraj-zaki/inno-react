import React, { Component } from 'react'
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import BasicTextFields from '../components/Input'
import { Button, Typography } from '@material-ui/core';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CustomModal from '../components/CustomModal';
import ZPLImage from '../assets/zplPrinterImagepng.png'
export class ZPLPrinter extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
    }
    onSubmitEvent = () => {
        console.log("User")
    }
    handleChangeLocation = (e) => {
        this.setState({ location: e })
    }
    handleChangeDevice = (e) => {
        this.setState({ device: e })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    render() {
        const location = [
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                height: 33,
                marginTop: 10,
                backgroundColor: 'transparent',
            }),
            menu: base => ({
                ...base,
                zIndex: 30
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
        };
        return (
            <React.Fragment>
                <CustomModal ZPLData open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} />
                <form>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">ZPL Printer</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'transparent', flexWrap: 'wrap', backgroundColor: "#37474f" }}>
                                <div style={{ flex: 2, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <FormControl component="fieldset">
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Auto Print"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Auto Print"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="start"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                        <Button onClick={() => this.handleClickOpen()} color="secondary" variant="contained">Details</Button>
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields name="UUID" value={this.state.UUID} onChangeEvent={(e) => this.setState({ UUID: e.target.value })} />
                                        <BasicTextFields name="QTY" value={this.state.QTY} onChangeEvent={(e) => this.setState({ QTY: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields name="Product Name" value={this.state.productName} onChangeEvent={(e) => this.setState({ productName: e.target.value })} />
                                        <BasicTextFields name="SKU" value={this.state.SKU} onChangeEvent={(e) => this.setState({ SKU: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields name="Retail_Product_Color" value={this.state.retailProductColor} onChangeEvent={(e) => this.setState({ retailProductColor: e.target.value })} />
                                        <BasicTextFields name="Retail_Product_Price" value={this.state.retailProductPrice} onChangeEvent={(e) => this.setState({ retailProductPrice: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <Button onClick={() => window.print()} color="secondary" variant="contained">Print</Button>
                                    </div>
                                </div>
                                <div style={{ flex: 1, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <Typography style={{ color: "whitesmoke" }} >Image Preview Not Availiable</Typography>
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', }}>
                                        <img src={ZPLImage} alt="" width='200' height="200" style={{ objectFit: 'contain' }} srcset="" />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields name="EPC" value={this.state.EPC} onChangeEvent={(e) => this.setState({ EPC: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ flex: 1, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <Typography style={{ color: "whitesmoke" }} >Image Preview Not Availiable</Typography>
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'coloumn' }}>
                                        <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={location} isSearchable={true} placeholder={"123123"} className="last-scan-select-2" styles={customStyles} />
                                        <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={location} isSearchable={true} placeholder={"Normal_ZPL"} className="last-scan-select-2" styles={customStyles} />
                                        <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={location} isSearchable={true} placeholder={"RFFID"} className="last-scan-select-2" styles={customStyles} />
                                        <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={location} isSearchable={true} placeholder={""} className="last-scan-select-2" styles={customStyles} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ZPLPrinter
