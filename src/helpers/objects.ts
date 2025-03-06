// TODO - Figure out how to properly typescript this
// eslint-disable-next-line
export function toObjectMap(arr: any[], keyFn: (k: any) => {}, valueFn: (v: any) => {}): {} {
    return Object.fromEntries(arr.map((v) => [keyFn(v), valueFn(v)]));
}
