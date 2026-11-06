import { injectable } from "tsyringe";
import { INotificationProvider } from "../notification.interface";
import admin from "firebase-admin"
import * as fs from "fs";
import * as path from "path";

const config = 
    JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname,"../../../config/social-app-813b5-firebase-adminsdk-fbsvc-0f16e8355c.json")
            ) as unknown as string // buffer >> string 
    )

@injectable()
export class FirebasePushNotificationProvider implements INotificationProvider{
    private firebaseClient: admin.app.App

    constructor(){
        this.firebaseClient = admin.initializeApp({
            credential: admin.credential.cert(config)
        });
    }


    async send(token: string, data: { title: string; body: string; }): Promise<void> {
        await this.firebaseClient.messaging().send({token,data})
    }

}