import { YStack, H1, View, Paragraph, XStack, Button, Text } from "tamagui";
import { useState } from "react";

const sentenceTemplate = "The routine of an SRE is full of %WORD%, facing unexpected %WORD% during the %WORD%. When the %WORD% goes off, it's time to %WORD% tirelessly until the issue is resolved.";

const availableWords = [
    "incidents",
    "alerts",
    "on-call shifts",
    "monitor",
    "logs",
    "deploys",
    "debug",
    "spikes",
];

export function MultiChoiceQuestionForm() {
    const totalGaps = sentenceTemplate.split("%WORD%").length - 1;
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
        const parts = sentenceTemplate.split("%WORD%");
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
                            _________
                        </Text>
                    );
                }
            }
        }

        return filled;
    };




    return (
        <YStack padding="$4" space="$6" maxWidth={800} alignSelf="center">
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

            <XStack flexWrap="wrap" gap="$3" justifyContent="center" marginTop="$4">
                {availableWords.map((word) => {
                    const isSelected = filledWords.includes(word);

                    return (
                        <Button
                            key={word}
                            onPress={() => handleWordSelect(word)}
                            backgroundColor={isSelected ? "gray" : "$background"}
                            borderRadius="$6"
                            paddingHorizontal="$4"
                            paddingVertical="$2">
                            {word}
                        </Button>
                    );
                })}
            </XStack>
        </YStack>
    );
}
