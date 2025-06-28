type Option = {
    id: number;
    key: string;
    value: string;
};

export type MultiChoiceQuestionItem = {
    id: number;
    title: string;
    question: string;
    difficulty_level: string;
    correct_answer: string;
    question_type: "multiple_choice" | "fill_in_the_blank";
    options: Option[];
    word_options: string[];
};

export type FillInTheBlankQuestionItem = {
    id: number;
    title: string;
    question: string;
    difficulty_level: string;
    correct_answer: string;
    question_type: "multiple_choice" | "fill_in_the_blank";
    word_options: string[];
};





