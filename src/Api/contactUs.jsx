import API from "./api";
import { contactUs } from "./endpoint";

export const getContactMessages = () => {
    return API.get(`${contactUs}/`);
}

export const deleteContactMessage = (data) => {
    return API.delete(`${contactUs}/delete`,{ params: { _id: data } });
}