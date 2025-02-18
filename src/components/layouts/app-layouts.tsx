import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

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
        borderColor={'outline'}
      >
        <Outlet />
      </GridItem>
      <GridItem colSpan={1}>
        <SidebarRight />
      </GridItem>
    </Grid>
  );
}
export function SidebarRight() {
  return <Box height={'100vh'} position={'fixed'}></Box>;
}
export function SidebarLeft() {
  return <Box height={'100vh'} position={'fixed'}></Box>;
}
