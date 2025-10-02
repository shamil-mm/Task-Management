import http from "http";
export interface ISocketServer {
    init(server: http.Server): void;
    sendNotification(userId:string,heading:string,message:string):void;
    sendUnreadCount(userId: string, count: number): void;
}