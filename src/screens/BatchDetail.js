import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import BasicTextFields from '../components/Input';
import ViewIBTDetailTable from '../components/ViewIBTDetailTable';
import '../css/Dashboard.css';
import api from '../services/api';

export class BatchDetail extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        IBTDetail: [],
        loader: true,
        loading: true,
    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }
    async componentDidMount() {
        // console.log(this.props.location.state._id);
        // alert(this.props.location.state._id)
        let ASN_id = this.props.location.state._id

        const IBTDetail = await api.getBatchDetailbyASN(this.props.location.state._id)
        this.setState({ IBTDetail, loader: false })
        console.log(this.state.IBTDetail);
        if (IBTDetail) {
            this.setState({ loading: false })
        }
    }

    onSubmitEvent = (e) => {
        e.preventDefault()
        let search = {
            date: this.state.filterName,
            serialNumber: this.state.filterUsername,
        }
        const { date, serialNumber } = search
        if (date && serialNumber !== "") {
            this.setState({ filterSearch: search })
        } else {
            alert("Please Enter Data First")
        }
    }
    render() {

        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">View IBT Details</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <BasicTextFields name={"Date"} placeholder={"Date"} secure={"date"} value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields name="Serial Number" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />

                                    {/* <Button variant="contained" color="secondary">Add User</Button> */}
                                </form>
                            </div>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" variant="contained">Search</Button>
                            </div>
                            <ViewIBTDetailTable zone={this.props.location.state.zone.zone_name} loader={this.state.loader} perData={this.props.location.state} ibt={this.state.IBTDetail} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default BatchDetail
