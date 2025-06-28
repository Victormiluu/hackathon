import { YStack, H1, View, Paragraph, XStack, Button, Text } from "tamagui";
import { useState } from "react";
import { QuestionType } from "../../models/question";

type MultiChoiceQuestionFormProps = {
    question?: QuestionType;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    questionIndex: number;
}

export function MultiChoiceQuestionForm({ question, questionIndex, setQuestionIndex }: MultiChoiceQuestionFormProps) {
    const [isSelected, setIsSelected] = useState<{ word: string, id: number, key: string }>();
    const [sendResponse, setSendResponse] = useState(false);

    const handleWordSelect = (word: string, id: number, key: string) => {
        if (isSelected && isSelected.id === id) {
            setIsSelected(undefined);
        } else {
            setIsSelected({ word, id, key });
        }
    }

    const handleSubmit = () => {
        setSendResponse(true);
    };

    const handleNextQuestion = () => {
        setQuestionIndex(questionIndex++);
        setSendResponse(false);
        setIsSelected(undefined);
    }

    return (
        <YStack padding="$2" gap="$6" height="90%" maxWidth={800} alignSelf="center">
            <H1 size="$8" fontWeight="700" textAlign="center">
                Escolha a opção correta
            </H1>

            <Paragraph size="$5" color="gray" textAlign="center">
                Escolha a alternativa corretas para a questão abaixo:
            </Paragraph>

            <View padding="$4" backgroundColor="$backgroundHover" borderRadius="$4">
                <Text fontSize="$6" lineHeight="$7">
                    {question?.question.question}
                </Text>
            </View>

            <YStack gap="$3">
                {question?.options.map((word, index) => {
                    return (
                        <Button
                            key={word.id}
                            onPress={() => handleWordSelect(word.value, word.id, word.key)}
                            disabled={sendResponse}
                            backgroundColor={sendResponse && question.question.correct_answer === word.key ? "$green7" : sendResponse && question.question.correct_answer !== word.key ? "$red5" : isSelected?.id === word.id ? "gray" : "$background"}
                            borderRadius="$6">
                            {word.value}
                        </Button>
                    );
                })}
            </YStack>

            <View>
                {sendResponse && (
                    <Paragraph marginTop="$6" size="$5" color={question?.question.correct_answer === isSelected?.key ? "$green7" : "$red9"} textAlign="center">
                        {question?.question.correct_answer === isSelected?.key ? "Resposta Correta!" : `Resposta Incorreta! A resposta correta é: ${question?.question.correct_answer}`}
                    </Paragraph>
                )}
            </View>

            <View marginTop="auto" >
                {sendResponse ? (
                    <Button onPress={handleNextQuestion} theme="green" fullscreen size="$5">Proxima pergunta</Button>
                ) : (
                    <Button onPress={handleSubmit} theme="green" disabled={!isSelected} disabledStyle={{ opacity: 0.5 }} fullscreen size="$5">Enviar Resposta</Button>
                )}
            </View>

        </YStack>
    );
}
