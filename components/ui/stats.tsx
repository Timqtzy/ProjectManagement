import { FormatNumber, Stat } from "@chakra-ui/react"

interface StatsProps {
    label: string,
    value: number,
}

const Stats = ({label, value}: StatsProps) => {
    return (
        <Stat.Root>
            <Stat.Label>{label}</Stat.Label>
            <Stat.ValueText>
                <FormatNumber value={935.4}/>
            </Stat.ValueText>
        </Stat.Root>
    )
}

export default Stats;