import React from 'react'
import {
  YStack,
  XStack,
  Text,
  ListItem,
  Avatar,
  H1,
  useTheme,
} from 'tamagui'
import { Trophy, Medal, User } from '@tamagui/lucide-icons'

export const Ranking = () => {
  const theme = useTheme()

  const rankingData = [
    { id: 1, name: 'Ana Silva', streak: 42 },
    { id: 2, name: 'Carlos Oliveira', streak: 38 },
    { id: 3, name: 'Mariana Costa', streak: 35 },
    { id: 4, name: 'Pedro Santos', streak: 28 },
    { id: 5, name: 'Juliana Pereira', streak: 25, identify: true },
    { id: 6, name: 'Fernando Almeida', streak: 22 },
    { id: 7, name: 'Camila Ribeiro', streak: 18 },
  ]

  const renderPositionBadge = (position: number) => {
    if (position === 1) return <Trophy size="$2" fill="gold" color="black" />
    if (position === 2) return <Medal size="$2" fill="silver" color="black" />
    if (position === 3) return <Medal size="$2" fill="#cd7f32" color="white" />
    return (
      <YStack
        width={28}
        height={28}
        borderRadius={14}
        backgroundColor="gray"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontWeight="bold">{position}</Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$3" backgroundColor="$background">
      <H1 marginTop="$14" size="$8" fontWeight="700" textAlign="center">
        Ranking
      </H1>

      <YStack space="$2" marginTop="$4">
        {rankingData.map((user, index) => {
          const position = index + 1
          const isTop3 = position <= 3

          return (
            <ListItem
              key={user.id}
              borderRadius="$3"
              backgroundColor="$background"
              borderWidth={isTop3 ? 2 : 1}
              borderColor={
                isTop3
                  ? position === 1
                    ? 'gold'
                    : position === 2
                    ? 'silver'
                    : '#cd7f32'
                  : '$borderColor'
              }
              padding="$3"
            >
              <XStack flex={1} alignItems="center" space="$3" justifyContent="space-between">
                {/* Left section: position, avatar, name, streak */}
                <XStack alignItems="center" space="$3" flex={1}>
                  {renderPositionBadge(position)}

                  <Avatar circular size="$2">
                    <User size="$1" />
                  </Avatar>

                  <YStack>
                    <Text fontWeight={isTop3 ? 'bold' : 'normal'} fontSize="$5">
                      {user.name}
                    </Text>
                    <Text color="gray" fontSize="$3">
                      {user.streak} dias consecutivos
                    </Text>
                  </YStack>
                </XStack>

                {/* Right section: "you" badge or position number */}
                <YStack alignItems="flex-end">
                  {isTop3 && (
                    <Text
                      fontSize="$7"
                      fontWeight="bold"
                      color={
                        position === 1
                          ? 'gold'
                          : position === 2
                          ? 'silver'
                          : '#cd7f32'
                      }
                    >
                      {position}°
                    </Text>
                  )}
                  {user.identify && (
                    <Text
                      backgroundColor="$background"
                      color="white"
                      paddingHorizontal="$8"
                      paddingVertical={2}
                      borderRadius="$2"
                      fontSize="$5"
                      fontWeight="600"
                      marginTop="$1"
                    >
                      you
                    </Text>
                  )}
                </YStack>
              </XStack>
            </ListItem>
          )
        })}
      </YStack>

      {/* Legenda */}
      <XStack justifyContent="center" marginTop="$4" space="$4">
        <XStack alignItems="center" space="$2">
          <Trophy size="$1" color="gold" />
          <Text fontSize="$2">1° Lugar</Text>
        </XStack>
        <XStack alignItems="center" space="$2">
          <Medal size="$1" color="silver" />
          <Text fontSize="$2">2° Lugar</Text>
        </XStack>
        <XStack alignItems="center" space="$2">
          <Medal size="$1" color="#cd7f32" />
          <Text fontSize="$2">3° Lugar</Text>
        </XStack>
      </XStack>
    </YStack>
  )
}
