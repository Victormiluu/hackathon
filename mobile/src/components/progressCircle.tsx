// ProgressCircle.tsx
import { View } from 'tamagui'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

type ProgressCircleProps = {
    fill: number
    size?: number
    width?: number
    children?: React.ReactNode
}

export function ProgressCircle({ fill, size = 125, width = 7, children }: ProgressCircleProps) {
    return (
        <View alignItems="center" justifyContent="center">
            <AnimatedCircularProgress
                size={size}
                width={width}
                fill={fill}
                tintColor="green"
                backgroundColor="#3d3d3d"
                rotation={0}
            >
                {() => (
                    <View
                        position="absolute"
                        alignItems="center"
                        justifyContent="center"
                        width={size - width * 2}
                        height={size - width * 2}
                    >
                        {children}
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    )
}
