import { Mic, Pause, Play, X } from "@tamagui/lucide-icons";
import { Audio } from "expo-av"
import { useEffect, useRef, useState } from "react"
import { YStack, H1, View, Paragraph, Button } from "tamagui";


export function AudioQuestionForm() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const [recordedURI, setRecordedURI] = useState<string | null>(null)
    const [sound, setSound] = useState<Audio.Sound | null>(null)


    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await Audio.requestPermissionsAsync()
            if (status !== "granted") {
                alert("Permissão para usar o microfone é necessária.")
            }
        }

        requestPermission()

        return () => {
            if (sound) {
                sound.unloadAsync()
            }
        }
    }, [])

    const startRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            )

            setRecording(recording)
        } catch (error) {
            console.error("Erro ao iniciar gravação", error)
        }
    }

    const stopRecording = async () => {
        try {
            if (!recording) return

            await recording.stopAndUnloadAsync()
            const uri = recording.getURI()
            setRecordedURI(uri ?? null)
            setRecording(null)
        } catch (error) {
            console.error("Erro ao parar gravação", error)
        }
    }

    const playRecording = async () => {
        try {
            if (!recordedURI) return

            const { sound: playbackObject } = await Audio.Sound.createAsync(
                { uri: recordedURI },
                { shouldPlay: true }
            )

            setSound(playbackObject)
        } catch (error) {
            console.error("Erro ao reproduzir áudio:", error)
        }
    }

    const handleSubmit = () => {

    };

    return (
        <YStack padding="$2" flex={1} maxWidth={800} alignSelf="center">
            <H1 marginTop="$4" size="$8" fontWeight="700" textAlign="center">
                Conte como é a rotina de um SRE
            </H1>

            <Paragraph marginTop="$6" size="$5" color="gray" textAlign="center">
                Grave um breve relato explicando o dia a dia de um(a) Site Reliability Engineer. Fale sobre atividades comuns, responsabilidades e principais desafios da função.
            </Paragraph>

            <YStack gap="$3" flex={1} alignItems="center" justifyContent="center" marginTop="$2">
                {recording ? (
                    <Button circular icon={Pause} size="$13" onPress={stopRecording} />
                ) : (
                    recordedURI ? (
                        <View>
                            <Button circular icon={Play} size="$13" onPress={playRecording} />
                            <Button circular theme="red" icon={X} size="$5" onPress={() => setRecordedURI(null)} />
                        </View>
                    ) : (
                        <Button circular icon={Mic} size="$13" onPress={startRecording} />
                    )
                )}
            </YStack>


            <View marginTop="auto" alignItems="center">
                <Button onPress={handleSubmit} theme="green" disabled={!recordedURI} disabledStyle={{ opacity: 0.5 }} fullscreen size="$5">Enviar Resposta</Button>
            </View>


        </YStack>
    )
}
