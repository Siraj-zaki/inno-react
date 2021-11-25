import React, { Component } from 'react'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import BasicTextFields from '../components/Input'
import { Button, IconButton } from '@material-ui/core';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import api from '../services/api';
import SupplyChainASNTable from '../components/SupplyChainASNTable';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipLoader from "react-spinners/ClipLoader";
import SupplyChainIBTDataPacking from './SupplyChainIBTDataPacking';
import SupplyChainASNDispatchTable from '../components/SupplyChainASNDispatchTable';
import moment from 'moment';
export class SupplyChainIBTDataDispatch extends Component {
    state = {
        location: '',
        ASN: [],
        device: '',
        openModal: false,
        open: true,
        loading: true,
        startingDate: "",
        endingDate: "",
        ibt: "",
        allData: []
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
    searchFunction = (e) => {
        e.preventDefault()
        const newarray = this.state.ASN
        if (!this.state.startingDate) {
            return alert("PLease select Starting Date")
        } else if (!this.state.endingDate) {
            return alert('Please Select Ending Date')
        } else {
            this.setState({ ASN: this.dateFilter() })
        }
    }
    dateCompare = (sDate, eDate) => {
        let { startingDate, endingDate } = this.state
        if (!startingDate && !endingDate) {
            return true
        }
        startingDate = moment(startingDate)
        endingDate = moment(endingDate)
        let sDiff = moment(sDate).diff(startingDate, "days");
        let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
        if (sDiff >= 0 && eDiff <= 0)
            return true
        return false
    }
    dateFilter = () => {
        return this.state.allData.filter(x => this.dateCompare(x.packed_items.date, !x.transfer_items ? null : x.transfer_items.date) && x.asn.toLowerCase().includes(this.state.ibt.toLowerCase()))
    }
    async componentDidMount() {
        const ASN = await api.getASN()
        let filtering = ASN.filter((item => item.operation_name === "transfer out"))
        this.setState({ ASN: filtering, allData: filtering })
        console.log(this.state.ASN);
        if (ASN) {
            this.setState({ loading: false })
        }
    }
    render() {
        const location = [
            { label: 'Pakistan' },
            { label: 'India' },
        ];
        const devices = [
            { label: 'Zerbra Device' },
            { label: 'BarCode Device' },
            { label: 'QrCode Device' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
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
                <CustomModal image open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">IBT Data(Dispatch)</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '30%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column', minHeight: 'auto' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields secure={'date'} margin={10} placeholder="Starting Date" name="Starting Date" value={this.state.startingDate} onChangeEvent={(e) => this.setState({ startingDate: e.target.value })} />
                                        <BasicTextFields secure={'date'} margin={10} placeholder="Ending Date" name="Ending Date" value={this.state.endingDate} onChangeEvent={(e) => this.setState({ endingDate: e.target.value })} />

                                    </form>
                                    <form style={{ width: '30%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', minHeight: 'auto' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="IBT" value={this.state.ibt} onChangeEvent={(e) => this.setState({ ibt: e.target.value })} />
                                        <BasicTextFields margin={10} name="Remarks" value={this.state.remarks} onChangeEvent={(e) => this.setState({ remarks: e.target.value })} />
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button onClick={(e) => this.searchFunction(e)} type="submit" variant="contained">Search</Button>
                            </div>
                            <SupplyChainASNDispatchTable asn={this.state.ASN} />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SupplyChainIBTDataDispatch
