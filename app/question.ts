export enum QTypes {Text, Combo, Bool}

export interface Question {
    id: number;
    text: string;
    q_type: QTypes;
}
