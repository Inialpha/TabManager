import './icons.css';

const Footer = () => {
    return (
        <footer className="font-manrope border shadow-sm bg-white p-1">
            <ul className="flex items-center space-x-3 ">
                <li className="text-center p-2 border rounded-sm flex items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center">
                    <span className="fluent--form-new-20-filled"></span>
                </li>
                <li className="p-2 border rounded-sm flex items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center">
                    <span className="lsicon--setting-filled"></span>
                </li>                
                <li className="flex p-2 items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center border rounded-sm">
                    <span className="fluent--delete-12-filled"></span>
                </li>
                <li className="flex p-2 items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center border rounded-sm">
                    <span className="ion--timer-outline"></span>
                </li>
                <li className='flex p-2 items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center border rounded-sm'>
                    <span className="gala--add"></span>
                </li>
                <li className="p-2 border rounded-sm flex items-center hover:bg-gray-800 hover:text-white duration-100 transition-all ease-in-out justify-center">
                    <span className="typcn--th-list-outline"></span> 
                </li>
            </ul>
        </footer>
    );
}

export default Footer;