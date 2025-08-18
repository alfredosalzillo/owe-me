import { Plugin } from "vite";
import { createRouterFileCode, parse } from "./route-tree";

const routerModuleId = "vite-plugin-react-app-router/router";
export type VitePluginReactAppRouterConfig = {
  root?: string;
};
const vitePluginReactAppRouter = (
  config: VitePluginReactAppRouterConfig,
): Plugin => {
  const root = config.root ?? "src";
  return {
    name: "vite-plugin-react-app-router",
    resolveId(id) {
      if (id !== routerModuleId) {
        return;
      }
      return `${routerModuleId}.js`;
    },
    load: (id: string) => {
      if (!id.includes(routerModuleId)) {
        return;
      }
      const tree = parse(root);
      return createRouterFileCode("/src", tree);
    },
  };
};

export default vitePluginReactAppRouter;
