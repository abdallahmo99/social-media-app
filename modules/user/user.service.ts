import { Types } from "mongoose";
import { ICloudProvider } from "../../common/cloud/cloud.interface";
import { UserRepository } from "../../DB/models/user/user.repository";
import { NotFoundException } from "../../common";
import { UserFriendRepository } from "../../DB/models/user-friend/user-friend.repository";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../../common/di/tokens";

@injectable()
export class UserService{
    constructor(
        @inject(TOKENS.S3CloudProvider) private readonly cloudProvider : ICloudProvider,
        @inject(TOKENS.UserRepository) private readonly userRepository : UserRepository,
        @inject(TOKENS.UserFriendRepository) private readonly userFriendRepository : UserFriendRepository
        ){}

    async uploadProfilePic(file: Express.Multer.File , userId: Types.ObjectId){
        // upload to s3
        const key =  await this.cloudProvider.uploadFile(file,`users/${userId.toString()}`)
        // update in db 
        const user = await this.userRepository.updateOne(
            { _id: userId },
            { profilePic: key },
            { returnDocument : "before"} // hyrga3 el old user 
            )
        if(!user) throw new NotFoundException("user not found!")

        // delete old pic 
        if(user.profilePic) await this.cloudProvider.deleteFile(user.profilePic)
    }

    //gql 
    async getProfile(userId: Types.ObjectId){
        const user = await this.userRepository.getOne({_id:userId})
        const friends = await this.userFriendRepository.getAll(
            {$or : [{user: userId}, {friends : userId}]},
            {},
            {populate :[{path :"user"},{path : "friend"}]}
        )
        return {user,friends}

    } 

    async updateProfile(userId: Types.ObjectId, data: any){
        const updatedUser = await this.userRepository.updateOne(
            { _id: userId },
            data,
            { returnDocument: "after" } 
        );
        if(!updatedUser) throw new NotFoundException("user not found!");
        return updatedUser;
    }

    async deleteAccount(userId: Types.ObjectId){
        const deletedUser = await this.userRepository.deleteOne({ _id: userId });
        if(!deletedUser) throw new NotFoundException("user not found!");
        return true;
    }
}
