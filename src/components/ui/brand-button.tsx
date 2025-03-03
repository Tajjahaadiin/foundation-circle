import { Button, ButtonProps } from '@chakra-ui/react';
interface MyBrandBtnProps extends ButtonProps {
  children: React.ReactNode;
}
export default function MyBrandBtn({ children, ...props }: MyBrandBtnProps) {
  return (
    <Button rounded={'full'} {...props} color={'#FFF'} bg={'brand.solid'}>
      {children}
    </Button>
  );
}
