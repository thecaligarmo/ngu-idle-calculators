import ImportSaveForm from '@/components/ImportSaveForm/importSaveForm';
import { useNumberFormatContext } from "@/components/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

export default function Nav({ children } : PropsWithChildren) {
    const {numberFormat, setNumberFormat} = useNumberFormatContext();
    const pathname = usePathname();
    
    const activeTabLi = "-mb-px mr-1"
    const inactiveTabLi = "mr-1"
    const activeTab = "bg-blue-500 inline-block border-l border-blue-500 border-t border-r rounded-t py-2 px-4 text-white dark:text-black font-semibold"
    const inactiveTab = "bg-white dark:bg-black inline-block py-2 px-4 text-blue-500 dark:hover:text-blue-800 hover:text-blue-300 font-semibold"

    function NavElt({children, href, hasChildren=false} : {children: ReactNode, href: string, hasChildren?: boolean}) {
        var actTab = hasChildren ? (pathname.startsWith(href)) : (pathname == href)
        return (<li key="home" className={actTab ? activeTabLi : inactiveTabLi}>
            <Link className={actTab ? activeTab : inactiveTab} href={href}>{children}</Link>
        </li>)
    }

    return (
      <nav>
        <ul className="flex border-b dark:border-white border-black">
            <NavElt href="/">Home</NavElt>
            <NavElt href="/cards">Cards</NavElt>
            <NavElt href="/daily">Daily</NavElt>
            <NavElt href="/ngus" hasChildren={true}>NGUs</NavElt>
            <NavElt href="/zone">Optimal Zone</NavElt>
            <NavElt href="/ratios">Ratios</NavElt>
            <NavElt href="/wandoos">Wandoos</NavElt>
            <NavElt href="/ygg">Ygg</NavElt>
            <NavElt href="/stats">Stats</NavElt>
            <NavElt href="/about">About/Credits</NavElt>

            <li key="save" className="flex-grow">
                <ImportSaveForm />
                <form className="float-right mt-px">
                    <select
                        value={numberFormat}
                        className="block px-2.5 py-2 bg-gray-50 dark:bg-gray-700
                                border border-gray-300 dark:border-gray-600 rounded-lg
                                text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white
                                "
                        onChange={(e) => {
                            setNumberFormat(e.target.value)
                        }}
                    >
                        <option key="engineering" value="engineering">Engineering</option>
                        <option key="scientific" value="scientific">Scientific</option>
                        <option key="suffix" value="suffix">Suffix</option>
                    </select>
                </form>
            </li>
        </ul>
        { pathname.startsWith('/ngus') ?
            <ul className="flex border-b dark:border-white border-black">
                <NavElt href="/ngus">Normal</NavElt>
                <NavElt href="/ngus/evil">Evil</NavElt>
                <NavElt href="/ngus/sadistic">Sadistic</NavElt>
                <NavElt href="/ngus/compare">Compare Modes</NavElt>
            </ul>
            : null
        }
      </nav>
    );
  }
