'use client'
import React, { useRef } from 'react';
import { Deserializer } from './deserializeDotNet'
import { getPlayerData, isPlayerDataUpdated, playerDataUpdated, useDataContext, useSavedDataContext } from '@/helpers/context';

const ImportSaveForm = (props) => {
    let fileReader;

    const inputElem = useRef(null);
    
    const {playerData, setPlayerData} = useDataContext();
    const {playerDataUpdated, setPlayerDataUpdated} = useSavedDataContext();
    
    const handleFileRead = (rawSave) => (e) => {
        let data
        if (rawSave) {
            const deserializer = Deserializer.fromFile(fileReader.result)
            deserializer.parse()
            /** @type Data */
            data = deserializer.getJson('PlayerData')
        } else {
            const content = fileReader.result
            data = JSON.parse(content)
        }

        console.log(data)
        setPlayerData(JSON.stringify(data))
        setPlayerDataUpdated(true)
    }



    const handleFilePick = (e) => {
        let file = e.target.files[0]
        e.target.value = null
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead(file.type !== 'application/json');
        try {
            fileReader.readAsText(file)
        } catch{
            inputElem.current.value = null
        }

    }

    return (
        <div className="float-right mr-1">
            <input ref={inputElem} style={{ display: "none" }} type='file' id='savefileloader' onChange={e => handleFilePick(e)} />
            <button
                className="bg-transparent hover:bg-blue-500 inline-block py-2 px-4 text-blue-700 hover:text-white font-semibold"
                onClick={() => inputElem.current.click()}
                data-tip={"Supported file types are<br/>(1) raw NGU save files, and<br/>(2) NGUSav.es JSON files."}
                data-place="bottom"
            >Import save from file</button>
        </div>
    )
}


ImportSaveForm.propTypes = {}
export default ImportSaveForm;