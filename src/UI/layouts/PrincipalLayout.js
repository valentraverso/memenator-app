import FloatMenu from "../components/Menu/FloatMenu";
import MenuTemplate from "../components/Menu/Menu";

export default function PrincipalLayout({ children }) {
    return (
        <>
            <header>
                <MenuTemplate />
            </header>
            {children}
            <FloatMenu />
        </>
    )
}