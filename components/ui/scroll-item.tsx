import { ScrollArea, VStack, Text } from "@chakra-ui/react";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

const paragraphs = lorem.generateParagraphs(7).split("\n");

const ScrollItem = () => (
    <ScrollArea.Root height="8.5rem" maxW="lg">
        <ScrollArea.Viewport>
            <ScrollArea.Content>
                <VStack align="stretch" gap="4">
                    {paragraphs.map((paragraph, index) => (
                        <Text key={index} fontSize="sm">
                            {paragraph}
                        </Text>
                    ))}
                </VStack>
            </ScrollArea.Content>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner />
    </ScrollArea.Root>
);

export default ScrollItem;