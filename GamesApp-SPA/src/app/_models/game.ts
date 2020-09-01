import { Screenshot } from './screenshot';

export interface Game {
    id: number;
    title: string;
    type: string;
    year: number;
    price: number;
    multiplayer: boolean;
    photoUrl: string;
    description?: string;
    screenshots?: Screenshot[];
    userComments?: any[];
    rating: number;
}
