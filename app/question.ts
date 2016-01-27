export interface Question {
    id: number;
    group: string;
    text: string;
    q_type: string;
    options?: string[];
}
