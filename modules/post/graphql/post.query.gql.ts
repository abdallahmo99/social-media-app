import { PostService } from "../post.service";
import { GraphQLString, GraphQLNonNull} from "graphql";
import { PostTypeGql } from "./post.type.gql";
import { Types }  from "mongoose"
import { TOKENS } from "../../../common/di/tokens";
import { container } from "../../../common/di/container";

const postService = container.resolve<PostService>(TOKENS.PostService);

export const PostQueryGql = {
    post :{
        type : PostTypeGql,
        args: {
            postId: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async(parent: any, args: any) => {
            return await postService.getPost(new Types.ObjectId(args.postId));
        }
    }
}