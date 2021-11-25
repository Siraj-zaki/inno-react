import axios from "axios";
import { Path } from '../config/Path';
const getAllUsers = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ALL_USERS}`, payLoad);
    return data;
};
const addUser = async (payLoad) => {
    const { data } = await axios.post(`${Path.ADD_USER}`, payLoad);
    return data;
};
const getAllSite = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ALL_SITE}`, payLoad);
    return data;
};
const addRole = async (payLoad) => {
    const { data } = await axios.post(`${Path.ADD_ROLE}`, payLoad);
    return data;
};
const addHandHeld = async (payLoad) => {
    const { data } = await axios.post(`${Path.ADD_HAND_HELD}`, payLoad);
    return data;
};
const deleteRole = async (id) => {
    const { data } = await axios.delete(`${Path.DELETE_ROLE}/${id}`);
    return data;
};
const editUser = async (id, payLoad) => {
    const { data } = await axios.put(`${Path.EDIT_USER}/${id}`, payLoad);
    return data;
};
const editRole = async (id, payLoad) => {
    const { data } = await axios.put(`${Path.EDIT_ROLE}/${id}`, payLoad);
    return data;
};
const getRole = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ROLE}`, payLoad);
    return data;
};
const getHandHeld = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_HAND_HELD}`, payLoad);
    return data;
};
const editHandHeld = async (id, payLoad) => {
    const { data } = await axios.put(`${Path.EDIT_HAND_HELD}/${id}`, payLoad);
    return data;
};
const deleteHandHeld = async (id) => {
    const { data } = await axios.delete(`${Path.DELETE_HAND_HELD}/${id}`);
    return data;
};
const deleteUser = async (id) => {
    const { data } = await axios.delete(`${Path.DELETE_USER}/${id}`);
    return data;
};
const login = async (payLoad) => {
    const { data } = await axios.post(`${Path.LOGIN}`, payLoad);
    return data;
};
const getASN = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ASN}`, payLoad);
    return data;
};
const getIBTDetailbyASN = async (payLoad) => {
    const { data } = await axios.post(`${Path.GET_ASN_BY_IBT}`, payLoad);
    return data;
};
const getBatchDetailbyASN = async (id, payLoad) => {
    const { data } = await axios.get(`${Path.GET_BATCH_BY_IBT}/${id}`, payLoad);
    return data;
};
const getBatch = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_BATCH}`, payLoad);
    return data;
};
const getAssetsBySoh = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ASSETS_SOH}`, payLoad);
    return data;
};
const getAssets = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_ASSETS}`, payLoad);
    return data;
};
const getCountedItems = async (payLoad) => {
    const { data } = await axios.get(`${Path.GET_COUNTED_ITEMS}`, payLoad);
    return data;
};
const EPCDetail = async (asn, operation) => {
    const { data } = await axios.get(`${Path.GET_EPC_DETAIL}/${asn}/${operation}`);
    return data;
};
const getASNbyEPC = async (epc, operation) => {
    const { data } = await axios.get(`${Path.GET_ASN_BY_EPC}/${epc}`);
    return data;
};
export default {
    getAllUsers,
    getAllSite,
    addRole,
    getRole,
    addUser,
    deleteRole,
    editUser,
    editRole,
    getHandHeld,
    addHandHeld,
    editHandHeld,
    deleteHandHeld,
    deleteUser,
    login,
    getASN,
    getBatch,
    getIBTDetailbyASN,
    getCountedItems,
    getAssetsBySoh,
    getBatchDetailbyASN,
    EPCDetail,
    getAssets,
    getASNbyEPC,
};
