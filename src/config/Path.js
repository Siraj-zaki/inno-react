const BASE_URL = 'https://zebra-hospital.herokuapp.com'
// const BASE_URL = "https://shs-server.herokuapp.com";
// const BASE_URL = "https://7005-103-225-51-7.ngrok.io";
const Path = {
    GET_ALL_USERS: `${BASE_URL}/user/get/all`,
    DELETE_USER: `${BASE_URL}/user/delete`,
    LOGIN: `${BASE_URL}/user/login`,
    GET_ALL_SITE: `${BASE_URL}/site/get`,
    ADD_ROLE: `${BASE_URL}/role/add`,
    GET_ROLE: `${BASE_URL}/role/get`,
    GET_HAND_HELD: `${BASE_URL}/handHeld/get`,
    ADD_HAND_HELD: `${BASE_URL}/handHeld/add`,
    EDIT_HAND_HELD: `${BASE_URL}/handHeld/edit`,
    DELETE_HAND_HELD: `${BASE_URL}/HandHeld/delete`,
    ADD_USER: `${BASE_URL}/user/signup`,
    DELETE_ROLE: `${BASE_URL}/role/delete`,
    EDIT_USER: `${BASE_URL}/user/edit`,
    EDIT_ROLE: `${BASE_URL}/role/edit`,
    GET_ASN: `${BASE_URL}/asn/get`,
    GET_ASN_BY_IBT: `${BASE_URL}/asset/get_Assets_by_asn`,
    GET_BATCH_BY_IBT: `${BASE_URL}/asset/getAssetsByAsn`,
    GET_BATCH: `${BASE_URL}/batch/get`,
    GET_COUNTED_ITEMS: `${BASE_URL}/countedItems/get`,
    GET_EPC_DETAIL: `${BASE_URL}/activity/get/by`,
    GET_ASN_BY_EPC: `${BASE_URL}/activity/by/epc`,
    GET_ASSETS_SOH: `${BASE_URL}/asset/getSoh`,
    GET_ASSETS: `${BASE_URL}/activity/get/all`,

};

export { Path };
export { BASE_URL }
