import { useNavigation } from "@react-navigation/native";
import { Button, H1, Progress, View, XStack, YStack } from "tamagui";
import { X } from "@tamagui/lucide-icons";

import { AudioQuestionForm } from "../components/questions/audioQuestion";
import { MultiChoiceQuestionForm } from "../components/questions/multiChoice";
import { FillQuestionForm } from "../components/questions/fill";
import { useEffect, useState } from "react";
import { QuestionType } from "../models/question";
import { getQuestion } from "../api/getQuestion";


export const Question = () => {
    const navigate = useNavigation();
    const [question, setQuestion] = useState<QuestionType>();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        navigate.goBack();
    }


    useEffect(() => {
        setIsLoading(true);
        getQuestion().then((data) => {
            setQuestion(data);
        })
            .catch((error) => {
                console.error("Error fetching question:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <YStack height="100%" width="100%" justifyContent="center" alignItems="center" backgroundColor="$background">
                <H1>Loading...</H1>
            </YStack>
        );
    }


    return (
        <YStack height="100%" width="100%" backgroundColor="$background">
            <XStack gap="$2" paddingTop="$10" alignItems="center" >
                <Button onPress={handleBack} circular icon={X} />
                <Progress theme="green" value={90} width="80%" height={8} borderRadius="$2" >
                    <Progress.Indicator animation="bouncy" />
                </Progress>
            </XStack>

            <View height="90%">
                {question && question?.question.question_type === 'multiple_choice' && <MultiChoiceQuestionForm question={question} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} />}
            </View>
        </YStack>
    );
}