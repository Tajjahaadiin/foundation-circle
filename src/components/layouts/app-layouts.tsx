import {
  Box,
  Grid,
  GridItem,
  Link as ChakraLink,
  Text,
  Image,
  Button,
  Flex,
  Float,
} from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import brandLogo from '@/assets/logo.svg';
import { logoutLogo } from '@/assets/icons';
export default function Applayout() {
  return (
    <Grid templateColumns={'repeat(4,1fr)'}>
      <GridItem colSpan={1}>
        <SidebarLeft />
      </GridItem>
      <GridItem
        colSpan={{ base: 4, lg: 2 }}
        padding={'40px'}
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
  function Callalert() {
    alert('test');
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
          <Button
            mx={'5'}
            bg={'brand.solid'}
            rounded={'2xl'}
            w={{ base: '300px' }}
            color={'#fff'}
          >
            create post
          </Button>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} className="nav-bottom">
        <Flex h={'full'}>
          <Button
            bg={'none'}
            rounded={'2xl'}
            w={{ base: '300px' }}
            color={'#fff'}
            onClick={Callalert}
          >
            <Box
              display={'flex'}
              gapX={5}
              justifyContent={'center'}
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
          <Text>My profile</Text>
          <Flex flexDir={'column'}>
            <Box
              position="relative"
              h={'12vh'}
              w={'full'}
              backgroundImage={`url('https://api.dicebear.com/9.x/glass/svg?seed=tono')`}
              alignSelf={'center'}
              rounded={'lg'}
            >
              <Float placement={'bottom-start'} offsetX="10">
                <Avatar
                  src="https://api.dicebear.com/9.x/big-smile/svg?seed=Jhon%Doe"
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
              edit profile
            </Button>
          </Flex>

          <Flex flexDir={'column'} gap={'1'}>
            <Text textStyle={'md'}>✨Jhon Doe✨</Text>
            <Text textStyle={'xs'} color={'text.light'}>
              @Jhondoe
            </Text>
            <Text textStyle={'sm'}>I believe i can fly</Text>
            <Flex gap={'2'} textStyle={'sm'} w={'full'}>
              <Text textStyle={'sm'} color={'text.light'}>
                234 Followers
              </Text>
              <Text textStyle={'sm'} color={'text.light'}>
                276 Following
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
