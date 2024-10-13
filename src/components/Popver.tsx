import { Popover, Input, ButtonGroup, PopoverFooter, PopoverBody, PopoverCloseButton, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { saveSession } from "../utils/sessions";

const PopMenu = () => {
  const toast = useToast();
  const [input, setInput] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSession = async (name: string) => {
      await saveSession(name);
      toast({
          title: 'Session Saved',
          description: `Session ${name} has been saved`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
      });
  }

  return (
    <Popover
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <button className="task-bar">
          <span className="hugeicons--folder-file-storage"></span>
        </button>
      </PopoverTrigger>
      <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          Manage Your Session
        </PopoverHeader>
        <PopoverArrow bg='blue.800' />
        <PopoverCloseButton />
        <PopoverBody>
          <Input 
            value={input} onChange={handleInput}
            variant='flushed' placeholder='Session Name'
            _placeholder={{ color: 'gray.500', fontSize: 'sm' }}
          />
        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
          <ButtonGroup size='sm'>
            <button onClick={() => handleSession(input)} className='bg-blue-500 px-3 py-1'>
              Save
            </button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default PopMenu;