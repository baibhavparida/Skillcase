import { renderToString } from "react-dom/server";
import { resolveRoute, routePaths } from "./routes.js";

export { routePaths };

export async function render(pathname) {
  const route = await resolveRoute(pathname);
  const { Page, props } = route;
  // React hoists metadata. Place it in the document head in the static output.
  let head = "";
  const body = renderToString(<Page {...props} />).replace(
    /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>/g,
    (tag) => {
      head += tag;
      return "";
    },
  );
  return { head, body, source: route.source, status: route.status };
}
