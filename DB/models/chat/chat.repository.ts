import { injectable } from "tsyringe";
import { IChat } from "../../../common/interfaces/chat.interface";
import { AbstractRepository } from "../../abstract.repository";
import { Chat } from "./chat.model";

// apply fun of injection to the repository class
// decorate >> is a fun applied on class or attribute or parameter or method
@injectable()
export class ChatRepository extends AbstractRepository<IChat>{
    constructor(){
        super(Chat)
    }
}
