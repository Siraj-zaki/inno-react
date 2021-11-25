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
import TransferCancelationTable from '../components/TransferCancelationTable';
import Select from 'react-select';
import { toast } from 'react-toastify'
import api from '../services/api';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment'
export class Users extends Component {
    state = {
        date: "",
        IBT: "",
        status: "",
        ibt: '',
        ASN: [],
        open: true,
        allData: [],
        startingDate: '',
        searchData: [],
        Site: [],
        endingDate: '',
    }
    async componentDidMount() {
        const ASN = await api.getASN()
        this.setState({ ASN: ASN, allData: ASN, searchData: ASN })
        const Site = await api.getAllSite()
        this.setState({ Site })
        console.log(this.state.Site);
        console.log(this.state.ASN);
    }
    searchFunction = (e) => {
        e.preventDefault()
        this.setState({ ASN: this.dateFilter() })
        // console.log(this.dateFilter());
        // alert(this.state.device.label)
    }
    clearFunction = () => {
        this.setState({ ASN: this.state.allData })
    }
    dateCompare = (sDate) => {
        let { startingDate, } = this.state
        if (!startingDate) {
            return true
        }
        startingDate = moment(startingDate)
        let sDiff = moment(sDate).diff(startingDate, "days");
        if (sDiff >= 0)
            return true
        return false
    }
    dateFilter = () => {
        return this.state.allData.filter(x => this.dateCompare(x.packed_items.date)
            && x.siteId.site_name.toLowerCase().includes(!this.state.status.value ? null : this.state.status.value.toLowerCase())
            && x.asn.toLowerCase().includes(this.state.ibt.toLowerCase()))
        // return this.state.allData.filter(x =>
        //     x.packed_items && x.packed_items.date ? this.dateCompare(x.packed_items.date) : false
        //         && x.siteId.site_name.toLowerCase().includes(this.state.status.value.toLowerCase())
        //         && x.asn.toLowerCase().includes(this.state.ibt.toLowerCase()))
    }
    filterNameEvent = (e) => {
        this.setState({ date: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ IBT: e.target.value })
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })

    }
    render() {
        const stores = [
            { label: 'All Stores' },
            { label: 'New Stores' },
            { label: 'Old Stores' },
        ];
        const store = this.state.Site.map((item => { return { label: item.site_name, value: item.site_name } }))
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
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Transfer Cancel IBT Data</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={(e) => this.searchFunction(e)} noValidate={false} autoComplete="off">
                                        <Select
                                            value={this.state.status}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeStatus(e)}
                                            options={store}
                                            isSearchable={true}
                                            placeholder={"All Sites"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                        <BasicTextFields name={"Date"} secure={"date"} value={this.state.startingDate} onChangeEvent={(e) => this.setState({ startingDate: e.target.value })} />
                                        <BasicTextFields name="IBT" value={this.state.ibt} onChangeEvent={(e) => this.setState({ ibt: e.target.value })} />

                                        {/* <Button variant="contained" color="secondary">Add User</Button> */}
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" onClick={this.searchFunction} variant="contained">Search</Button>
                                <Button type="submit" onClick={this.clearFunction} variant="contained">Clear Filter</Button>
                            </div>
                            <TransferCancelationTable asn={this.state.ASN} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Users
