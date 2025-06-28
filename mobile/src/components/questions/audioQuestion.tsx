import { Audio } from "expo-av"
import { useEffect, useState } from "react"
import { Button, Text, YStack } from "tamagui"

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

    return (
        <YStack space="$3">
            <Text>{recording ? "Gravando..." : "Pronto para gravar"}</Text>

            <Button onPress={recording ? stopRecording : startRecording}>
                {recording ? "Parar Gravação" : "Iniciar Gravação"}
            </Button>

            {recordedURI && (
                <>
                    <Text>Áudio salvo em: {recordedURI}</Text>
                    <Button onPress={playRecording}>Reproduzir Áudio</Button>
                </>
            )}
        </YStack>
    )
}
