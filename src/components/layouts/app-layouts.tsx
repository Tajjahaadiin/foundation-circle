import { logoutLogo } from '@/assets/icons';
import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Float,
  Grid,
  GridItem,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import MyBrandBtn from '../ui/brand-button';
import { useAuthStore, UserProfile } from '@/stores/authStore';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function Applayout() {
  const {
    user: user,
    setUser,
    logout,
    startLoading,
    stopLoading,
  } = useAuthStore();
  interface CheckResponse {
    message: string;
    data: {
      user: UserProfile;
    };
  }
  const { isLoading, isError } = useQuery({
    queryKey: ['check-auth'],
    queryFn: async () => {
      try {
        startLoading();
        const token = Cookies.get('token');
        console.log('token', token);
        const response = await api.post<CheckResponse>(
          '/auth/check',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('responseData', response.data.data);
        setUser(response.data.data.user);
        return response.data;
      } catch (error) {
        console.log(error);
        Cookies.remove('token');
        logout();
        throw error;
      } finally {
        stopLoading();
      }
    },
  });
  if (isLoading) {
    // Show loading spinner while checking auth
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (isError) {
    return <Navigate to="/login" />;
  }
  // console.log('this is user: ', user);

  if (!user) {
    console.log('something went wrong, navigate to login');
    return <Navigate to={'/login'} />;
  }

  // if (isFetched) {
  //   console.log('usernameisnotFetched', username);
  //   if (!username) return <Navigate to={'/login'} />;
  //   console.log('usernameisFetched', username);
  //   return (
  //     <Grid templateColumns={'repeat(4,1fr)'}>
  //       <GridItem colSpan={1}>
  //         <SidebarLeft />
  //       </GridItem>
  //       <GridItem
  //         minHeight={'dvh'}
  //         colSpan={{ base: 4, lg: 2 }}
  //         borderX={'1px solid'}
  //         borderColor={'border'}
  //       >
  //         <Outlet />
  //       </GridItem>
  //       <GridItem colSpan={1}>
  //         <SidebarRight />
  //       </GridItem>
  //     </Grid>
  //   );
  // }
  return (
    <Grid templateColumns={'repeat(4,1fr)'}>
      <GridItem colSpan={1}>
        <SidebarLeft />
      </GridItem>
      <GridItem
        minHeight={'dvh'}
        colSpan={{ base: 4, lg: 2 }}
        borderX={'1px solid'}
        borderColor={'border'}
      >
        <Outlet />
      </GridItem>
      <GridItem colSpan={1}>
        <SidebarRight />
      </GridItem>
    </Grid>
  );
}
export function SidebarLeft() {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    Cookies.remove('token');
    navigate('/login');
  }
  return (
    <Grid templateRows="repeat(6, 1fr)" h={'dvh'} position={'sticky'} top={'0'}>
      <GridItem rowSpan={1} className="nav-top">
        <Flex
          h={'full'}
          w={'full'}
          justifyContent={'start'}
          alignItems={'center'}
        >
          <Image
            src={brandLogo}
            minH={{ base: '50%', lg: '50%', md: '30%' }}
            maxH={'60%'}
            px={'5'}
          />
        </Flex>
      </GridItem>
      <GridItem rowSpan={4} className="nav-middle">
        <Flex h={'full'} flexDir={'column'} spaceY={'5'} pt={'5'}>
          {NAV_LINK_MENU.map(({ label, logo, path }, index) => (
            <Flex px={5}>
              <ChakraLink asChild key={index} w={'full'}>
                <NavLink to={path}>
                  <Flex w={'full'} alignItems={'center'} spaceX={'4'}>
                    <Image
                      src={pathname === path ? logo.fill : logo.outline}
                      width={'10%'}
                    />
                    <Text fontSize={'1rem'}>{label}</Text>
                  </Flex>
                </NavLink>
              </ChakraLink>
            </Flex>
          ))}
          <MyBrandBtn mx={'5'} key="1">
            create post
          </MyBrandBtn>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} className="nav-bottom">
        <Flex h={'full'}>
          <Button
            bg={'none'}
            rounded={'2xl'}
            w={{ base: '300px' }}
            color={'#fff'}
            onClick={onLogout}
            justifyContent={'start'}
          >
            <Box
              display={'flex'}
              gapX={5}
              justifyContent={'start'}
              alignItems={'center'}
            >
              <Image src={logoutLogo} width={'30%'}></Image>
              <Text>Logout</Text>
            </Box>
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
export function SidebarRight() {
  const user = useAuthStore((state) => state.user);

  return (
    <Grid
      templateRows={'repeat(7,82px)'}
      h={'dvh'}
      position={'sticky'}
      top={'0'}
      spaceY={'5'}
      p={'2.5vh'}
    >
      <GridItem
        rowSpan={3}
        bg={'card'}
        rounded={'l3'}
        className="left-card"
        p={'3'}
      >
        <Flex flexDir={'column'} h={'full'}>
          <Text>My Profile</Text>
          <Flex flexDir={'column'}>
            <Box
              position="relative"
              h={'12vh'}
              w={'full'}
              bgImage={`url("https://api.dicebear.com/9.x/glass/svg?seed=${user?.profile?.fullName}")`}
              alignSelf={'center'}
              rounded={'lg'}
            >
              <Float placement={'bottom-start'} offsetX="10">
                <Avatar
                  name={user?.profile?.fullName || ''}
                  src={
                    user?.profile?.avatarUrl ||
                    `https://api.dicebear.com/9.x/big-smile/svg?seed=${user?.profile?.fullName || ''}`
                  }
                  size={'xl'}
                />
              </Float>
            </Box>
            <Button
              w={'7vw'}
              h={'5vh'}
              mt={'2'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
              alignItems={'center'}
            >
              Edit Profile
            </Button>
          </Flex>

          <Flex flexDir={'column'} gap={'1'}>
            <Text textStyle={'md'}>✨{user?.profile?.fullName || ''}✨</Text>
            <Text textStyle={'xs'} color={'text.light'}>
              @ {user?.username || ''}
            </Text>
            <Text textStyle={'sm'}>{user?.profile?.bio}</Text>
            <Flex gap={'2'} textStyle={'sm'} w={'full'}>
              <Text textStyle={'sm'} color={'text.light'}>
                200 Followers
              </Text>
              <Text textStyle={'sm'} color={'text.light'}>
                100 Following
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem rowSpan={3} bg={'card'} rounded={'l3'} p={'1.5vh'}>
        <Text my={'0.5vh'} textStyle={'sm'}>
          Suggested For you
        </Text>
        <Grid templateColumns={'repeat(7,1fr)'} className="follow-card">
          <GridItem colSpan={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random()}`}
              size={'sm'}
            />
          </GridItem>
          <GridItem colSpan={5} px={'3'}>
            <Flex flexDir={'column'}>
              <Text textStyle={'sm'}>Bamus e</Text>
              <Text textStyle={'xs'} color={'text.light'}>
                @Bramus
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              w={'5vw'}
              h={'3.5vh'}
              mt={'2'}
              textStyle={'xs'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
            >
              Following
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns={'repeat(7,1fr)'} className="follow-card">
          <GridItem colSpan={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random()}`}
              size={'sm'}
            />
          </GridItem>
          <GridItem colSpan={5} px={'3'}>
            <Flex flexDir={'column'}>
              <Text textStyle={'sm'}>Busta rum</Text>
              <Text textStyle={'xs'} color={'text.light'}>
                @Bus4
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              w={'5vw'}
              h={'3.5vh'}
              mt={'2'}
              textStyle={'xs'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
            >
              Following
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns={'repeat(7,1fr)'} className="follow-card">
          <GridItem colSpan={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random()}`}
              size={'sm'}
            />
          </GridItem>
          <GridItem colSpan={5} px={'3'}>
            <Flex flexDir={'column'}>
              <Text textStyle={'sm'}>Lemon </Text>
              <Text textStyle={'xs'} color={'text.light'}>
                @Jhonlemon
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              w={'5vw'}
              h={'3.5vh'}
              mt={'2'}
              textStyle={'xs'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
            >
              Following
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns={'repeat(7,1fr)'} className="follow-card">
          <GridItem colSpan={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random()}`}
              size={'sm'}
            />
          </GridItem>
          <GridItem colSpan={5} px={'3'}>
            <Flex flexDir={'column'}>
              <Text textStyle={'sm'}>Raven Doe</Text>
              <Text textStyle={'xs'} color={'text.light'}>
                @Raven
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              w={'5vw'}
              h={'3.5vh'}
              mt={'2'}
              textStyle={'xs'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
            >
              Following
            </Button>
          </GridItem>
        </Grid>
        <Grid templateColumns={'repeat(7,1fr)'} className="follow-card">
          <GridItem colSpan={1}>
            <Avatar
              src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${Math.random()}`}
              size={'sm'}
            />
          </GridItem>
          <GridItem colSpan={5} px={'3'}>
            <Flex flexDir={'column'}>
              <Text textStyle={'sm'}>Lemos</Text>
              <Text textStyle={'xs'} color={'text.light'}>
                @Leomos4
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Button
              w={'5vw'}
              h={'3.5vh'}
              mt={'2'}
              textStyle={'xs'}
              alignSelf={'end'}
              bg={'none'}
              color={'white'}
              borderWidth={'1px'}
              borderColor={'white'}
              rounded={'full'}
            >
              Following
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem rowSpan={1} bg={'card'} rounded={'l3'}></GridItem>
    </Grid>
  );
}
