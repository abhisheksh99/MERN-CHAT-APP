import React from 'react';
import { 
    IconButton, 
    useDisclosure, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button, 
    Text, 
    Avatar 
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { useChatState } from '../context/ChatProvider';

const ProfileModal = ({ profileUser, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useChatState(); 

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    display={{ base: "flex" }}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                    aria-label="View Profile"
                />
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Avatar size="xl" name={profileUser?.name || user?.name} src={profileUser?.image || user?.image} mb={4} />
                        <Text fontSize="lg" fontWeight="bold"><strong>Name: </strong>{profileUser?.name || user?.name}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            <strong>Email: </strong> {profileUser?.email || user?.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfileModal;
