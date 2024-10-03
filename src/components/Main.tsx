const Main = () => {
    return (
        <main className="px-3 py-1">
            <Tab
                logo="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                title="Cloud management console - Get started"
            />
        </main>
    )
}

export const Tab = ({logo, title}: {logo: string, title: string}) => {
    return (
        <article className="flex space-x-2 items-center">
            <img src={logo} alt={title} className="w-4 h-4 rounded-md border" />
            <p className="flex-1 text-xs">{title}</p>
        </article>
    )
}

export default Main;