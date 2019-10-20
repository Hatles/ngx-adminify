export function removePreFix(str: string, fix: string): string {
    if (str.substring(0, fix.length) === fix) {
        str = str.substring(fix.length, str.length);
    }

    return str;
}
