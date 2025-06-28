import { YStack, H1, View, Paragraph, Button, Text, XStack } from "tamagui";
import { useState } from "react";
import { FillInTheBlankQuestionItem } from "../../models/question";


type FillQuestionFormProps = {
    question?: FillInTheBlankQuestionItem;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    questionIndex: number;
}


export function FillQuestionForm({ question, questionIndex, setQuestionIndex }: FillQuestionFormProps) {
    if (!question) return null;

    const totalGaps = question?.question.split("FILL_HERE").length - 1;
    const [filledWords, setFilledWords] = useState<(string | null)[]>(Array(totalGaps).fill(null));
    const [sendResponse, setSendResponse] = useState(false);

    const handleWordSelect = (word: string) => {
        const index = filledWords.findIndex((w) => w === word);

        if (index !== -1) {
            const updated = [...filledWords];
            updated[index] = null;
            setFilledWords(updated);
        } else {
            const emptyIndex = filledWords.findIndex((w) => w === null);
            if (emptyIndex !== -1) {
                const updated = [...filledWords];
                updated[emptyIndex] = word;
                setFilledWords(updated);
            }
        }
    };

    const getFilledSentence = () => {
        const parts = question?.question.split("FILL_HERE");
        const filled = [];

        for (let i = 0; i < parts.length; i++) {
            filled.push(
                <Text key={`text-${i}`} color="gray">
                    {parts[i]}
                </Text>
            );

            if (i < totalGaps) {
                const word = filledWords[i];
                if (word) {
                    filled.push(
                        <Text key={`word-${i}`} color="gray" fontWeight="bold">
                            {word}
                        </Text>
                    );
                } else {
                    filled.push(
                        <Text
                            key={`blank-${i}`}
                            color="gray"
                            fontStyle="italic"
                        >
                            ______
                        </Text>
                    );
                }
            }
        }

        return filled;
    };

    const handleSubmit = () => {
        setSendResponse(true);

    };



    const handleNextQuestion = () => {
        setQuestionIndex(prevIndex => prevIndex + 1);
        setSendResponse(false);
        setFilledWords(Array(totalGaps).fill(null));
    }


    return (
        <YStack padding="$2" gap="$6" height="100%" maxWidth={800} alignSelf="center">
            <H1 size="$8" fontWeight="700" textAlign="center">
                Complete as lacunas
            </H1>

            <Paragraph size="$5" color="gray" textAlign="center">
                Escolha as palavras corretas para completar a frase abaixo:
            </Paragraph>

            <View padding="$4" backgroundColor="$backgroundHover" borderRadius="$4">
                <Text fontSize="$6" lineHeight="$7">
                    {getFilledSentence()}
                </Text>
            </View>

            <XStack flexWrap="wrap" gap="$3" justifyContent="center">
                {question.word_options.map((item) => {
                    const selectedIndex = filledWords.indexOf(item);

                    const correctAnswerStr = question.correct_answer;
                    const cleanStr = correctAnswerStr.replace(/[{}]/g, "");
                    const correctAnswerArray = cleanStr.split(",");

                    const isSelected = selectedIndex !== -1;
                    const isCorrectWord = correctAnswerArray.includes(item);
                    const isInCorrectPosition = isSelected && correctAnswerArray[selectedIndex] === item;
                    const correctIndex = correctAnswerArray.indexOf(item);

                    let backgroundColor = "$background";

                    if (sendResponse) {
                        if (isSelected && isCorrectWord && isInCorrectPosition) {
                            backgroundColor = "$green7";
                        } else if (isSelected && !isCorrectWord) {
                            backgroundColor = "$red5"
                        } else if (isCorrectWord) {
                            backgroundColor = "$yellow7";
                        }
                    } else {
                        backgroundColor = isSelected ? "gray" : "$background";
                    }

                    return (
                        <Button
                            key={item}
                            onPress={() => handleWordSelect(item)}
                            backgroundColor={backgroundColor}
                            borderRadius="$6"
                            paddingHorizontal="$4"
                            paddingVertical="$2"
                        >
                            {sendResponse && isCorrectWord
                                ? `${correctAnswerArray.indexOf(item) + 1} - ${item}`
                                : item}
                        </Button>
                    );
                })}
            </XStack>


            <View marginTop="auto" >
                {sendResponse ? (
                    <Button onPress={handleNextQuestion} theme="green" fullscreen size="$5">Proxima pergunta</Button>
                ) : (
                    <Button onPress={handleSubmit} theme="green" disabled={filledWords.findIndex((w) => w === null) !== -1} disabledStyle={{ opacity: 0.5 }} fullscreen size="$5">Enviar Resposta</Button>
                )}
            </View>

        </YStack>
    );
}
