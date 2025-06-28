import { Input, Label, YStack } from "tamagui"

export function FillQuestionForm() {
    return (
        <YStack space="$2">
            <Label htmlFor="answer">Sua resposta</Label>
            <Input id="answer" placeholder="Digite sua resposta aqui..." />
        </YStack>
    )
}
