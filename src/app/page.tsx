'use client'

import { getPlayerData } from "../components/context";


export default function Home() {
    getPlayerData();
    return (
        <p>Test</p>
    )
}

