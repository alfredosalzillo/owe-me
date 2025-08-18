import path from "node:path";
import dedent from "dedent";
import fs from "fast-glob";

/**
 * - dynamic segments are route parameters, e.g. /posts/[id] => /posts/:id
 * - virtual segments are virtual route grouping, without a path e.g /posts/(index) => /posts
 * - static segments are static segments, e.g. /posts/example => /posts/example
 **/
type RouteSegment = {
  type: "dynamic" | "virtual" | "static";
  name: string;
  path: string;
};

type RouteNode = {
  path: string;
  segment: RouteSegment;
  page?: string;
  layout?: string;
  template?: string;
  notFound?: string;
  error?: string;
  children: RouteNode[];
};

// Internal tree structure with a map for quick child lookup
type MutableNode = Omit<RouteNode, "children"> & {
  children: MutableNode[];
  _childrenMap: Map<string, MutableNode>;
};

const parseSegment = (segment: string): RouteSegment => {
  // test for dynamic segments, e.g. [id]
  if (/^\[[^\]]*]$/.test(segment)) {
    return {
      type: "dynamic",
      name: segment.slice(1, -1),
      path: `:${segment.slice(1, -1)}`,
    };
  }
  // test for virtual segments, e.g. (index)
  if (/^\([^)]*\)$/.test(segment)) {
    return {
      type: "dynamic",
      name: segment.slice(1, -1),
      path: ``,
    };
  }
  return {
    type: "static",
    name: segment,
    path: segment,
  };
};

const makeNode = (fullPath: string): MutableNode => ({
  path: fullPath || "/",
  segment: parseSegment(fullPath.split("/").pop() || ""),
  children: [],
  _childrenMap: new Map(),
});
const ensureNodeForDir = (
  segments: string[],
  rootNode: MutableNode,
): MutableNode => {
  let current = rootNode;
  const currentSegments: string[] = [];
  for (const seg of segments) {
    if (!seg) {
      continue;
    }
    currentSegments.push(seg);
    let child = current._childrenMap.get(seg);
    if (!child) {
      // Build the display path like "/a/b"
      const p = `/${currentSegments.join("/")}`;
      child = makeNode(p);
      current._childrenMap.set(seg, child);
      current.children.push(child);
    }
    current = child;
  }
  return current;
};
// Sort children for stable output and strip internal maps
const finalize = (node: MutableNode): RouteNode => {
  return {
    path: node.path,
    segment: node.segment,
    page: node.page,
    layout: node.layout,
    template: node.template,
    notFound: node.notFound,
    error: node.error,
    children: node.children
      .toSorted((a, b) => a.path.localeCompare(b.path))
      .map(finalize),
  };
};
export const parse = (root: string): RouteNode => {
  const paths = fs.globSync([
    path.join(root, "**/page.*"),
    path.join(root, "**/layout.*"),
    path.join(root, "**/template.*"),
    path.join(root, "**/not-found.*"),
    path.join(root, "**/error.*"),
  ]);
  // Normalize to posix and make paths relative to root
  const normalizedPaths = paths.map((abs) =>
    path.relative(root, abs).split(path.sep).join(path.posix.sep),
  );

  const rootNode = makeNode("/");

  for (const rel of normalizedPaths) {
    if (!rel) {
      continue;
    }
    const parts = rel.split("/");
    const file = parts.pop()!;

    const node = ensureNodeForDir(parts, rootNode);
    if (file.startsWith("page.")) {
      node.page = file;
    }
    if (file.startsWith("layout.")) {
      node.layout = file;
    }
    if (file.startsWith("template.")) {
      node.template = file;
    }
    if (file.startsWith("not-found.")) {
      node.notFound = file;
    }
    if (file.startsWith("error.")) {
      node.error = file;
    }
  }

  return finalize(rootNode);
};

const createChildrenString = (children?: string[] | string) => {
  if (!children) {
    return "null";
  }
  if (Array.isArray(children)) {
    return `[${children.join(", ")}]`;
  }
  return children;
};

const createElementString = (
  component: string,
  props: Record<string, unknown> = {},
  children?: string[] | string,
): string => {
  return `React.createElement(${component}, ${JSON.stringify(props)}, ${createChildrenString(children)})`;
};

const nodeToNotFoundCode = (root: string, node: RouteNode): string | null => {
  if (!node.notFound) {
    return null;
  }
  const Component = `React.lazy(() => import("${path.join(root, node.path, node.notFound)}"))`;
  return dedent`
    {
      path: "*",
      element: ${createElementString(Component)},
    },
  `;
};
const nodeToIndexCode = (root: string, node: RouteNode): string => {
  if (!node.page) {
    return dedent(
      [
        nodeToNotFoundCode(root, node) ?? [],
        node.children.map((child) => nodeToLayoutCode(root, child)),
      ]
        .flat()
        .join(",\n"),
    );
  }
  const Component = `React.lazy(() => import("${path.join(root, node.path, node.page)}"))`;
  return dedent(
    [
      dedent`
    {
      index: true,
      element: ${createElementString(Component)},
    },
  `,
      nodeToNotFoundCode(root, node) ?? [],
      node.children.map((child) => nodeToLayoutCode(root, child)),
    ]
      .flat()
      .join(",\n"),
  );
};
const nodeToTemplateCode = (root: string, node: RouteNode): string => {
  if (!node.template) {
    return nodeToIndexCode(root, node);
  }
  const Component = `React.lazy(() => import("${path.join(root, node.path, node.template)}"))`;
  return dedent`
    {
      shouldRevalidate: ({ prevUrl, nextUrl }) => prevUrl.pathname !== nextUrl.pathname,
      element: ${createElementString(Component, {}, "React.createElement(Outlet)")},
      children: [
        ${nodeToIndexCode(root, node)}
      ]
    }
  `;
};
const nodeToLayoutCode = (root: string, node: RouteNode): string => {
  const Component = node.layout
    ? `React.lazy(() => import("${path.join(root, node.path, node.layout)}"))`
    : "React.Fragment";
  const ErrorComponent = node.error
    ? `React.lazy(() => import("${path.join(root, node.path, node.error)}"))`
    : null;
  return dedent`
    {
      path: "${node.segment.path}",
      ${ErrorComponent ? `errorElement: ${createElementString(ErrorComponent)},` : ""}
      element: ${createElementString(Component, {}, "React.createElement(Outlet)")},
      children: [
        ${nodeToTemplateCode(root, node)}
      ],
    }
  `;
};

export const createRouterFileCode = (root: string, tree: RouteNode) => {
  return dedent`
    import React from "react";
    import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
    
    const router = createBrowserRouter([
      ${nodeToLayoutCode(root, tree)}
    ]);
    
    export default () => React.createElement(RouterProvider, { router });
  `;
};
