"use client";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../stores/Store";
import {
  ILoginForm,
  IRegisterForm,
  IUpdatePasswordForm,
  IUser,
  IUserDetail,
  IUserRole,
} from "../models/User";
import {
  CatLegalLookup,
  Categorie,
  CreateKaizenDocument,
  Employee,
  EmployeeData,
  Equipe,
  Etat,
  KaizenDocument,
  KaizenLog,
  PagedResult,
  RecordMetric,
  Secteur,
  SousCategorie,
  SousSecteur,
} from "../models";
import { IdValue } from "../models/IdValue";
import { SearchRequest } from "../models/SearchRequest";
import { AddNote, Note } from "../models/Note";
import {
  RessourcesNecessaire,
  RessourcesNecessaireDesc,
} from "../models/RessourcesNecessaire";
import { KaizenAttachmentDetail } from "../models/Document";
import { EmailDetails } from "../models/Email";
import { Projet } from "../models/Projet";
import { CotationConfig } from "../models/CotationConfig";

export const token_key = "Kaizen_JWT";

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(token_key);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
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
    let tokenHeader = headers["www-authenticate"];
    if (tokenHeader && tokenHeader.includes("invalid_token")) {
      store.userStore.logout();
      console.log(headers);
      window.localStorage.removeItem(token_key);
      toast.info("Your session has expired!, please login again");
    } else {
      store.userStore.logout();
      console.log(headers);
      window.localStorage.removeItem(token_key);
      toast.error("Not Authorized, please check your password and try again");
    }
  }

  if (status === 404) {
    // history.push('/notfound')
    toast.info("Status 404 : Page Not Found");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    //history.push('/notfound')
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//     new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  // get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  get: (url: string) =>
    axios.get(url, { withCredentials: true }).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body, { withCredentials: true }).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body, { withCredentials: true }).then(responseBody),
  del: (url: string) =>
    axios.delete(url, { withCredentials: true }).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
  getAsByteStream: (url: string) =>
    axios
      .get(url, { responseType: "blob", withCredentials: true })
      .then(responseBody),
};

const user = {
  login: (creds: ILoginForm): Promise<IUser> =>
    requests.post("/user/login", creds),
  register: (registerForm: IRegisterForm): Promise<string> =>
    requests.post("/user/register", registerForm),
  current: (): Promise<IUser> => requests.get("/user"),
  refreshToken: (): Promise<IUser> => requests.post(`/user/refreshToken`, {}),
  resendverificationemail: (email: string): Promise<string> =>
    requests.get(`/user/resendverificationemail?email=${email}`),
  verifyemail: (email: string, token: string): Promise<string> =>
    requests.post(`/user/verifyemail?email=${email}&token=${token}`, {}),
  forgotpassword: (email: string): Promise<string> =>
    requests.get(`/user/forgotpassword?email=${email}`),
  updatepassword: (updatePwdForm: IUpdatePasswordForm): Promise<string> =>
    requests.post("/user/updatepassword", updatePwdForm),
  getUsers: (): Promise<IUserDetail[]> => requests.get("user/getusers"),
  addUserRole: (userRole: IUserRole): Promise<IUserDetail> =>
    requests.post("user/addrole", userRole),
  deleteUserRole: (userRole: IUserRole): Promise<IUserDetail> =>
    requests.post("user/deleterole", userRole),
};

const kaizen = {
  unpagedlist: (pageNo?: number): Promise<PagedResult<KaizenDocument>> =>
    requests.get("/kaizen"),
  list: (params: URLSearchParams): Promise<PagedResult<KaizenDocument>> =>
    axios.get("/kaizen", { params: params }).then(responseBody),
  search: (query: string): Promise<PagedResult<KaizenDocument>> =>
    requests.get(`/kaizen/search?SearchText=${query}`),
  details: (id: number) => requests.get(`/kaizen/${id}`),
  filterSearch: (
    request: SearchRequest
  ): Promise<PagedResult<KaizenDocument>> =>
    axios.get("/kaizen/filtersearch", { params: request }).then(responseBody),
  update: (kaizen: KaizenDocument): Promise<boolean> =>
    requests.put(`/kaizen/${kaizen.id}`, kaizen),
  create: (kaizen: CreateKaizenDocument): Promise<boolean> =>
    axios.post("/kaizen", kaizen),
  recordMetrics: (): Promise<RecordMetric> =>
    requests.get(`/kaizen/recordcounts`),
};

const categorie = {
  list: (): Promise<PagedResult<Categorie>> => requests.get("/categorie"),
  valuelist: (): Promise<IdValue[]> => requests.get("/categorie/valuelist"),
  categoryList: (): Promise<Categorie[]> => requests.get("/categorie/list"),
  details: (categorieId: number): Promise<Categorie> =>
    requests.get(`/categorie/details/${categorieId}`),
  save: (categorie: Categorie): Promise<boolean> =>
    requests.post("/categorie", categorie),
};

const employees = {
  list: (): Promise<Employee[]> => requests.get("/employees"),
  valuelist: (query: string): Promise<IdValue[]> =>
    requests.get(`/employees/valuelist?search=${query}`),
  searchemployees: (query: string): Promise<EmployeeData[]> =>
    requests.get(`/employees/lookup?search=${query}`),
  details: (id: string): Promise<EmployeeData> =>
    requests.get(`/employees/details?focalId=${id}`),
  save: (focalId: string, accessLevel: string): Promise<EmployeeData> =>
    requests.post(`/employees/save`, { focalId, accessLevel }),
};

