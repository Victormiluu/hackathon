import { Avatar, Card, Text, View, XStack, YStack } from "tamagui";
import { BarChart, CheckCircle, XCircle, Clock, RefreshCcw, CheckCheck } from "@tamagui/lucide-icons";

const StatCard = ({ icon: Icon, value, label, bg = "$backgroundHover",
}: {
    icon: React.ElementType; value: number | string; label: string; bg?: string;
}) => (
    <Card padding="$4" borderRadius="$4" elevate backgroundColor={bg}
    >
        <XStack alignItems="center" space="$3">
            <Icon size="$2" color="gray" />
            <YStack>
                <Text fontSize="$5" fontWeight="bold">{value}</Text>
                <Text color="gray"> {label}</Text>
            </YStack>
        </XStack>
    </Card>
);



export const Profile = () => {
    return (
        <YStack height="100%" width="100%" paddingTop="$10" paddingHorizontal="$4" backgroundColor="$background">

            <XStack gap="$2" paddingTop="$2" alignItems="center">
                <Avatar circular size="$6">
                    <Avatar.Image src="http://picsum.photos/200/300" />
                    <Avatar.Fallback />
                </Avatar>


                <YStack justifyContent="center" alignItems="flex-start">
                    <Text fontSize="$6" fontWeight="bold">Gustavo Henrico</Text>
                    <XStack gap="$2" paddingTop="$2" alignItems="center">
                        <Text color="gray">@GustavoHenrico23454</Text>
                        <Text color="gray">• Desde junho de 2025</Text>
                    </XStack>
                </YStack>
            </XStack>


            <YStack paddingTop="$10" gap="$6" >
                <YStack gap="$3">
                    <Text fontSize="$6" fontWeight="600">Minhas estatísticas</Text>
                    <StatCard icon={BarChart} value={0} label="Respostas dadas" />
                    <StatCard icon={CheckCircle} value={0} label="Respostas corretas" />
                    <StatCard icon={XCircle} value={0} label="Respostas erradas" />
                </YStack>

                <YStack gap="$3">
                    <Text fontSize="$6" fontWeight="600">Minhas informações</Text>
                    <StatCard icon={Clock} value={0} label="Respostas pendentes" />
                    <StatCard icon={RefreshCcw} value={0} label="Respostas em progresso" />
                    <StatCard icon={CheckCheck} value={0} label="Respostas finalizadas" />
                </YStack>
            </YStack>
        </YStack>
    );
};
