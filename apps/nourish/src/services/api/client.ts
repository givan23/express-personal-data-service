import axios from "axios";

const LOCAL_HOST = 'http://localhost:4000';

// this address could change every reboot,
// check it with `ipconfig` command in terminal
const PRIVATE_LAN = 'http://192.168.1.63:4000';

const api = axios.create({
    baseURL: PRIVATE_LAN,
    timeout: 5000,
});

export {api};