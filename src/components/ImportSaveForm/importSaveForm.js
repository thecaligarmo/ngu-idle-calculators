'use client'
import { useDataContext, useSavedDataContext } from '@/components/context';
import { useRef } from 'react';
import { Deserializer } from './deserializeDotNet';
import _ from 'lodash';

function delme(data, keys) {
    for(let key of keys) {
        if(Object.keys(data).includes(key)){
            delete data[key]
        }
    }
    return data
}

function findme(data) {
    data = delme(data, [
        "ModData",
        "NGU", 'achievements', 'advancedTraining', 'arbitrary', 'augments', 'beards', 'beastQuest', 'bestiary', 'bloodMagic', 'boostState',
        'adventure', 'cards', 'challenges', 'cooking', 'daily',
        'diggers', 'yggdrasil', 'wishes',
        'wandoos98', 'totalPlaytime',
        // 'training',
    ])
    for(var d in Object.values(data)) {
        if (d instanceof BigInt){
            console.log("Found one", d)
        }
        if (_.isArray(d) || _.isObject(d)) {
            return findme(d)
        }
    }
    for(var k in Object.keys(data)) {
        if(k instanceof BigInt) {
            console.log("Found another", k)
        }
    }
    

    return data
}

const ImportSaveForm = (props) => {
    let fileReader;

    const inputElem = useRef(null);
    
    const {setPlayerData} = useDataContext();
    const {setPlayerDataUpdated} = useSavedDataContext();
    
    const handleFileRead = (rawSave) => (e) => {
        let data
        if (rawSave) {
            // const deserializer = Deserializer.fromFile(fileReader.result)
            // deserializer.parse()
            /** @type Data */
            // data = deserializer.getJson('PlayerData')
            console.log("Hiya")
            const rawData = Deserializer.fromFile(fileReader.result)[1];
            data = Deserializer.convertData(undefined, rawData);
        } else {
            const content = fileReader.result
            data = JSON.parse(content)
        }

        // data = findme(data)
        // console.log(typeof data['training']['_attackEnergy'][0])

        console.log("Imported data", data)
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
        } catch {
            inputElem.current.value = null
        }

    }

    return (
        <div className="float-right mr-1">
            <input ref={inputElem} style={{ display: "none" }} type='file' id='savefileloader' onChange={e => handleFilePick(e)} />
            <button
                className="ml-2 bg-transparent hover:bg-blue-500 inline-block py-2 px-3 text-blue-700 hover:text-white dark:hover:text-black font-semibold"
                onClick={() => inputElem.current.click()}
                data-tip={"Supported file types are<br/>(1) raw NGU save files, and<br/>(2) NGUSav.es JSON files."}
                data-place="bottom"
            >Import save from file</button>
        </div>
    )
}


ImportSaveForm.propTypes = {}
export default ImportSaveForm;