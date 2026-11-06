export const TOKENS = {
    //services
    UserService : Symbol.for("UserService"),
    ChatService : Symbol.for("ChatService"),
    AuthService : Symbol.for("AuthService"),
    PostService : Symbol.for("PostService"),
    CommentService : Symbol.for("CommentService"),
    FriendRequestService : Symbol.for("FriendRequestService"),
    // repository 
    UserRepository : Symbol.for("UserRepository"),
    ChatRepository : Symbol.for("ChatRepository"),
    PostRepository : Symbol.for("PostRepository"),
    CommentRepository : Symbol.for("CommentRepository"),
    MessageRepository : Symbol.for("MessageRepository"),
    FriendRequestRepository : Symbol.for("FriendRequestRepository"),
    UserFriendRepository : Symbol.for("UserFriendRepository"),
    UserReactionRepository : Symbol.for("UserReactionRepository"),
    // utils
    NodeMailerProvider : Symbol.for("NodeMailerProvider"),
    RedisCachProvider : Symbol.for("RedisCachProvider"),
    FirebasePushNotificationProvider : Symbol.for("FirebasePushNotificationProvider"),
    S3CloudProvider : Symbol.for("S3CloudProvider")
    
} 

