"use client";
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { store } from '../stores/Store';
import { ILoginForm, IRegisterForm, IUpdatePasswordForm, IUser, IUserDetail, IUserRole } from '../models/User';
import { Categorie, Employee, Equipe, Etat, KaizenDocument, KaizenLog, PagedResult, Secteur, SousCategorie } from '../models';

export const token_key = 'Brisk_JWT';

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;


axios.interceptors.request.use((config) => {

    const token = window.localStorage.getItem(token_key);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {

    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const { status, data, config, headers } = error.response;
    //if (status === 401 && headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The access token expired"') {
    store.userStore.setMessage(data);

    if (status === 400) {
        console.log(error.response);
        store.userStore.setError(data);
        toast.error(data);
        //history.push('/notfound')
    }


    if (status === 401) {
        let tokenHeader = headers['www-authenticate'];
        if (tokenHeader && tokenHeader.includes('invalid_token')) {
            store.userStore.logout();
            console.log(headers);
            window.localStorage.removeItem(token_key);
            toast.info('Your session has expired!, please login again');
        } else {
            store.userStore.logout();
            console.log(headers);
            window.localStorage.removeItem(token_key);
            toast.error('Not Authorized, please check your password and try again');
        }

    }

    if (status === 404) {
        // history.push('/notfound')
        toast.info('Status 404 : Page Not Found');
    }


    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        //history.push('/notfound')
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//     new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    // get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    get: (url: string) => axios.get(url, { withCredentials: true }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body, { withCredentials: true }).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body, { withCredentials: true }).then(responseBody),
    del: (url: string) => axios.delete(url, { withCredentials: true }).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            withCredentials: true,
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(responseBody);
    },
    getAsByteStream: (url: string) => axios.get(url, { responseType: 'blob', withCredentials: true }).then(responseBody)
};

const user = {
    login: (creds: ILoginForm): Promise<IUser> => requests.post('/user/login', creds),
    register: (registerForm: IRegisterForm): Promise<string> => requests.post('/user/register', registerForm),
    current: (): Promise<IUser> => requests.get('/user'),
    refreshToken: (): Promise<IUser> => requests.post(`/user/refreshToken`, {}),
    resendverificationemail: (email: string): Promise<string> => requests.get(`/user/resendverificationemail?email=${email}`),
    verifyemail: (email: string, token: string): Promise<string> => requests.post(`/user/verifyemail?email=${email}&token=${token}`, {}),
    forgotpassword: (email: string): Promise<string> => requests.get(`/user/forgotpassword?email=${email}`),
    updatepassword: (updatePwdForm: IUpdatePasswordForm): Promise<string> => requests.post('/user/updatepassword', updatePwdForm),
    getUsers: (): Promise<IUserDetail[]> => requests.get('user/getusers'),
    addUserRole: (userRole: IUserRole): Promise<IUserDetail> => requests.post('user/addrole', userRole),
    deleteUserRole: (userRole: IUserRole): Promise<IUserDetail> => requests.post('user/deleterole', userRole),
}


const kaizen = {
    unpagedlist: (pageNo?: number): Promise<PagedResult<KaizenDocument>> => requests.get('/kaizen'),
    list: (params: URLSearchParams): Promise<PagedResult<KaizenDocument>> => axios.get('/kaizen', { params: params }).then(responseBody),
    search: (query: string): Promise<PagedResult<KaizenDocument>> => requests.get(`/kaizen/search?SearchText=${query}`),
    details: (id: number) => requests.get(`/kaizen/${id}`),

}

const categorie = {
    list: (): Promise<PagedResult<Categorie>> => requests.get('/categorie'),

}
const employees = {
    list: (): Promise<Employee[]> => requests.get('/employees'),
}

const equipement = {
    list: (): Promise<PagedResult<Equipe>> => requests.get('/equipement'),
}

const etat = {
    list: (): Promise<PagedResult<Etat>> => requests.get('/etat'),
}

const secteur = {
    list: (): Promise<PagedResult<Secteur>> => requests.get('/secteur'),
}

const souscategorie = {
    list: (): Promise<PagedResult<SousCategorie>> => requests.get('/souscategorie'),

}

export default {
    kaizen,
    employees,
    categorie,
    equipement,
    etat,
    secteur,
    souscategorie
}