import { Popover, PopoverBody, PopoverCloseButton, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow } from "@chakra-ui/react" 
import { useEffect, useState } from "react";
import { getSessions, loadSession, deleteSession, Session } from "../utils/sessions";

const PopSess = () => {
    const [session, setSession] = useState<Record<string, Session>>({});
    
    const deleteSess = async (name: string) => {
        await deleteSession(name);
        setSession(prev => {
            const newSessions = { ...prev };
            delete newSessions[name];
            return newSessions;
        });
    }

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


    const loadSess = async (name: string) => {
        await loadSession(name);
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
                    <ul className="space-y-2">
                        {Object.keys(session).length > 0 ? (
                            Object.entries(session).map(([key, value], idx) => (
                                <li className="flex items-center justify-between w-full" key={idx}>
                                    <span className="flex-1">{ value.name }</span>
                                    <button className='px-3 py-1 bg-blue-600 text-white' onClick={() => loadSess(key)}>Load</button>
                                    <button className='px-3 py-1 bg-pink-600 text-black' onClick={() => deleteSess(key)}>Delete</button>
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