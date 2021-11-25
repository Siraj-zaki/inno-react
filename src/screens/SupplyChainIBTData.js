import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import { Button, Typography, IconButton } from '@material-ui/core';
import StickyHeadTable from '../components/StoreInformationTable';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import CountInventoryTable from '../components/CountInventoryTable';
import TransferCancelationTable from '../components/TransferCancelationTable';
import api from '../services/api';
import SupplyChainASNTable from '../components/SupplyChainASNTable';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipLoader from "react-spinners/ClipLoader";
import moment from 'moment'

// function searchingFor(term, StartingDate, EndingDate) {
//     return function (x) {
//         let startingDate = parseInt((new Date(x.packed_items.date).getTime() / 1000).toFixed(0))
//         let endingDate = parseInt((new Date(x.transfer_items.date).getTime() / 1000).toFixed(0))
//         let inputDataStart = parseInt((new Date(StartingDate).getTime() / 1000).toFixed(0))
//         let inputDataEnd = parseInt((new Date(EndingDate).getTime() / 1000).toFixed(0))
//         return x.asn.toLowerCase().includes(term.toLowerCase() || inputDataStart >= startingDate && inputDataEnd <= endingDate) || !term
//     }
// }
export class SupplyChainIBTData extends Component {
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
        return this.state.allData.filter(x => this.dateCompare(x.packed_items.date, !x.transfer_items ? null : x.transfer_items.date)
            &&
            x.asn.toLowerCase().includes(this.state.ibt.toLowerCase()))
    }
    handleChangeLocation = (e) => {
        this.setState({ location: e })
    }
    handleChangeIBT = (e) => {
        this.setState({ ibt: e })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    async componentDidMount() {
        const ASN = await api.getASN()
        let filtering = ASN.filter((item => item.operation_name === "receiving"))
        this.setState({ ASN: filtering, allData: filtering })

        console.log(ASN);
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
                                <h1 className="dashboard-heading">IBT Data (Receiving)</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '30%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column', minHeight: 'auto' }} noValidate={false} autoComplete="off">
                                        <BasicTextFields secure={'date'} margin={10} placeholder="Starting Date" name="Starting Date" value={this.state.startingDate} onChangeEvent={(e) => this.setState({ startingDate: e.target.value })} />
                                        <BasicTextFields secure={'date'} margin={10} placeholder="Ending Date" name="Ending Date" value={this.state.endingDate} onChangeEvent={(e) => this.setState({ endingDate: e.target.value })} />
                                    </form>
                                    <form style={{ width: '30%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', minHeight: 'auto' }} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="IBT" value={this.state.ibt} onChangeEvent={(e) => this.setState({ ibt: e.target.value })} />
                                        <BasicTextFields margin={10} name="Remarks" value={this.state.remarks} onChangeEvent={(e) => this.setState({ remarks: e.target.value })} />
                                        {/* <Select
                                            value={this.state.device}
                                            onChange={(e) => this.handleChangeDevice(e)}
                                            options={devices}
                                            isSearchable={true}
                                            placeholder={"All Destinations"}
                                            className="last-scan-select-2 black"
                                            styles={customStyles}
                                        />
                                        <Select
                                            value={this.state.location}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeLocation(e)}
                                            options={location}
                                            isSearchable={true}
                                            placeholder={"All Source"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        /> */}
                                        {/* <Select
                                            value={this.state.device}
                                            onChange={(e) => this.handleChangeDevice(e)}
                                            options={devices}
                                            isSearchable={true}
                                            placeholder={"All Status"}
                                            className="last-scan-select-2 black"
                                            styles={customStyles}
                                        /> */}
                                    </form>
                                    {/* <form style={{ width: '30%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off"> */}



                                    {/* </form> */}
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button onClick={(e) => this.searchFunction(e)} type="submit" variant="contained">Search</Button>
                            </div>
                            <SupplyChainASNTable asn={this.state.ASN} />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SupplyChainIBTData
