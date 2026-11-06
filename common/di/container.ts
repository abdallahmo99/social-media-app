import { container } from "tsyringe";
import { AuthService, UserService, ChatService, PostService, CommentService, FriendRequestService } from "../../modules";
import { NodeMailerProvider } from "../email/nodemailer/nodemailer.service";
import { UserRepository, ChatRepository, PostRepository, CommentRepository, FriendRequestRepository, MessageRepository, UserFriendRepository, UserReactionRepository} from "../../DB/models"
import { TOKENS } from "./tokens";
import { RedisCachProvider } from "../cache/redis/redis.service";
import { FirebasePushNotificationProvider } from "../notification/firebase/firebase.service";


// services
container.registerSingleton(TOKENS.UserService, UserService)
container.registerSingleton(TOKENS.AuthService, AuthService)
container.registerSingleton(TOKENS.ChatService, ChatService)
container.registerSingleton(TOKENS.PostService, PostService)
container.registerSingleton(TOKENS.CommentService, CommentService)
container.registerSingleton(TOKENS.FriendRequestService, FriendRequestService)


// repository 
container.registerSingleton(TOKENS.UserRepository, UserRepository)
container.registerSingleton(TOKENS.ChatRepository, ChatRepository)
container.registerSingleton(TOKENS.PostRepository, PostRepository)
container.registerSingleton(TOKENS.CommentRepository, CommentRepository)
container.registerSingleton(TOKENS.FriendRequestRepository, FriendRequestRepository)
container.registerSingleton(TOKENS.MessageRepository, MessageRepository)
container.registerSingleton(TOKENS.UserFriendRepository, UserFriendRepository)
container.registerSingleton(TOKENS.UserReactionRepository, UserReactionRepository)

// utils 
container.registerSingleton(TOKENS.NodeMailerProvider, NodeMailerProvider)
container.registerSingleton(TOKENS.RedisCachProvider, RedisCachProvider) 
container.registerSingleton(TOKENS.FirebasePushNotificationProvider, FirebasePushNotificationProvider)

export { container }