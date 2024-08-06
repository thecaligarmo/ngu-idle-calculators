'use client'

import { GameMode } from "@/assets/mode";
import NGUInfo from "@/components/nguInfo/nguInfo";


export default function Page() {

    return (
        <NGUInfo gameMode={GameMode.SADISTIC} />
    )
}

