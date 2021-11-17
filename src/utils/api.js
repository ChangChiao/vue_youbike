import api from "../utils/http";
import {
    API_STATION,
    API_AVAILABLE,
    API_SHAPE,
    API_NEAYBY_STATION,
    API_NEAYBY_AVAILABLE
} from "../global/constant";
import jsSHA from "jssha";

const getAuthorizationHeader = () => {
    let AppID = import.meta.env.VITE_APP_ID;
    let AppKey = import.meta.env.VITE_APP_KEY;

    const GMTString = new Date().toGMTString();
    const ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
    return {
        Authorization: Authorization,
        "X-Date": GMTString,
        "Content-Type": "application/x-www-form-urlencoded"
    };
};

const getCity = (data) => {
    const { city = "" } = data;
    delete data.city;
    return { cityPath: city, data };
};

export const getBikeStation = (sendData) => {
    const { cityPath, data } = getCity(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data
        }
    };
    return api.get(API_STATION + `/${cityPath}`, config);
};

export const getBikeAvailability = (sendData) => {
    const { cityPath, data } = getCity(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data
        }
    };
    return api.get(API_AVAILABLE + `/${cityPath}`, config);
};

export const getCyclingShape = (sendData) => {
    const { cityPath, data } = getCity(sendData);
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data
        }
    };
    return api.get(API_SHAPE + `/${cityPath}`, config);
};

export const getNearStation = (data) => {
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data
        }
    };
    return api.get(API_NEAYBY_STATION, config);
};

export const getNearAvailble = (data) => {
    let config = {
        headers: getAuthorizationHeader(),
        params: {
            ...data
        }
    };
    return api.get(API_NEAYBY_AVAILABLE, config);
};
