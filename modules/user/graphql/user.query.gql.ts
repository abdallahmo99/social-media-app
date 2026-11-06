import { container } from "../../../common/di/container";
import { TOKENS } from "../../../common/di/tokens";
import { UserService } from "../user.service";
import { UserTypeGql } from "./user.type.gql";
import { Types }  from "mongoose"


const userService = container.resolve<UserService>(TOKENS.UserService);
export const UserQueryGql = {
    user :{
        type : UserTypeGql,
        resolve : async ()=>{
            return await userService.getProfile(new Types.ObjectId(""))
        }
    }
}