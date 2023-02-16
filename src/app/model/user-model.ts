import { IModel } from "./i-model";

export class UserModel implements IModel{
    public username: string;
    public password?: string;
    public avatar: number;
    public disabled?: boolean;
    public passwordShouldBeChanged?: boolean;
    constructor(username: string, avatar: number, passwordShouldBeChanged: boolean) {
        this.username = username;
        this.avatar = avatar;
        this.passwordShouldBeChanged = passwordShouldBeChanged;
    }

    getName(): string {
        return this.username.split('@')[0];
    }
}
