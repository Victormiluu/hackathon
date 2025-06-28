import { useNavigation } from "@react-navigation/native";
import { Button, H1, Progress, View, XStack, YStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";

import { AudioQuestionForm } from "../components/questions/audioQuestion";
import { MultiChoiceQuestionForm } from "../components/questions/multiChoice";
import { FillQuestionForm } from "../components/questions/fill";
import { useEffect, useState } from "react";
import { MultiChoiceQuestionItem, FillInTheBlankQuestionItem } from "../models/question";
import { getQuestion } from "../api/getQuestion";
import { refreshQuestion } from "../api/refreshQuestion";


export const Question = () => {
    const navigate = useNavigation();
    const [questions, setQuestions] = useState<MultiChoiceQuestionItem[] | FillInTheBlankQuestionItem[]>();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        navigate.goBack();
    }


    useEffect(() => {
        setIsLoading(true);
        getQuestion().then((data) => {
            setQuestions(data);
        })
            .catch((error) => {
                console.error("Error fetching question:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (questionIndex !== 0 && questionIndex % 3 === 0) {
            console.log("Refresh");
            refreshQuestion().then((data) => {
                setQuestions((prev) => [...(prev || []), ...data]);
            });
        }
    }, [questionIndex]);


    if (isLoading) {
        return (
            <YStack height="100%" width="100%" justifyContent="center" alignItems="center" backgroundColor="$background">
                <H1>Loading...</H1>
            </YStack>
        );
    }

    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <View paddingTop="$10" height="90%">
                {questions && questions.length > 0 && questions[questionIndex].question_type === 'multiple_choice' && (
                    <MultiChoiceQuestionForm
                        question={questions[questionIndex] as MultiChoiceQuestionItem}
                        questionIndex={questionIndex}
                        setQuestionIndex={setQuestionIndex}
                    />
                )}
                {questions && questions.length > 0 && questions[questionIndex].question_type === 'fill_in_the_blank' && (
                    <FillQuestionForm
                        question={questions[questionIndex] as FillInTheBlankQuestionItem}
                        questionIndex={questionIndex}
                        setQuestionIndex={setQuestionIndex}
                    />
                )}
            </View>
        </YStack>
    );
}