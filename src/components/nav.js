import Link from "next/link";
import { usePathname } from "next/navigation";
import ImportSaveForm from '@/components/ImportSaveForm/importSaveForm';

export default function Nav({ children }) {
    const pathname = usePathname();
    
    const activeTabLi = "-mb-px mr-1"
    const inactiveTabLi = "mr-1"
    const activeTab = "bg-blue-500 inline-block border-l border-blue-500 border-t border-r rounded-t py-2 px-4 text-white font-semibold"
    const inactiveTab = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
    return (
      <nav>
        <ul className="flex border-b">
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
            </li>
        </ul>
      </nav>
    );
  }