const equipement = {
  list: (): Promise<PagedResult<Equipe>> => requests.get("/equipement"),
  valuelist: (): Promise<IdValue[]> => requests.get("/equipement/valuelist"),
  details: (equipeId: number): Promise<Equipe> =>
    requests.get(`/equipement/details/${equipeId}`),
  upsert: (equipe: Equipe): Promise<boolean> =>
    requests.post("/equipement", equipe),
};

const etat = {
  list: (): Promise<PagedResult<Etat>> => requests.get("/etat"),
  valuelist: (): Promise<IdValue[]> => requests.get("/etat/valuelist"),
};

const secteur = {
  list: (): Promise<PagedResult<Secteur>> => requests.get("/secteur"),
  valuelist: (equipeIds: string): Promise<IdValue[]> =>
    requests.get(`/secteur/valuelist?equipeIds=${equipeIds}`),
  details: (secteurId: number): Promise<Secteur> =>
    requests.get(`/secteur/details/${secteurId}`),
  secteurList: (equipeId: number): Promise<Secteur[]> =>
    requests.get(`/secteur/getsoussecteursforequipe/${equipeId}`),
  save: (secteur: Secteur): Promise<boolean> =>
    requests.post("/secteur", secteur),
};
const soussecteur = {
  valuelist: (equipeId: number, secteurId: number): Promise<IdValue[]> =>
    requests.get(
      "/soussecteur/valuelist?equipeId=" + equipeId + "&secteurId=" + secteurId
    ),
  details: (soussecteurId: number): Promise<SousSecteur> =>
    requests.get(`/soussecteur/details/${soussecteurId}`),
  save: (soussecteur: SousSecteur): Promise<boolean> =>
    requests.post("/soussecteur", soussecteur),
  souseSecteurList: (
    equipeId: number,
    secteurId: number
  ): Promise<SousSecteur[]> =>
    requests.get(`/soussecteur/getsoussecteur/${equipeId}/${secteurId}`),
};

const souscategorie = {
  list: (): Promise<PagedResult<SousCategorie>> =>
    requests.get("/souscategorie"),
  valuelist: (categorieId: number): Promise<IdValue[]> =>
    requests.get("/souscategorie/valuelist?categorieId=" + categorieId),
  details: (souscategorieId: number): Promise<SousCategorie> =>
    requests.get(`/souscategorie/details/${souscategorieId}`),
  sousCategoryList: (categorieId: number): Promise<SousCategorie[]> =>
    requests.get(`/categorie/souscategorie?CategorieId=${categorieId}`),
  save: (souscategorie: SousCategorie): Promise<boolean> =>
    requests.post("/souscategorie", souscategorie),
};

const projet = {
  valuelist: (): Promise<IdValue[]> => requests.get("/projet/valuelist"),
  details: (projetId: number): Promise<Projet> =>
    requests.get(`/projet/details/${projetId}`),
  save: (projet: Projet): Promise<boolean> => requests.post("/projet", projet),
};

const notes = {
  list: (kaizenId: number): Promise<Note[]> =>
    requests.get(`/notes?kaizenId=${kaizenId}`),
  add: (note: AddNote): Promise<any> => requests.post("/notes", note),
};

const cotationConfigs = {
  list: (): Promise<CotationConfig[]> => requests.get(`/cotationconfig/list`),
  upsert: (config: CotationConfig): Promise<any> =>
    requests.post("/cotationconfig", config),
};

const catlegallookup = {
  list: (categorieId: number): Promise<CatLegalLookup[]> =>
    requests.get(`/catlegallookup?categorieId=${categorieId}`),
};

const ressourcesnecessaire = {
  list: (kaizenId: number): Promise<RessourcesNecessaireDesc[]> =>
    requests.get(`/ressourcesnecessaire?kaizenId=${kaizenId}`),
  upsert: (ressourcesnecessaire: RessourcesNecessaire): Promise<boolean> =>
    requests.post("/ressourcesnecessaire", ressourcesnecessaire),
  listResources: (): Promise<IdValue[]> =>
    requests.get("/ressourcesnecessaire/ressourceslist"),
  listTypeDemandes: (): Promise<IdValue[]> =>
    requests.get("/ressourcesnecessaire/typedemandeslist"),
};

const document = {
  uploadDocument: (kaizenId: number, fileData: Blob): Promise<number> =>
    requests.postForm(`/document/${kaizenId}`, fileData),
  list: (kaizenId: number): Promise<KaizenAttachmentDetail[]> =>
    requests.get(`/document/list/${kaizenId}`),
  download: (id: number): Promise<Blob> =>
    requests.getAsByteStream(`/document/download/${id}`),
  delete: (id: number): Promise<boolean> => requests.del(`/document/${id}`),
};

const sendmail = {
  send: (email: EmailDetails): Promise<any> =>
    requests.post("/sendmail", email),
};

const apis = {
  user,
  kaizen,
  employees,
  categorie,
  equipement,
  etat,
  secteur,
  soussecteur,
  souscategorie,
  notes,
  projet,
  ressourcesnecessaire,
  document,
  catlegallookup,
  sendmail,
  cotationConfigs,
};

export default apis;
