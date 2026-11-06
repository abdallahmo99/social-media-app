import { injectable } from "tsyringe";
import { IFriendRequest } from "../../../common";
import { AbstractRepository } from "../../abstract.repository";
import { friendRequest } from "./friends-request.model";



@injectable()
export class FriendRequestRepository extends AbstractRepository<IFriendRequest>{
    constructor(){
        super(friendRequest)
    }
}