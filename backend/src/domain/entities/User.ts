export class User{
    public _id?: string;
    public name: string;
    public email: string;
    public password: string;
    constructor(props:{name:string;email:string;password:string;_id?:string}){
        this._id=props._id;
        this.name=props.name;
        this.email=props.email;
        this.password=props.password;
    }
}