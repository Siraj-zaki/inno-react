import './styles.css';
import React, { useRef, useEffect } from 'react';
import { LayersPicker, PinInfo, ZoneMode, MapSideMenu } from './components';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@material-ui/core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "leaflet.markercluster";
import "./Leaflet.Coordinates-0.1.3.min";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { featureCollection, envelope, bbox } from "@turf/turf";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PersistentDrawerLeft from '../drawer'
import centroid from "@turf/centroid";
import createSite from "../../Store/actions/siteActions";
import createZone from "../../Store/actions/siteActions";
import { TextField } from "@material-ui/core";
import MiniDrawer from '../SideDrawer';
import { NavLink } from 'react-router-dom';
import CustomModal from '../CustomModal';
import { connect } from 'react-redux';
import api from '../../services/api';
import MapSidebar from '../MapSidebar';

const baseballIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconAnchor: [16, 37],
});
const useStyles = makeStyles((theme) => ({
    ListItemText: {
        color: 'white',
    },
}));

function MapView(props) {
    const classes = useStyles();
    const mapContainer = useRef();
    const map = useRef();
    const URL = 'https://zebra-hospital.herokuapp.com';
    const GeoJSON_Asset = React.useRef([]);
    const [clicked_zone_asset, set_clicked_zone_asset] = React.useState(false);
    const [openSiteModal, setOpenSiteModal] = React.useState(false);
    const [openZone, setOpenZone] = React.useState(props.zoneModal);
    const [siteId, setSiteId] = React.useState('61698cd115ce490023c44c39');
    const [openDrawer, setOpenDrawer] = React.useState(true);
    const [allSites, setAllSites] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [siteFile, setSiteFile] = React.useState();
    const [mapData, setMapData] = React.useState(null);
    const [siteDetails, setSiteDetails] = React.useState({ "miny": "", "maxx": "", "maxy": "", "minx": "", "name": "" });
    const changeTextField = (event) => {
        setSiteDetails({ ...siteDetails, [event.target.name]: event.target.value });
    }

    const handleCloseSiteModel = () => {
        props.createSite({ modal: false })
        setOpenSiteModal(false);
    };
    const handleOpenModal = (feat) => {
        setMapData(feat)
        setOpenModal(!openModal)
    }
    useEffect(() => {
        if (map.current) {
            if (props.modal === true) {
                map.current.pm.enableDraw('Polygon', {
                    snappable: true,
                    snapDistance: 20,
                });
            } else {
                map.current.pm.disableDraw('Polygon')
            }
            map.current.on('pm:create', (e) => {
                const fg = L.featureGroup();
                map.current.eachLayer((layer) => {
                    if ((layer instanceof L.Polygon) && layer.pm) {
                        fg.addLayer(layer);
                    }
                });

                const features = fg.toGeoJSON().features;
                console.log("props modal", props.modal);
                if (props.modal) {
                    const feat = features[features.length - 1];
                    const _bbox = bbox(feat);
                    // console.log(_bbox, feat);
                    setSiteDetails({ ...siteDetails, "miny": _bbox[1], "maxx": _bbox[0], "maxy": _bbox[3], "minx": _bbox[2] })
                    setOpenSiteModal(true);
                } else if (props.zoneModal) {
                    const bodyData = features[features.length - 1].geometry;
                    const body = {
                        "zone_name": "imran 1",
                        "mapViewImage": "NO IMAGE REFERENCE",
                        "geoJson": bodyData,
                        "site": siteId,
                        "level": "1"
                    }
                    fetch(URL + '/zone/add', {
                        method: 'post',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' }
                    })
                }
            });
        }
        // console.log("props modal", props.modal)
    }, [props.modal, map.current, props.zoneModal])
    const onChangeFile = (e) => {
        const file = e.target.files[0];
        setSiteFile(file);
    }

    const clickOnSite = (id) => {
        console.log(id)
        setSiteId(id)
    }

    const handleSaveSite = async (e) => {
        const formData = new FormData();
        formData.append(
            'profile',
            siteFile,
            siteFile.name,
        );
        const fileRequest = await fetch(URL + '/upload', { method: 'POST', body: formData, redirect: 'follow' });
        let fileResponse = await fileRequest.json();
        fileResponse = { ...fileResponse, file_url: 'https://' + fileResponse.file_url }
        const location = [{ "lat": siteDetails.miny, "lng": siteDetails.maxx }, { "lat": siteDetails.maxy, "lng": siteDetails.minx }];
        if (fileResponse.success) {
            let siteRequestBody = {
                "site_name": siteDetails.name,
                "mapViewImage": fileResponse.file_url,
                "location": JSON.stringify(location),
                "objectType": "site",
            };
            // console.log(JSON.stringify(siteRequestBody));
            const siteRequest = await fetch(URL + '/site/add', {
                method: 'POST',
                body: JSON.stringify(siteRequestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const siteResponse = await siteRequest.json();
            // console.log(siteResponse)
        }

    }

    useEffect(() => {
        const asyncFun = async () => {
            const sites = await api.getAllSite()
            setAllSites(sites)
        }
        asyncFun();
    }, [])
    useEffect(() => {
        const _map = L.map(mapContainer.current, {
            center: [52.54432217453259, -1.308360683382157],
            zoom: 17,
            attributionControl: false,
        });
        L.control.coordinates({
            position: "bottomleft",
            decimals: 8,
            decimalSeperator: ".",
            labelTemplateLat: "Lat: {y}",
            labelTemplateLng: "Lng: {x}",
            enableUserInput: true,
            markerType: L.marker, //optional default L.marker
            markerProps: { icon: baseballIcon }, //optional default {},
        }).addTo(_map);
        L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga', {
            maxZoom: 22,
        }).addTo(_map);

        fetch(URL + "/site/get/" + siteId).then(r => r.json()).then(data => {

            const location = typeof data.site.location === "string" ? JSON.parse(data.site.location) : data.site.location;
            const bounds = [[location[0].lat, location[0].lng], [location[1].lat, location[1].lng]];
            const image = L.imageOverlay(data.site.mapViewImage, bounds);
            image.addTo(_map);
            image.bringToFront();
            _map.fitBounds(bounds)
        })

        fetch(URL + "/asset/get_Asset_by_site/" + siteId).then(r => r.json()).then(async assets => {
            const req = await fetch(URL + "/zone/get/" + siteId);
            const zones = await req.json();
            const features = []
            for (let asset of assets) {
                for (let zone of zones) {
                    if (zone._id == asset.zoneId) {
                        const feat_geom = JSON.parse(zone.geoJson);
                        let zone_center = centroid(feat_geom);
                        zone_center = { ...zone_center, properties: { ...asset } }
                        features.push(zone_center);
                    }
                }
            }
            const collection = featureCollection(features);
            GeoJSON_Asset.current = collection;
            var markers = L.markerClusterGroup();
            for (var i = 0; i < collection.features.length; i++) {
                var geometry = collection.features[i].geometry;
                var marker = L.marker(new L.LatLng(geometry.coordinates[1], geometry.coordinates[0]), {
                    title: collection.features[i].properties.asset_EPC,
                    icon: baseballIcon
                });
                markers.addLayer(marker);
            }
            _map.addLayer(markers);
        })

        function onEachFeature(feature, layer) {
            layer.on('click', async (lyr) => {
                const clicked_zone_id = lyr.target.feature.properties._id;
                let features = []
                for (let feat of GeoJSON_Asset.current.features) {
                    if (feat.properties.zoneId === clicked_zone_id) {
                        features.push(feat);
                    }
                }
                set_clicked_zone_asset(featureCollection(features));
                setOpenDrawer(!openDrawer)
                _map.fitBounds(lyr.target.getBounds())
            })
        }

        fetch(URL + "/zone/get/" + siteId).then(r => r.json()).then(r => {
            let features = [];
            r.forEach(each => {

                const feature = JSON.parse(each.geoJson);
                const new_feat = {
                    "type": "Feature",
                    "geometry": typeof feature === "object" ? feature : JSON.parse(feature),
                    properties: { _id: each._id, level: each.level, zone_name: each.zone_name, site: each.site }
                }
                features.push(new_feat)
            });

            const collection = featureCollection(features);
            L.geoJSON(collection, {
                onEachFeature: onEachFeature
            }).addTo(_map);
        })
        map.current = _map;
        return () => map.current.remove();
    }, [siteId])
    return <React.Fragment>
        <CustomModal open={openModal} handleClose={handleOpenModal} mapData={mapData} />
        <div className="map-wrapper">
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }}>
                <MapSidebar data={clicked_zone_asset.features} drawer={openDrawer} />
                <div style={{
                    position: 'absolute',
                    left: 10,
                    top: 80,
                    zIndex: 1000,
                    backgroundColor: '#ffffff'
                }}>
                    <button className="tag-detail" onClick={() => setOpenDrawer(!openDrawer)} >Open Details</button>
                </div>

                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 41000,
                    backgroundColor: '#ffffff',
                    display: clicked_zone_asset === false ? 'block' : 'none',
                }}>
                    <div style={{
                        width: '300px',
                        minHeight: "90vh",
                        height: '100%',
                        backgroundColor: '#373E43',
                        zIndex: 1000,
                        overflowY: 'scroll'
                    }}>
                        {
                            clicked_zone_asset === false ?
                                allSites.map((item =>
                                    item.site_name ? <label key={item._id} exact
                                        className="map-table-1"
                                        style={{ width: '100%', margin: 0 }}
                                        activeClassName="drawer-active-class"
                                        onClick={() => clickOnSite(item._id)}
                                    >
                                        <ListItem key={item._id} button>
                                            <ListItemText className={classes.ListItemText}
                                                primary={item.site_name} />
                                        </ListItem>
                                    </label> : ''
                                ))
                                : null
                        }
                    </div>


                </div>
                <Dialog
                    open={openSiteModal}
                    onClose={() => props.createSite({ modal: !props.modal })}
                    aria-labelledby="responsive-dialog-title"
                    hideBackdrop={false}
                >
                    <DialogTitle id="">{"Upload image for Site"}</DialogTitle>
                    <DialogContent>
                        <TextField variant="standard" name={'name'} onChange={changeTextField} value={siteDetails.name}
                            label="Site Name" />
                        <br />
                        <br />
                        <Button
                            style={{ marginTop: 5 }}
                            variant="contained"
                            component="label">
                            Upload File
                            <input type="file" hidden onChange={onChangeFile} />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseSiteModel} color="primary">
                            Close
                        </Button>
                        <Button autoFocus onClick={handleSaveSite} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    // fullScreen={fullScreen}
                    open={props.zoneModal}
                    onClose={() => props.createZone({ zoneModal: !props.zoneModal })}
                    aria-labelledby="responsive-dialog-title"
                    hideBackdrop={false}
                >
                    <DialogTitle id="">{"Upload Zone"}</DialogTitle>
                    <DialogContent>
                        <TextField variant="standard" name={'name'} onChange={changeTextField} value={siteDetails.name}
                            label="Zone Name" />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleSaveSite} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    </React.Fragment >
}

const mapStateToProps = (state) => ({
    modal: state.createSite.modal,
    zoneModal: state.createSite.zoneModal,
});
const mapDispatchToProps = (dispatch) => ({
    createSite: (dt) => dispatch(createSite.createSite(dt)),
    createZone: (dt) => dispatch(createZone.createZone(dt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView)