import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function FollowsPage() {
  let layerToggle = true;
  return (
    <Box>
      <Text textStyle={'2xl'}>Follows</Text>
      <Flex w={'full'}>
        <Text
          borderBottomWidth={layerToggle ? '5px' : '0'}
          borderBottomColor={'brand.solid'}
          flexBasis={'50%'}
        >
          <Button
            variant={'ghost'}
            _hover={{ bg: 'none' }}
            textAlign={'center'}
            size={'2xl'}
            w={'full'}
            onClick={() => {
              layerToggle = !layerToggle;
              console.log(layerToggle);
            }}
          >
            Followers
          </Button>
        </Text>
        <Text
          borderBottomWidth={!layerToggle ? '5px' : '0'}
          borderBottomColor={'brand.solid'}
          flexBasis={'50%'}
        >
          <Button
            variant={'ghost'}
            _hover={{ bg: 'none' }}
            textAlign={'center'}
            size={'2xl'}
            w={'full'}
            onClick={() => !layerToggle}
          >
            Following
          </Button>
        </Text>
      </Flex>
    </Box>
  );
}
