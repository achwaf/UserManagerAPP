import { IModel } from "./i-model";

export class UserModel implements IModel{
    public username: string;
    public password: string;
    public avatar: number;
    public disabled: boolean;
    public passwordShouldBeChanged: boolean;
    constructor(username: string, password: string, avatar: number, disabled: boolean, passwordShouldBeChanged: boolean) {
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.disabled = disabled;
        this.passwordShouldBeChanged = passwordShouldBeChanged;
    }

    getName(): String {
        return this.username.split('@')[0];
    }
}
