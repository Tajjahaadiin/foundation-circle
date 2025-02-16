import errorImage from '@/assets/404.svg';
import { Box, Text } from '@chakra-ui/react';
export default function ErrorRoute() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        margin: '0 auto',
        backgroundColor: 'lavender',
        gap: '50px',
      }}
    >
      <img width={'50%'} src={errorImage} alt="error Image" />
      <Text style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>
        Page not found
      </Text>
    </Box>
  );
}
