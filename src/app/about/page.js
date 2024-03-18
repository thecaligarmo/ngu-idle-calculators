'use client'
import ImportSaveForm from '@/components/ImportSaveForm/importSaveForm';
import { useDataContext } from '@/helpers/context';
import Link from 'next/link';

export default function Page({children}) {
    return (
        <>
        <ul>
            <li key="simpleRatioCal"><Link href="https://docs.google.com/spreadsheets/d/1gy4GtvZZlNQG_uWd-DWVvl2hBi6Ha18A9ojFgXevuLA/">NGU - Simple ratio calculator by ily</Link></li>
        </ul>
        </>
    )
}

