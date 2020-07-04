export interface CommentForApproval {
    id: number;
    game: string;
    username: string;
    commentText: string;
    recipientId: number;
    addedOn: string;
}
