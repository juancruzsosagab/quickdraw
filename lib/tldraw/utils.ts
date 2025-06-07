export function hasColorProp(
    props: unknown
): props is { color: string } {
    return (
        typeof props === "object" &&
        props !== null &&
        "color" in props &&
        typeof (props as Record<string, unknown>).color === "string"
    );
}