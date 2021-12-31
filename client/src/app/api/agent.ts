import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {PaginatedResponse} from "../models/pagination";
import {store} from "../store/configureStore";
import {history} from "../..";


const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === "development") {
        await sleep();
    }

    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response;
}, (error: AxiosError) => {
    if (error.response) {
        const {data, status} = error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title)
                break;

            case 401:
                toast.error(data.title)
                break;

            case 403:
                toast.error("You are not allowed")
                break;

            // case 404:
            //     toast.error("Element not found")
            //     break;

            case 500:
                history.push('/server-error', data);
                break;

            default:
                break;
        }
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(responseBody),
}


function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData
}

const Admin = {
    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`),
    createAnnounce: (announce: any) => requests.postForm('announces', createFormData(announce)),
    updateAnnounce: (announce: any) => requests.putForm('announces', createFormData(announce)),
    deleteAnnounce: (id: number) => requests.delete(`announces/${id}`),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get("account/defaultAddress"),
    sendMail: (values:any)=> requests.postForm('account/sendMail', createFormData(values)),
}

const Announces = {
    list: () => requests.get('announces'),
    details: (id: number) => requests.get(`announces/${id}`),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity: number = 1) =>
        requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity: number = 1) =>
        requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchTypes: () => requests.get("products/types"),
    fetchTypesFull: () => requests.get("products/typesFull"),
}

const Orders = {
    list: () => requests.get('orders'),
    details: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}



const agent = {
    Admin,
    Account,
    Announces,
    Basket,
    Catalog,
    Orders,
}

export default agent;