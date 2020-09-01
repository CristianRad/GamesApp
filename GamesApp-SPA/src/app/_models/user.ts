export interface User {
    id: number;
    username: string;
    email: string;
    budget: number;
    photoUrl: string;
    lastActive: Date;
    created: Date;
    userRatings: number[];
    userComments: string[];
}
