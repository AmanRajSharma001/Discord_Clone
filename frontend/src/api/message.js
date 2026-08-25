import axios from "./axios";

export const getMessages = async (channelId) => {
    const response = await axios.get(`/messages/${channelId}`);
    return response.data;
};

export const createMessage = async (message) => {
    const response = await axios.post("/messages/", message);
    return response.data;
};