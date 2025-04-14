import { Box, Spinner, Text } from '@chakra-ui/react';
import UseSuggestion from './hook/use-suggestion';
import SuggestionUserCard from './component/suggestion-card';

export default function SuggestionSection() {
  const { data: users, isLoading, isFetched } = UseSuggestion();
  return (
    <Box>
      {isLoading && (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Spinner />
        </Box>
      )}
      {isFetched && (
        <>
          {users?.length !== 0 ? (
            <>
              {users?.map((user) => (
                <SuggestionUserCard suggestion={user} key={user.id} />
              ))}
            </>
          ) : (
            <Box
              textAlign={'center'}
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
            >
              <Text textStyle={'lg'} fontWeight={'bold'} color={'white'}>
                No suggestion yet
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
