export function camelToTitle(text: string) : string {
    var result: string = text.replace(/([A-Z0-9])/g, " $1");
    result = result
                .replace(/ N G U( |$)/g, ' NGU ')
                .replace(/ R N G( |$)/g, ' RNG ')
                .replace(/ P P( |$)/g, ' PP ')
                .replace(/ Q P( |$)/g, ' QP ')
                .replace(/ A P( |$)/g, ' AP ')
                .replace(/ E X P( |$)/g, ' EXP ')
                .replace(/ I I( |$)/g, ' II ')
                .replace(/ I I I( |$)/g, ' III ')
                .replace(/ S T I L L( |$)/g, ' STILL ')
                .replace('%', ' (%)')
    return result.charAt(0).toUpperCase() + result.slice(1);
}
