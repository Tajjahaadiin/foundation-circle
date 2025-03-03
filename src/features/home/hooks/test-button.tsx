import { Button } from '@chakra-ui/react';
const TestButton = () => {
  const handleClick = () => {
    console.log('Test Button');
  };

  return (
    <>
      <Button onClick={handleClick}> Test Click </Button>
    </>
  );
};

export default TestButton;
