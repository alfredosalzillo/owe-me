import deepEqual from "deep-equal";
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
  let tree = parse(root);
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
      tree = parse(root);
      return createRouterFileCode("/src", tree);
    },
    handleHotUpdate: (context) => {
      const newTree = parse(root);
      if (deepEqual(tree, newTree, { strict: true })) {
        return;
      }
      const module = context.server.moduleGraph.getModuleById(
        `${routerModuleId}.js`,
      );
      if (!module) {
        return;
      }
      return [context.modules].flat().concat(module);
    },
  };
};

export default vitePluginReactAppRouter;
