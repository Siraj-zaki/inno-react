import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Collapse, IconButton } from '@mui/material';
import BasicTextFields from './Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FlareIcon from '@mui/icons-material/Flare';
// import ShoppingIcon from '../assets/shopping.png'
import tagTop from '../assets/tagstop.png'
import ShoppingIcon from '../assets/TAGS.png'
import TargetIcon from '../assets/target.png'
import EnhancedTable from './MapTable';
function MapSidebar({ drawer, data }) {
    const [cluster, setCluster] = useState(true)
    const [item, setItem] = useState(true)
    const [zone, setZone] = useState(true)
    const [pin, setPin] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [close, setClose] = useState(false)
    const [properties, setProperties] = useState(false)
    const [assets, setAssets] = useState([])
    const [assets1, setAssets1] = useState([])
    const [permissions, setPermissions] = useState([])
    const clusterBtnHandler = () => {
        setCluster(true)
        setPin(false)
    }
    const pinBtnHandler = () => {
        setCluster(false)
        setPin(true)
    }
    const filterSearch = (e) => {
        setSearchVal(e.target.value)
        setAssets(dateFilter())
    }
    const checkedVal = (e) => {
        console.log(permissions.includes(e.target.value), 'value')
        if (permissions.includes(e.target.value)) {

            setPermissions(permissions.filter(val => val !== e.target.value))
        } else {
            setPermissions([...permissions, e.target.value])
        }
    }
    const checkedValChild = (e, data) => {
        if (permissions.includes(e.target.value)) {

            setPermissions(permissions.filter(val => val !== e.target.value))
        } else {
            setPermissions([...permissions, e.target.value])
        }
    }
    const checkedValChildPin = (e, data) => {
        setProperties(data)
        setPin(!pin)
        setCluster(!cluster)
    }
    useEffect(() => {
        setClose(drawer)
    }, [drawer])
    useEffect(() => {
        setAssets(data)
        setAssets1(data)
        setPermissions(data)
    }, [data])

    const dateFilter = () => {
        return assets1.filter(x => x.properties.asset_EPC.toLowerCase().includes(searchVal.toLowerCase()))
    }
    console.log(data, 'datatatatatatata');
    return (
        <div style={{
            position: 'absolute',
            left: close ? -300 : 0,
            top: 0,
            zIndex: 4000,
            backgroundColor: '#373E43',
            width: 300,
            transition: 'all .4s',
            height: "100%"
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minHeight: 60 }} >
                <button className="btn-map" onClick={() => clusterBtnHandler()} style={{ backgroundColor: cluster ? "#373E43" : 'gray', minWidth: '100px', flex: 2, height: '3rem', outline: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <MenuIcon htmlColor="white" />
                    Cluster
                </button>
                <button className="btn-map" onClick={() => pinBtnHandler()} style={{ backgroundColor: pin ? "#373E43" : "gray", minWidth: '100px', flex: 2, height: '3rem', outline: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LocationOnIcon htmlColor="white" />
                    Pin
                </button>
                <button className="btn-map btn-map-cross" onClick={() => setClose(!close)} style={{ backgroundColor: "gray", minWidth: '60px', flex: 1, height: '3rem', outline: 'none', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CloseIcon htmlColor="white" fontSize="large" />
                </button>
            </div>
            {cluster &&
                <div>
                    <div style={{ width: '100%', justifyContent: 'center', alignItems: "center", marginBottom: 10, display: "flex", padding: 10 }}>
                        <BasicTextFields require name="Keywords" value={searchVal} onChangeEvent={(e) => filterSearch(e)} />
                    </div>
                    <div className="dashboard-header" style={{ position: 'relative' }}>
                        <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => setItem(!item)}>
                            {item ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                        </IconButton>
                        <img src={tagTop} style={{ objectFit: 'contain' }} width='25px' height='25px' />
                        <h1 className="dashboard-heading">ITEMS ({data && data.length})</h1>
                        <div style={{ position: 'absolute', right: 0 }}>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="All"
                                    onChange={(e) => checkedVal(e)}
                                    control={<Checkbox defaultChecked={true} style={{ color: 'black' }} color="black" />}
                                    label="All"
                                    // checked={permissions.includes('All')}
                                    defaultChecked={true}
                                    style={{ color: 'black' }}
                                    labelPlacement="end"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <Collapse in={item} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', wordBreak: 'break-all' }}>
                            <FormControl >
                                <FormGroup aria-label="position">
                                    {assets && assets.map((item =>
                                        <div className="tags" style={{ height: 33 }}>
                                            <Checkbox value={item.properties.asset_EPC} defaultChecked={permissions && permissions.includes(item.properties.asset_EPC)}
                                                checked={permissions && !permissions.includes(item.properties.asset_EPC)}
                                                onChange={(e) => checkedValChild(e, item.properties)}
                                                style={{ color: 'white' }} color="white"
                                            />
                                            <FormLabel
                                                style={{ color: 'white' }}
                                                onClick={(e) => checkedValChildPin(e, item.properties)}
                                            >
                                                <React.Fragment>
                                                    <img src={ShoppingIcon} width='25px' height='25px' style={{ objectFit: 'contain' }} />
                                                    {item.properties.asset_EPC}
                                                </React.Fragment>
                                            </FormLabel>
                                        </div>
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </div>
                        {/* <EnhancedTable /> */}
                    </Collapse>
                </div >
            }
            {
                pin &&
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', width: '100%' }}>
                    <div className={`map-table-3`} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10 }} >
                        <img src={ShoppingIcon} width='30px' height='30px' style={{ objectFit: 'contain' }} />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', fontFamily: "Open Sans, sans-serif" }}>
                            <h2 style={{ fontSize: 14, opacity: 0.8, color: 'white', fontFamily: 'inherit' }}>{properties.asset_name && properties.asset_name}</h2>
                            <h2 style={{ fontSize: 13, opacity: 0.8, color: 'white', fontFamily: 'inherit' }}>{properties.asset_EPC && properties.asset_EPC}</h2>
                        </div>
                        <div style={{ width: 28, height: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0089c4', borderRadius: 3 }}>
                            <FlareIcon htmlColor="white" />
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }} >
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>RFID TAGS</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>{properties.asset_EPC && properties.asset_EPC}</h2>
                        </div>
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>DESCR</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>{properties.assetDetails && properties.assetDetails[0] ? properties.assetDetails[0].Description : "Empty"}</h2>
                        </div>
                        {/* <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>lastDetectTime</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>09/06/2021 18:26:20</h2>
                        </div>
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>Location</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>54.743567;24.680023</h2>
                        </div>
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>locationXYZ</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>10.5;123.4</h2>
                        </div>
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>source</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>ALEABUDHABIPORTS</h2>
                        </div>
                        <div className="map-table-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%', padding: 5 }}>
                            <h2 style={{ fontSize: 14, color: 'white', fontWeight: 'lighter', fontFamily: 'inherit' }}>zone</h2>
                            <h2 style={{ fontSize: 13, color: 'white', fontFamily: 'inherit' }}>Shelf_002</h2>
                        </div> */}
                    </div>
                </div>
            }
        </div >
    )
}
export default MapSidebar


