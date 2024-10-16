import { Switch,  FormControl, FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper } from '@chakra-ui/react'
import '../App.css';
import { setMaxTabs } from '../utils/tabs';
import { useEffect, useState } from 'react';
import { getMaxTabs } from '../utils/tabs';


const OptionsPage = ({onBack}: {onBack: () => void}) => {
    const [limit, setLimit] = useState<number>(0);
    const handleLimit = async (valueAsString: string, valueAsNumber: number) => {
        // Set the new value for maxTabs
        void valueAsString;
        setLimit(valueAsNumber);
        await setMaxTabs(valueAsNumber);
    };
    useEffect(() => {
        void (async () => {
            const maxTabs = await getMaxTabs();
            setLimit(maxTabs);
        })()
    }, [0]);
    return (
        <section className="bg-slate-100 text-base">
            <header className="flex items-center bg-white space-x-4 border-b p-4 w-full">
                <button onClick={onBack}>
                    <span className="mingcute--back-fill"></span>
                </button>
                <h1 className="font-bold text-lg">Option page</h1>
            </header>
            <section className="p-4 space-y-2 w-full">
                <article className="rounded-md mx-auto bg-white px-4 py-2">
                    <h2 className="font-semibold">Limit Tabs Per Window</h2>
                    <p className='text-xs'>
                        Once you reach this number of tabs, Tab Manager will
                        move new tabs to a new window or remove least used tab instead.
                        <br /><i>By default: 0</i>
                    </p>
                    <NumberInput onChange={handleLimit} value={limit} defaultValue={limit} max={30} min={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormControl>
                        <FormLabel className='font-semibold text-sm'>New windows</FormLabel>
                        <Switch colorScheme='teal' size='lg' />
                    </FormControl>
                   <FormControl>
                        <FormLabel className='font-semibold text-sm'>Remove least used tab</FormLabel>
                        <Switch colorScheme='teal' isChecked size='lg' />
                    </FormControl>
                </article>
                <article className="rounded-sm bg-white w-full px-4 py-2">
                    <h2 className="font-semibold">Advance settings</h2>
                    <p className='text-xs'>
                        Change shortcut key
                        if you want to disable or change the shortcut with which
                        to open Tab Manager Plus, you can do so here
                    </p>
                </article>
            </section>
        </section>
    )
}

export default OptionsPage;
