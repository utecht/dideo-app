export interface Question {
    id: number;
    category: string;
    text: string;
    q_type: string;
    options?: Opt[];
}

export interface Category {
    id: number;
    name: string;
}

export interface Opt {
    id: number;
    text: string;
    free: boolean;
}
