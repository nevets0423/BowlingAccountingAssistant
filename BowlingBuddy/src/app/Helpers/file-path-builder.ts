export class Path{
    public static Create(...values: string[]): string{
        let path = "";
        values.forEach(value => {
            let trimmedValue = value.trim();
            path += trimmedValue.endsWith('\\') || trimmedValue.endsWith('/') ? trimmedValue : (trimmedValue + "\\");
        });
        return path.endsWith('\\') || path.endsWith('/') ? path.slice(0, -1) : path;
    }
}