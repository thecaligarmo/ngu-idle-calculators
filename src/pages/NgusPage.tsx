import { GameMode } from "@/assets/mode";
import NGUInfo from "../components/nguInfo/NGUInfo";


export default function NGUsPage() {

    return (
        <NGUInfo gameMode={GameMode.NORMAL} />
    )
}

