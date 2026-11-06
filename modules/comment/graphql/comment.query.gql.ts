import { container } from "../../../common/di/container";
import { TOKENS } from "../../../common/di/tokens";
import { CommentService } from "../comment.service";
import { CommentTypeGql } from "./comment.type.gql";
import { Types }  from "mongoose"

const commentService = container.resolve<CommentService>(TOKENS.CommentService);
export const CommentQueryGql = {
    comment :{
        type : CommentTypeGql,
        resolve : async ()=>{
            return await commentService.getComment(new Types.ObjectId(""))
        }
    }
}