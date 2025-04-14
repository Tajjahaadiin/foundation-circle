import { searchLogoOutline } from '@/assets/icons';
import { InputGroup } from '@/components/ui/input-group';
import { api } from '@/lib/api';
import { Box, Image, Input, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchUser } from '../types/search-user';
import SearchUserCard from './search-user-card';

export default function SearchUsers() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounced] = useDebounce(searchText, 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const {
    data: users,
    isLoading,
    isFetched,
    refetch,
  } = useQuery<SearchUser[]>({
    queryKey: ['search-users'],
    queryFn: async () => {
      const resposnse = await api.get(`/users/search?q=${searchTextDebounced}`);
      console.log('search', resposnse.data);
      return resposnse.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounced, refetch]);
  return (
    <Box>
      <InputGroup
        px={'20px'}
        pt={'40px'}
        width={'100%'}
        spaceX={4}
        color={'white'}
        startElement={<Image src={searchLogoOutline} width={'20px'} mx={'3'} />}
      >
        <Input
          placeholder="Username"
          borderRadius={'xl'}
          border={'2px solid'}
          bg={'bdr'}
          _focus={{
            borderColor: 'brand.solid',
          }}
          onChange={handleChange}
        />
      </InputGroup>

      {isLoading && (
        <Box
          display={'flex'}
          h={'dvh'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner />
        </Box>
      )}
      {isFetched && (
        <>
          {users?.length !== 0 ? (
            <>
              {users?.map((user) => (
                <SearchUserCard searchUserData={user} key={user.id} />
              ))}
            </>
          ) : (
            <Box
              textAlign={'center'}
              display={'flex'}
              flexDir={'column'}
              h={'dvh'}
              justifyContent={'center'}
            >
              <Text textStyle={'lg'} fontWeight={'bold'} color={'white'}>
                No result for "{searchTextDebounced}"
              </Text>
              <Text textWrap={'wrap'} textStyle={'md'} color={'white'}>
                Try Searching For Something else or check the spelling that you
                typed
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
