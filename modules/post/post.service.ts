import { Types } from "mongoose";
import { PostRepository } from "../../DB/models/post/post.repository";
import { CreatePostDto } from "./post.dto";
import { NotFoundException, UnAuthorizedException } from "../../common";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../common/di/tokens";
import { RedisCachProvider } from "../../common/cache/redis/redis.service";
import { UserReactionRepository } from "../../DB/models/user-reaction/user-reaction.repository";
import { FirebasePushNotificationProvider } from "../../common/notification/firebase/firebase.service";


@injectable()
export class PostService {
    constructor(
        @inject(TOKENS.PostRepository) private readonly postRepository:PostRepository,
        @inject(TOKENS.RedisCachProvider) private readonly cacheProvider: RedisCachProvider,
        @inject(TOKENS.UserReactionRepository) private readonly userReactionRepository: UserReactionRepository,
        @inject(TOKENS.FirebasePushNotificationProvider) private readonly firebasePushNotificationProvider: FirebasePushNotificationProvider
        )
        {}

    async create(createPostDto : CreatePostDto, userId : Types.ObjectId, ){
        return await this.postRepository.create({...createPostDto, userId})
    }

    // gql 
    async getPost (postId : Types.ObjectId){
        const post = await this.postRepository.getOne({_id : postId},{},{populate : {path : "userId"}}) // populate >> haygeb el userId w hwa rage3 [{}]
        if (!post) {
            throw new NotFoundException("post not found")
        }
        return post;
    }

    async updatePost( postId: Types.ObjectId, userId: Types.ObjectId, updateData: { content?: string, attachments?: string[]}) {
        // check post exists
        const postExist = await this.postRepository.getOne({ _id: postId });
        if (!postExist) {
            throw new NotFoundException("post not found");
        }

        // check ownership (author only can edit)
        if (postExist.userId.toString() !== userId.toString()) {
            throw new UnAuthorizedException("you are not allowed to update this post");
        }

        // update post
        const updatedPost = await this.postRepository.updateOne(
            { _id: postId },
            {
                ...(updateData.content && { content: updateData.content }),
                ...(updateData.attachments && { attachments: updateData.attachments }),
            },
            { returnDocument: "after" }
        );

        return updatedPost;
    }

    async deletePost(postId: Types.ObjectId, userId: Types.ObjectId) {
        // check post exists
        const postExist = await this.postRepository.getOne({_id: postId});
        if (!postExist) {
            throw new NotFoundException("post not found");
        }
    
        // check ownership
        if (postExist.userId.toString() !== userId.toString()) {
            throw new UnAuthorizedException("you are not allowed to delete this post");
        }
    
        // delete post
        await this.postRepository.deleteOne({_id: postId});
    
        return true;
    }

    async getAllPosts(){
        return await this.postRepository.getAll(
            {}, 
            {}, 
            { sort: { createdAt: -1 }, populate: { path: "userId" } } 
        );
    }
}
