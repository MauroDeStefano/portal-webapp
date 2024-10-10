import axios from "axios";

export const jsonCall = axios.create({
    validateStatus: () => true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const wwwFormUrlEncoded = axios.create({
    validateStatus: () => true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
})
