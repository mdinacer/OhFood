import { Basket } from "./basket";
import {Profile} from "./profile";

export interface User {
    username:string,
    email: string,
    token: string,
    basket?: Basket,
    roles?: string[],
    profile: Profile
}