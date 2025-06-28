import { YStack, H1, View, Paragraph, Button, Text, XStack } from "tamagui";
import { useState } from "react";
import { QuestionType } from "../../models/question";


type FillQuestionFormProps = {
    question?: QuestionType;
}


export function FillQuestionForm({ question }: FillQuestionFormProps) {
    if (!question) return null;

    const totalGaps = question?.question.question.split("%WORD%").length - 1;
    const [filledWords, setFilledWords] = useState<(string | null)[]>(Array(totalGaps).fill(null));

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
        const parts = question?.question.question.split("%WORD%");
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

    };


    return (
        <YStack padding="$2" paddingBottom="$4" flex={1} maxWidth={800} alignSelf="center">
            <H1 marginTop="$4" size="$8" fontWeight="700" textAlign="center">
                Complete as lacunas
            </H1>

            <Paragraph marginTop="$6" size="$5" color="gray" textAlign="center">
                Escolha as palavras corretas para completar a frase abaixo:
            </Paragraph>

            <View marginTop="$6" padding="$4" backgroundColor="$backgroundHover" borderRadius="$4">
                <Text fontSize="$6" lineHeight="$7">
                    {getFilledSentence()}
                </Text>
            </View>

            <XStack flexWrap="wrap" gap="$3" justifyContent="center" marginTop="$6">
                {question?.options.map((item) => {
                    const isSelected = filledWords.includes(item.value);

                    return (
                        <Button
                            key={item.value}
                            onPress={() => handleWordSelect(item.value)}
                            backgroundColor={isSelected ? "gray" : "$background"}
                            borderRadius="$6"
                            paddingHorizontal="$4"
                            paddingVertical="$2">
                            {item.value}
                        </Button>
                    );
                })}
            </XStack>

            <View marginTop="auto" alignItems="center">
                <Button onPress={handleSubmit} theme="green" disabled={filledWords.findIndex((w) => w === null) !== -1} disabledStyle={{ opacity: 0.5 }} fullscreen size="$5">Enviar Resposta</Button>
            </View>


        </YStack>
    );
}
