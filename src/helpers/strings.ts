export function camelToTitle(text: string) : string {
    var result: string = text.replace(/([A-Z0-9])/g, " $1");
    result = result
                .replace(/ N G U( |$)/g, ' NGU ')
                .replace(/ P P( |$)/g, ' PP ')
                .replace(/ A P( |$)/g, ' AP ')
                .replace('%', ' (%)')
    return result.charAt(0).toUpperCase() + result.slice(1);
}
