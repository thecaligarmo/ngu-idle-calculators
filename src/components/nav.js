import Link from "next/link";
import { usePathname } from "next/navigation";
import ImportSaveForm from '@/components/ImportSaveForm/importSaveForm';
import { useNumberFormatContext } from "@/helpers/context";

export default function Nav({ children }) {
    const {numberFormat, setNumberFormat} = useNumberFormatContext();
    const pathname = usePathname();
    
    const activeTabLi = "-mb-px mr-1"
    const inactiveTabLi = "mr-1"
    const activeTab = "bg-blue-500 inline-block border-l border-blue-500 border-t border-r rounded-t py-2 px-4 text-white dark:text-black font-semibold"
    const inactiveTab = "bg-white dark:bg-black inline-block py-2 px-4 text-blue-500 dark:hover:text-blue-800 hover:text-blue-300 font-semibold"
    return (
      <nav>
        <ul className="flex border-b dark:border-white border-black">
            <li key="ratios" className={(pathname == "/ratios") ? activeTabLi : inactiveTabLi}>
                <Link className={(pathname == "/ratios") ? activeTab : inactiveTab} href="/ratios">Ratio Calc</Link>
            </li>
            <li key="ngus" className={(pathname == "/ngus") ? activeTabLi : inactiveTabLi}>
                <Link className={(pathname == "/ngus") ? activeTab : inactiveTab} href="/ngus">NGUs</Link>
            </li>
            <li key="about" className={(pathname == "/about") ? activeTabLi : inactiveTabLi}>
                <Link className={(pathname == "/about") ? activeTab : inactiveTab} href="/about">About/Credits</Link>
            </li>
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
      </nav>
    );
  }
