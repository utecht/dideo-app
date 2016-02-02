export interface Question {
    id: number;
    category: string;
    text: string;
    q_type: string;
    options?: string[];
}
