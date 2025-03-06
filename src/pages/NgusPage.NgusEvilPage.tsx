import { GameMode } from "@/assets/mode";
import NGUInfo from "../components/nguInfo/NGUInfo";

export default function NGUsEvilPage() {
    return <NGUInfo gameMode={GameMode.EVIL} />;
}
