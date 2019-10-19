export function removePostFix(str: string, fix: string): string {
    if (str.substring(str.length - fix.length) === fix) {
        str = str.substring(0, str.length - fix.length);
    }

    return str;
}
