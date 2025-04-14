import { Button, Dialog, Portal, CloseButton, Text } from '@chakra-ui/react';
import { useDeleteThread } from '../hooks/use-delete-thread';
interface threadDataId {
  threadId: string;
}

export const DangerMenu = (threadDataId: threadDataId) => {
  const { threadId } = threadDataId;
  const { isPending, onSubmit } = useDeleteThread();
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onSubmit(threadId);
  };
  return (
    <Dialog.Root motionPreset={'slide-in-top'}>
      <Dialog.Trigger asChild>
        <Button variant="outline" color={'fg.error'} rounded={'4xl'}>
          delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger
              alignItems={'center'}
              justifyContent={'end'}
              px={'4'}
              asChild
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Delete Thread Confirmation</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text textStyle={'md'}>Do you want to delete this content?.</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                bg={'fg.error'}
                loading={isPending}
                onClick={handleDelete}
              >
                delete
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    // <>
    //   <Menu.Root>
    //     <Menu.Trigger asChild>
    //       <Button variant="ghost" size="sm" _hover={{ bg: 'initial' }}>
    //         <IoEllipsisHorizontalCircle color="white" />
    //       </Button>
    //     </Menu.Trigger>
    //     <Portal>
    //       <Menu.Positioner>
    //         <Menu.Content>
    //           <Menu.Item value="rename">Update</Menu.Item>
    //           <Menu.Item
    //             value="delete"
    //             color="fg.error"
    //             _hover={{ bg: 'bg.error', color: 'fg.error' }}
    //           >
    //             Delete...
    //           </Menu.Item>
    //         </Menu.Content>
    //       </Menu.Positioner>
    //     </Portal>
    //   </Menu.Root>
    // </>
  );
};
