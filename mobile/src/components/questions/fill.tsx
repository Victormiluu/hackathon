import { YStack, H1, View, Paragraph, XStack, Button, Text } from "tamagui";
import { useState } from "react";
import { ChevronLeft } from "@tamagui/lucide-icons";

const sentenceTemplate = "The routine of an SRE is full of %WORD%, facing unexpected %WORD% during the %WORD%. When the %WORD% goes off, it's time to %WORD% tirelessly until the issue is resolved.";

const availableWords = [
    "incidents",
    "alerts",
    "on-call shifts",
    "monitor",
];

export function FillQuestionForm() {
    const [isSelected, setIsSelected] = useState<{ word: string, index: number }>();

    const handleWordSelect = (word: string, index: number) => {
        if (isSelected && isSelected.word === word) {
            setIsSelected(undefined);
        } else {
            setIsSelected({ word, index });
        }
    }

    const handleSubmit = () => { };


    return (
        <YStack padding="$4" gap="$6" flex={1} maxWidth={800} alignSelf="center">
            <H1 size="$8" fontWeight="700" textAlign="center">
                Selecione a resposta correta
            </H1>

            <Paragraph size="$5" color="gray" textAlign="center">
                Escolha a alternativa corretas para a questão abaixo:
            </Paragraph>

            <View padding="$4" backgroundColor="$backgroundHover" borderRadius="$4">
                <Text fontSize="$6" lineHeight="$7">
                    {sentenceTemplate}
                </Text>
            </View>

            <YStack gap="$3" marginTop="$4">
                {availableWords.map((word, index) => {
                    return (
                        <Button
                            key={word}
                            onPress={() => handleWordSelect(word, index)}
                            backgroundColor={isSelected?.index === index ? "gray" : "$background"}
                            borderRadius="$6">
                            {word}
                        </Button>
                    );
                })}
            </YStack>

            <View marginTop="auto" alignItems="center">
                <Button onPress={handleSubmit} theme="green" disabled={!isSelected} disabledStyle={{ opacity: 0.5 }} fullscreen size="$5">Enviar Resposta</Button>
            </View>
        </YStack>
    );
}
