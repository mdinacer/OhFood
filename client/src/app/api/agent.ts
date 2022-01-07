import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";
import { history } from "../..";


const sleep = () => new Promise(resolve => setTimeout(resolve, 3000));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
        const { data, status } = error.response;

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
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
}


function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData
}

const Location = {
    getLocation: (lat: number, long: number) => axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: false }).then(responseBody),
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
    sendMail: (values: any) => requests.postForm('account/sendMail', createFormData(values)),
}

const Announces = {
    list: () => requests.get('announces'),
    details: (id: number) => requests.get(`announces/${id}`),
}

const Profile = {
    get: () => requests.get('profile'),
    fetchAddresses: () => requests.get('profile/addresses'),
    fetchDefaultAddress: () => requests.get('profile/addresses/default'),
    setDefaultAddress: (id: number) => requests.put(`profile/Addresses/setDefault/${id}`, {}),
    createAddress: (address: any) => requests.postForm('profile/addresses', createFormData(address)),
    updateAddress: (address: any) => requests.putForm('profile/addresses', createFormData(address)),
    deleteAddress: (id: number) => requests.delete(`profile/addresses/${id}`),
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
    fetchCategories: () => requests.get("products/categories"),
    fetchCategoriesFull: () => requests.get("products/categoriesFull"),
}

const Orders = {
    list: (params: URLSearchParams) => requests.get('orders', params),
    //listAll: (params: URLSearchParams) => requests.get('orders/listAll', params),
    details: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values),
    updateStatus: (id: number, value: string) => requests.put('orders', { id, status: value })
}


const agent = {
    Admin,
    Account,
    Profile,
    Announces,
    Basket,
    Catalog,
    Orders,
    Location
}

export default agent;