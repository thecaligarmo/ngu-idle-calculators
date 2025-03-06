import {
    cardsUnlocked,
    cookingUnlocked,
    getGameMode,
    hacksUnlocked,
    isAtLeastEvilMode,
    isSadMode,
    wandoosUnlocked,
    wishesUnlocked,
    yggUnlocked,
} from "@/helpers/gameMode";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router";
import { getPlayer, useNumberFormatContext } from "./Context";
import ImportSaveForm from "./ImportSaveForm/importSaveForm";
import { NavSelect } from "./selects/NavSelect";

export default function Nav() {
    const { numberFormat, setNumberFormat } = useNumberFormatContext();
    const pathname = useLocation().pathname;

    const activeTabLi = "-mb-px mr-1";
    const inactiveTabLi = "mr-1";
    const tabClasses = "inline-block py-2 px-2 font-semibold ";
    const activeTab =
        tabClasses + "bg-blue-500 border-l border-blue-500 border-t border-r rounded-t text-white dark:text-black";
    const inactiveTab =
        tabClasses + "bg-white dark:bg-black text-blue-500 dark:hover:text-blue-800 hover:text-blue-300";
    const unusableTab = tabClasses + "bg-white dark:bg-black text-grey-500";

    function NavEltContainer({
        children,
        keyName,
        actTab = false,
    }: {
        children: ReactNode;
        keyName: string;
        actTab?: boolean;
    }) {
        return (
            <li key={keyName} className={actTab ? activeTabLi : inactiveTabLi}>
                {children}
            </li>
        );
    }

    function NavUnclickable({ children, keyName }: { children: ReactNode; keyName: string }) {
        return (
            <NavEltContainer actTab={false} keyName={keyName}>
                <span className={unusableTab}>{children}</span>
            </NavEltContainer>
        );
    }

    function NavElt({
        children,
        href,
        keyName,
        hasChildren = false,
    }: {
        children: ReactNode;
        href: string;
        keyName: string;
        hasChildren?: boolean;
    }) {
        const actTab = hasChildren ? pathname.startsWith(href) : pathname == href;
        return (
            <NavEltContainer actTab={actTab} keyName={keyName}>
                <NavLink className={actTab ? activeTab : inactiveTab} to={href}>
                    {children}
                </NavLink>
            </NavEltContainer>
        );
    }

    const player = getPlayer();

    const curTitan = player.get("highestTitanKilledId");
    const gameMode = getGameMode(player.get("gameMode"));

    return (
        <nav>
            <ul className="flex border-b dark:border-white border-black">
                <NavElt href="/" keyName="home">
                    Home
                </NavElt>
                {cardsUnlocked(curTitan) ? (
                    <NavElt href="/cards" keyName="cards">
                        Cards
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="cards">
                        <>T9</>
                    </NavUnclickable>
                )}
                {cookingUnlocked(curTitan) ? (
                    <NavElt href="/cooking" keyName="cooking">
                        Cooking
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="cooking">
                        <>T10</>
                    </NavUnclickable>
                )}
                <NavElt href="/daily" keyName="daily">
                    Daily
                </NavElt>
                {hacksUnlocked(curTitan) ? (
                    <NavElt href="/hacks" keyName="hacks" hasChildren={true}>
                        Hacks
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="hacks">
                        <>T7</>
                    </NavUnclickable>
                )}
                <NavElt href="/ngus" hasChildren={true} keyName="ngu">
                    NGUs
                </NavElt>
                <NavElt href="/ratios" keyName="ratios">
                    Ratios
                </NavElt>
                {wandoosUnlocked(curTitan) ? (
                    <NavElt href="/wandoos" keyName="wandoos">
                        Wandoos
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="wandoos">
                        <>T1</>
                    </NavUnclickable>
                )}
                {wishesUnlocked(curTitan) ? (
                    <NavElt href="/wishes" keyName="wishes">
                        Wishes
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="wishes">
                        <>T8</>
                    </NavUnclickable>
                )}
                {yggUnlocked(curTitan) ? (
                    <NavElt href="/ygg" keyName="ygg">
                        Ygg
                    </NavElt>
                ) : (
                    <NavUnclickable keyName="ygg">
                        <>T2</>
                    </NavUnclickable>
                )}
                <NavElt href="/stats" keyName="stats">
                    Stats
                </NavElt>
                <NavElt href="/zone" keyName="zone">
                    Zones
                </NavElt>
                <NavElt href="/about" keyName="about">
                    About
                </NavElt>

                <li key="save" className="flex-grow">
                    <ImportSaveForm />
                    <form className="float-right mt-px">
                        <NavSelect numberFormat={numberFormat} setNumberFormat={setNumberFormat} />
                    </form>
                </li>
            </ul>
            {pathname.startsWith("/ngus") ? (
                <ul className="flex border-b dark:border-white border-black">
                    <NavElt href="/ngus" keyName="ngu-normal">
                        Normal
                    </NavElt>
                    {isAtLeastEvilMode(gameMode) ? (
                        <NavElt href="/ngus/evil" keyName="ngu-evil">
                            Evil
                        </NavElt>
                    ) : null}
                    {isSadMode(gameMode) ? (
                        <NavElt href="/ngus/sadistic" keyName="ngu-sad">
                            Sadistic
                        </NavElt>
                    ) : null}
                    {isAtLeastEvilMode(gameMode) ? (
                        <NavElt href="/ngus/compare" keyName="ngu-compare">
                            Compare Modes
                        </NavElt>
                    ) : null}
                </ul>
            ) : null}
            {pathname.startsWith("/hacks") ? (
                <ul className="flex border-b dark:border-white border-black">
                    <NavElt href="/hacks" keyName="hacks-normal">
                        Normal
                    </NavElt>
                    <NavElt href="/hacks/hackday" keyName="hackday">
                        Hack Day
                    </NavElt>
                </ul>
            ) : null}
        </nav>
    );
}
