import ImportSaveForm from '@/components/ImportSaveForm/importSaveForm';
import { useNumberFormatContext } from "@/components/context";
import { cardsUnlocked, cookingUnlocked, getGameMode, hacksUnlocked, isAtLeastEvilMode, isSadMode, wandoosUnlocked, wishesUnlocked, yggUnlocked } from '@/helpers/gameMode';
import { parseNum } from '@/helpers/parsers';
import { createStatesForData } from '@/helpers/stateForData';
import bigDecimal from 'js-big-decimal';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";

export default function Nav({ children } : PropsWithChildren) {
    const {numberFormat, setNumberFormat} = useNumberFormatContext();
    const pathname = usePathname();
    
    const activeTabLi = "-mb-px mr-1"
    const inactiveTabLi = "mr-1"
    const tabClasses = "inline-block py-2 px-2 font-semibold "
    const activeTab = tabClasses + "bg-blue-500 border-l border-blue-500 border-t border-r rounded-t text-white dark:text-black"
    const inactiveTab = tabClasses + "bg-white dark:bg-black text-blue-500 dark:hover:text-blue-800 hover:text-blue-300"

    function NavElt({children, href, hasChildren=false} : {children: ReactNode, href: string, hasChildren?: boolean}) {
        var actTab = hasChildren ? (pathname.startsWith(href)) : (pathname == href)
        return (<li key="home" className={actTab ? activeTabLi : inactiveTabLi}>
            <Link className={actTab ? activeTab : inactiveTab} href={href}>{children}</Link>
        </li>)
    }


    const playerStates = createStatesForData([[]], [[]], ['highestTitanKilledId-2', 'gameMode'], 'nav');
    
    function v(key : string) : bigDecimal {
        return parseNum(playerStates, key)
    }
    
    var curTitan = v('navhighestTitanKilledId-2')
    var gameMode = getGameMode(v('navgameMode'))
    
    return (
      <nav>
        <ul className="flex border-b dark:border-white border-black">
            <NavElt href="/">Home</NavElt>
            {cardsUnlocked(curTitan) ? <NavElt href="/cards">Cards</NavElt> : null}
            {cookingUnlocked(curTitan) ? <NavElt href="/cooking">Cooking</NavElt> : null}
            <NavElt href="/daily">Daily</NavElt>
            {hacksUnlocked(curTitan) ? <NavElt href="/hacks">Hacks</NavElt> : null}
            <NavElt href="/ngus" hasChildren={true}>NGUs</NavElt>
            <NavElt href="/ratios">Ratios</NavElt>
            {wandoosUnlocked(curTitan) ? <NavElt href="/wandoos">Wandoos</NavElt> : null}
            {wishesUnlocked(curTitan) ? <NavElt href="/wishes">Wishes</NavElt> : null}
            {yggUnlocked(curTitan) ? <NavElt href="/ygg">Ygg</NavElt> : null}
            <NavElt href="/stats">Stats</NavElt>
            <NavElt href="/zone">Zones</NavElt>
            <NavElt href="/about">About</NavElt>

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
                {isAtLeastEvilMode(gameMode) ? <NavElt href="/ngus/evil">Evil</NavElt> : null}
                {isSadMode(gameMode) ? <NavElt href="/ngus/sadistic">Sadistic</NavElt> : null}
                {isAtLeastEvilMode(gameMode) ? <NavElt href="/ngus/compare">Compare Modes</NavElt> : null}
            </ul>
            : null
        }
        { pathname.startsWith('/hacks') ?
            <ul className="flex border-b dark:border-white border-black">
                <NavElt href="/hacks">Normal</NavElt>
                <NavElt href="/hacks/hackday">Hack Day</NavElt>
            </ul>
            : null
        }
      </nav>
    );
  }
