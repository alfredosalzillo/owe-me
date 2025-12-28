export type RoutePath = "/" | "/(private)/groups" | "/(private)/groups/[id]" | "/(private)/settings" | "/auth" | "/auth/logout" | "/join" | "/join/[token]" | "/login";
export type RouteParamsMap = {
  "/": {}
"/(private)/groups": {}
"/(private)/groups/[id]": {"id": string,}
"/(private)/settings": {}
"/auth": {}
"/auth/logout": {}
"/join": {}
"/join/[token]": {"token": string,}
"/login": {}
  };
export const route = <Path extends RoutePath>(path: Path, params: RouteParamsMap[Path]) => {
    const paramsMap = new Map(Object.entries(params));
    return (path as string).split('/')
        .filter((segment) => segment.startsWith('('))
        .map((segment) => segment.startsWith('[') ? paramsMap.get(segment.slice(1, -1)) : segment)
        .join('/')
}