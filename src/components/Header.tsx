import { useState } from "react";

const Header = ({ onSearch }: {onSearch: (searchQuery: string) => void}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: any) => {
        const {value } = e.target;
        setSearchTerm(value);
        onSearch(value);
    }

    return (
        <header className="bg-blue-600 w-full space-y-2 px-3 py-4 text-white font-manrope font-medium text-sm">
            <h1 className="text-center text-lg">Tab Manager</h1>
            <Nav title={searchTerm} handleInputChange={handleChange} />
        </header>
    )
}

export const Nav = ({title, handleInputChange}: {title: string; handleInputChange: (e: any) => void}) => {
    return (<nav className="md:block [80px] h-full overflow-y-auto overflow-x-hidden">
        <ul>
            <li>
                <form action="">
                    <input
                        type="search"
                        onChange={handleInputChange}
                        name="search" value={title}
                        placeholder="Search Tab..."
                        className="w-full outline-none placeholder:italic placeholder:text-sm text-gray-800 px-4 py-2 rounded-md"
                    />
                </form>
            </li>
        </ul>
    </nav>)
}

export default Header;