import { Popover, PopoverBody, PopoverCloseButton, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow } from "@chakra-ui/react" 
import { useEffect, useState } from "react";
import { getSessions, deleteSession, loadSession } from "../utils/sessions";

const PopSess = () => {

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionList = await getSessions();  // Fetch sessions from storage
                setSession(sessionList);
            } catch (error) {
                console.error('Error fetching sessions:', error);  // Handle any fetch errors
            }
        };

        fetchSession();  // Call fetch function on mount
    }, []);  // Empty dependency array ensures this runs only once

    const [session, setSession] = useState<string[]>([]);

    const loadSession = async (name: string) => {
        await loadSession(name);
    }

    const deleteSession = async (name: string) => {
        await deleteSession(name)
    }

    return (
        <Popover
            placement='bottom'
            closeOnBlur={false}
        >
            <PopoverTrigger>
                <button className="task-bar">
                    <span className="carbon--mobile-session"></span>
                </button>
            </PopoverTrigger>
            <PopoverContent color='black' bg='white' borderColor='black.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                    Session History
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <ul>
                        {session.length > 0 ? (
                            session.map((sess, index) => (
                                <li key={index}>
                                    {sess}
                                    <button onClick={() => loadSession(sess)}>Load</button>
                                    <button onClick={() => deleteSession(sess)}>Delete</button>
                                </li>
                            ))
                        ) : (
                            <li>No sessions found</li>
                        )}
                    </ul>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default PopSess;