"use client";
import { makeAutoObservable, runInAction } from "mobx";
import {
  ILoginForm,
  IRegisterForm,
  IToken,
  IUpdatePasswordForm,
  IUser,
} from "../models/User";
import agent from "../apiclient/agent";
import { store } from "./Store";
import { toast } from "react-toastify";

export default class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  refreshTokenTimeout: any;
  user: IUser | null = null;
  message: string | null = null;
  error: string | null = null;
  loading = false;
  role: string | null = null;

  setRole = (role: string | null) => {
    this.role = role;
  };

  get isEditable() {
    return true || this.role !== null;
  }

  get isAdministrator() {
    return this.role === "adm";
  }

  get isAdmin() {
    const myToken = this.getToken(this.user?.token);
    if (myToken === null) return false;
    return myToken.role.includes("adm");
  }

  getToken = (token: string | undefined) => {
    if (!token) return null;
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const myToken: IToken = JSON.parse(jsonPayload);
    return myToken;
  };

  get isLoggedIn() {
    return !!this.user;
  }

  setError = (error: string | null) => {
    this.error = error;
  };

  setMessage = (message: string | null) => {
    this.message = message;
  };

  login = async (creds: ILoginForm) => {
    if (typeof window === "undefined") return;
    try {
      this.loading = true;
      const user = await agent.user.login(creds);
      runInAction(() => {
        this.user = user;
        store.commonStore.setToken(user.token);
        this.loading = false;
        this.bounceTimer(user);
      });
      return user;
    } catch (error: any) {
      console.log("--------> ", error);
      runInAction(() => {
        store.commonStore.setToken(null);
        this.setError(error.data);
        this.loading = false;
      });
      throw error;
    }
  };

  getUser = async () => {
    try {
      const user = await agent.user.current();
      runInAction(() => {
        this.user = user;
        store.commonStore.setToken(user.token);
        this.bounceTimer(user);
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  getUsers = async () => {
    try {
      const users = await agent.user.getUsers();
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addUserRole = async (email: string, memberRole: string) => {
    try {
      const user = await agent.user.addUserRole({ email, memberRole });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteUserRole = async (email: string, memberRole: string) => {
    try {
      const user = await agent.user.deleteUserRole({ email, memberRole });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    this.stopRefreshTokenTimer();
  };

  registerUser = async (registerForm: IRegisterForm) => {
    if (typeof window === "undefined") return;
    try {
      const message = await agent.user.register(registerForm);
      runInAction(() => {
        //this.message = message;
      });
      return true;
    } catch (error: any) {
      toast.error(error);
      //throw error;
      return false;
    }
  };

  refreshToken = async () => {
    if (typeof window === "undefined") return;
    try {
      const user = await agent.user.refreshToken();
      runInAction(() => {
        this.user = user;
        store.commonStore.setToken(user.token);
        this.bounceTimer(user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  resendEmailConfirmation = async (email: string) => {
    try {
      const message = await agent.user.resendverificationemail(email);
      runInAction(() => {
        this.message = message;
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  };

  forgotPassword = async (email: string) => {
    try {
      const message = await agent.user.forgotpassword(email);
      runInAction(() => {
        this.message = message;
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  };

  updatePassword = async (updatePwdForm: IUpdatePasswordForm) => {
    try {
      const message = await agent.user.updatepassword(updatePwdForm);
      runInAction(() => {
        this.message = message;
      });
      return message;
    } catch (error: any) {
      console.log(error);
      return error.data;
    }
  };

  verifyEmail = async (email: string, token: string) => {
    try {
      const message = await agent.user.verifyemail(email, token);
      runInAction(() => {
        this.message = message;
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  };

  private bounceTimer = (user: IUser) => {
    this.stopRefreshTokenTimer();
    this.startRefreshTokenTimer(user);
  };

  private startRefreshTokenTimer(user: IUser) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 120 * 1000;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
