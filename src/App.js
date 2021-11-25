import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PersistentDrawerLeft from './components/drawer'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard';
import Footer from './components/Footer';
import Users from './screens/Users';
import EditUser from './screens/EditUser';
import Devices from './screens/Devices';
import EditDevice from './screens/EditDevice';
import IBTDetail from './screens/IBTDetail'
import AdminMenu from './screens/AdminMenu'
// import TransferCancelationTable from './components/TransferCancelationTable';
import TransferCancelation from './screens/TransferCancelation';
import ManualIBT from './screens/ManualIBT';
import StoreInformation from './screens/StoreInformation';
import createSite from "./Store/actions/siteActions";
import EditStoreInformation from './screens/EditStoreInformation';
import Printer from './screens/Printer';
import ZPL from './screens/ZPL';
import EditZPL from './screens/EditZPL';
import Audit from './screens/Audit';
import Roles from './screens/Roles';
import EditRoles from './screens/EditRoles';
import CountDashboard from './screens/CountDashboard';
import CountInventory from './screens/CountInventory';
import CountOperation from './screens/CountOperation'
import SupplyChainIBTData from './screens/SupplyChainIBTData';
import SupplyChainGoodSummary from './screens/SupplyChainGoodSummary';
import SupplyChainStoreSummary from './screens/SupplyChainStoreSummary';
import SupplyChainWarehouseSummary from './screens/SupplyChainWarehouseSummary';
import ZPLReport from './screens/ZPLReport';
import ZPLReportSKU from './screens/ZPLReportSKU';
import ZPLPrinter from './screens/ZPLPrinter';
import MapView from './components/mapReport/mapView';
import ScrollableTabsButtonForce from './components/TopDrawer';
import { ToastContainer } from 'react-toastify';
import AddRole from './screens/AddRole';
import AddUser from './screens/AddUser';
import AddDevice from './screens/AddDevice';
import PrivateRoute from './PrivateRoute'
// import MiniDrawer from './components/SideDrawer'
import { connect } from 'react-redux';
import BatchDetail from './screens/BatchDetail';
import EPCDetail from './screens/EPCDetail';
import AnalyticsAssetList from './screens/AnalyticsAssetList';
import SupplyChainIBTDataPacking from './screens/SupplyChainIBTDataPacking';
import SupplyChainIBTDataDispatch from './screens/SupplyChainIBTDataDispatch';
import AnalyticsMaintainece from './screens/AnalyticsMaintainece';
import AnalyticsMovementHistory from './screens/AnalyticsMovementHistory';
import EPCDetailMovement from './screens/EPCDetailMovement';
import AnalyticsMovementReport from './screens/AnalyticsMovementReport';
import ASNDetailByMovement from './screens/ASNDetailByMovement';
import MapSidebar from './components/MapSidebar';
import { withRouter } from 'react-router-dom'
class App extends React.Component {
  state = {
    open: true,
    location1: ''
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }
  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  componentDidMount() {
    this.props.createSite({ modal: false })
    if (window.location.href.split('/').reverse()[0] === "MapReport") {
      this.setState({ location1: '/MapReport' })
    }

  }


