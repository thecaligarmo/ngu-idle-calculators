export function camelToTitle(text: string) : string {
    let  result: string = text.replace(/([A-Z0-9])/g, " $1");
    result = result
                .replace('%', ' (%)')
                .replace(/ N G U( |$)/g, ' NGU ')
                .replace(/ R N G( |$)/g, ' RNG ')
                .replace(/ P P( |$)/g, ' PP ')
                .replace(/ Q P( |$)/g, ' QP ')
                .replace(/ A P( |$)/g, ' AP ')
                .replace(/ E X P( |$)/g, ' EXP ')
                .replace(/ I I( |$)/g, ' II ')
                .replace(/ I I I( |$)/g, ' III ')
                .replace(/ S T I L L( |$)/g, ' STILL ')
                .replace(/ 7 0s( |$)/g, ' 70s ')
                .replace(/ 1 0( |$)/g, ' 10 ')
                .replace(/ 1 1( |$)/g, ' 11 ')
                .replace(/ 1 2( |$)/g, ' 12 ')
                .replace(/twenty Four( |$)/g, '24 ')
                .replace(/ Twenty Four( |$)/g, ' 24 ')
                .replace(/^go /g, '')
    return result.charAt(0).toUpperCase() + result.slice(1);
}
