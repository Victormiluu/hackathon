type Option = {
    id: number;
    value: string;
    question_id: number;
    key: string;
};

type Question = {
    question: string;
    difficulty_level: 'easy' | 'medium' | 'hard';
    id: number;
    title: string;
    question_type: 'multiple_choice' | 'true_false' | 'fill_in_the_blank';
    correct_answer: string;
    options: Option[];
};

export type QuestionType = {
    question: Question;
    options: Option[];
};