  render() {

    // console.log(this.props.user.roleId.permissions, 'APP.JS');
    this.props.history.listen((location, action) => {
      console.log(location.pathname);
      this.setState({ location1: location.pathname })
    })
    return (
      <React.Fragment>
        <ToastContainer className="toastify-custom-class" />
        <Switch >
          <Route path={"/login"} exact component={Login} />
          <div style={{ display: "flex", justifyContent: 'flex-start', width: '100%' }} >
            {this.state.location1 !== '/MapReport' ?
              <div className="App" style={{ width: '20%', backgroundColor: 'transparent' }}>
                <PersistentDrawerLeft permissions={this.props.user} handleDrawerOpen={this.handleDrawerOpen} handleDrawerClose={this.handleDrawerClose} open={this.state.open} />
              </div> : ""}
            <div style={{ paddingTop: 0, width: '80%', flex: 1 }}>
              <ScrollableTabsButtonForce />
              <PrivateRoute component={Dashboard} path="/Dashboard" exact />
              <PrivateRoute component={Dashboard} path="/" exact />
              <PrivateRoute path={"/Count/CountDashboard"} exact component={CountDashboard} />
              <PrivateRoute path={"/Count/CountInventory"} exact component={CountInventory} />
              <PrivateRoute path={"/Count/CountOperation"} exact component={CountOperation} />
              <PrivateRoute path={"/SupplyChain/SupplyChainIBTData"} exact component={SupplyChainIBTData} />
              <PrivateRoute path={"/SupplyChain/SupplyChainIBTDataPacking"} exact component={SupplyChainIBTDataPacking} />
              <PrivateRoute path={"/SupplyChain/SupplyChainIBTDataDispatch"} exact component={SupplyChainIBTDataDispatch} />
              <PrivateRoute path={"/SupplyChain/SupplyChainGoodSummary"} exact component={SupplyChainGoodSummary} />
              <PrivateRoute path={"/SupplyChain/SupplyChainStoreSummary"} exact component={SupplyChainStoreSummary} />
              <PrivateRoute path={"/SupplyChain/SupplyChainWarehouseSummary"} exact component={SupplyChainWarehouseSummary} />
              <PrivateRoute path={"/ZPL/ZPLReport"} exact component={ZPLReport} />
              <PrivateRoute path={"/ZPL/ZPLReportSKU"} exact component={ZPLReportSKU} />
              <PrivateRoute path={"/ZPL/ZPLPrinter"} exact component={ZPLPrinter} />
              <PrivateRoute data={this.props} path={"/MapReport"} exact component={MapView} />
              <PrivateRoute path={"/Users"} exact component={Users} />
              <PrivateRoute path={"/Users/EditUser"} exact component={EditUser} />
              <PrivateRoute path={"/Devices/EditDevice"} exact component={EditDevice} />
              <PrivateRoute path={"/Devices"} exact component={Devices} />
              <PrivateRoute path={"/TransferCancelation"} exact component={TransferCancelation} />
              <PrivateRoute path={"/IBTDetail"} exact component={IBTDetail} />
              <PrivateRoute path={"/EPCDetail"} exact component={EPCDetail} />
              <PrivateRoute path={"/EPCDetailMovement"} exact component={EPCDetailMovement} />
              <PrivateRoute path={"/BatchDetail"} exact component={BatchDetail} />
              <PrivateRoute path={"/ManualIBT"} exact component={ManualIBT} />
              <PrivateRoute path={"/AdminMenu"} exact component={AdminMenu} />
              <PrivateRoute path={"/StoreInformation"} exact component={StoreInformation} />
              <PrivateRoute path={"/StoreInformation/EditStoreInformation"} exact component={EditStoreInformation} />
              <PrivateRoute path={"/Printer"} exact component={Printer} />
              <PrivateRoute path={"/ZPL"} exact component={ZPL} />
              <PrivateRoute path={"/ZPL/EditZPL"} exact component={EditZPL} />
              <PrivateRoute path={"/Audit"} exact component={Audit} />
              <PrivateRoute path={"/Roles"} exact component={Roles} />
              <PrivateRoute path={"/Roles/EditRoles"} exact component={EditRoles} />
              <PrivateRoute path={"/Roles/AddRole"} exact component={AddRole} />
              <PrivateRoute path={"/User/AddUser"} exact component={AddUser} />
              <PrivateRoute path={"/Devices/AddDevice"} exact component={AddDevice} />
              <PrivateRoute path={"/Analytics/AnalyticsAssetList"} exact component={AnalyticsAssetList} />
              <PrivateRoute path={"/Analytics/AnalyticsMaintainece"} exact component={AnalyticsMaintainece} />
              <PrivateRoute path={"/Analytics/AnalyticsMovementHistory"} exact component={AnalyticsMovementHistory} />
              <PrivateRoute path={"/Analytics/AnalyticsMovementReport"} exact component={AnalyticsMovementReport} />
              <PrivateRoute path={"/Analytics/ASNDetailByMovement"} exact component={ASNDetailByMovement} />
              <Footer />
            </div>
          </div>

        </Switch>
      </React.Fragment>
    );
  }
}
// export default App;
const mapStateToProps = (state) => ({
  user: state.createUser.user,
  login: state.createUser.login,
  modal: state.createSite.modal
});
const mapDispatchToProps = (dispatch) => ({
  createSite: (dt) => dispatch(createSite.createSite(dt)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
