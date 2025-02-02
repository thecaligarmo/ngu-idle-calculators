import { cardsUnlocked, cookingUnlocked, getGameMode, hacksUnlocked, isAtLeastEvilMode, isSadMode, wandoosUnlocked, wishesUnlocked, yggUnlocked } from "@/helpers/gameMode";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { getPlayer, useNumberFormatContext } from "./Context";
import ImportSaveForm from "./ImportSaveForm/importSaveForm";

export default function Nav() {
    const {numberFormat, setNumberFormat} = useNumberFormatContext();
    const pathname = useLocation().pathname;
    
    const activeTabLi = "-mb-px mr-1"
    const inactiveTabLi = "mr-1"
    const tabClasses = "inline-block py-2 px-2 font-semibold "
    const activeTab = tabClasses + "bg-blue-500 border-l border-blue-500 border-t border-r rounded-t text-white dark:text-black"
    const inactiveTab = tabClasses + "bg-white dark:bg-black text-blue-500 dark:hover:text-blue-800 hover:text-blue-300"
    const unusableTab = tabClasses + "bg-white dark:bg-black text-grey-500"

    function NavEltContainer({children, key, actTab=false} : {children: ReactNode, key: string, actTab ?: boolean}) {
        return (<li key={key} className={actTab ? activeTabLi : inactiveTabLi}>
            {children}
        </li>)
    }

    function NavUnclickable({children, key} : {children: ReactNode, key: string}) {
        return (<NavEltContainer actTab={false} key={key}>
            <span className={unusableTab}>{children}</span>
        </NavEltContainer>)
    }
    

    function NavElt({children, href, key, hasChildren=false} : {children: ReactNode, href: string, key: string, hasChildren?: boolean}) {
        const actTab = hasChildren ? (pathname.startsWith(href)) : (pathname == href)
        return (<NavEltContainer actTab={actTab} key={key}>
            <NavLink className={actTab ? activeTab : inactiveTab} to={href}>{children}</NavLink>
        </NavEltContainer>)
    }

    const player = getPlayer()
    
    const curTitan = player.get('highestTitanKilledId')
    const gameMode = getGameMode(player.get('gameMode'))
    
    return (
      <nav>
        <ul className="flex border-b dark:border-white border-black">
            <NavElt href="/" key="home">Home</NavElt>
            {cardsUnlocked(curTitan) ? <NavElt href="/cards" key="cards">Cards</NavElt> : <NavUnclickable key="cards"><>T9</></NavUnclickable>}
            {cookingUnlocked(curTitan) ? <NavElt href="/cooking" key="cooking">Cooking</NavElt> : <NavUnclickable key="cards"><>T10</></NavUnclickable>}
            <NavElt href="/daily" key="daily">Daily</NavElt>
            {hacksUnlocked(curTitan) ? <NavElt href="/hacks" key="hacks" hasChildren={true}>Hacks</NavElt> : <NavUnclickable key="cards"><>T7</></NavUnclickable>}
            <NavElt href="/ngus" hasChildren={true} key="ngu">NGUs</NavElt>
            <NavElt href="/ratios" key="ratios">Ratios</NavElt>
            {wandoosUnlocked(curTitan) ? <NavElt href="/wandoos" key="wandoos">Wandoos</NavElt> : <NavUnclickable key="cards"><>T1</></NavUnclickable>}
            {wishesUnlocked(curTitan) ? <NavElt href="/wishes" key="wishes">Wishes</NavElt> : <NavUnclickable key="cards"><>T8</></NavUnclickable>}
            {yggUnlocked(curTitan) ? <NavElt href="/ygg" key="ygg">Ygg</NavElt> : <NavUnclickable key="cards"><>T2</></NavUnclickable>}
            <NavElt href="/stats" key="stats">Stats</NavElt>
            <NavElt href="/zone" key="zone">Zones</NavElt>
            <NavElt href="/about" key="about">About</NavElt>

            <li key="save" className="flex-grow">
                <ImportSaveForm />
                <form className="float-right mt-px">
                    <select
                        value={numberFormat}
                        className="block px-2.5 py-2 bg-gray-50 dark:bg-gray-700
                                border border-gray-300 dark:border-gray-600 rounded-lg
                                text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white
                                "
                        id="nav-select"
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
                <NavElt href="/ngus" key="ngu-normal">Normal</NavElt>
                {isAtLeastEvilMode(gameMode) ? <NavElt href="/ngus/evil" key="ngu-evil">Evil</NavElt> : null}
                {isSadMode(gameMode) ? <NavElt href="/ngus/sadistic" key="ngu-sad">Sadistic</NavElt> : null}
                {isAtLeastEvilMode(gameMode) ? <NavElt href="/ngus/compare" key="ngu-compare">Compare Modes</NavElt> : null}
            </ul>
            : null
        }
        { pathname.startsWith('/hacks') ?
            <ul className="flex border-b dark:border-white border-black">
                <NavElt href="/hacks" key="hacks-normal">Normal</NavElt>
                <NavElt href="/hacks/hackday" key="hackday">Hack Day</NavElt>
            </ul>
            : null
        }
      </nav>
    );
  }
