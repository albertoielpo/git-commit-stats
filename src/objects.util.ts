export class ObjectsUtil {
    public static sort(
        obj: Record<string, number>,
        orderBy: "asc" | "desc"
    ): { name: string; value: number }[] {
        let array = [];
        for (let key in obj) {
            array.push({ name: key, value: obj[key] });
        }
        return orderBy === "asc"
            ? array.sort((a, b) => a.value - b.value)
            : array.sort((a, b) => b.value - a.value);
    }
}
