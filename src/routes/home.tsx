import { HStack, Button } from '@chakra-ui/react';
export default function Home() {
  return (
    <HStack>
      <Button bg="brand.contrast" color="brand.solid">
        Clickme
      </Button>
      <Button>Clickme</Button>
      <Button>Clickme</Button>
    </HStack>
  );
}
