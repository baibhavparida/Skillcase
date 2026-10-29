import { useEffect, useState } from "react";
import { courseSnapshot } from "../../data/courses.js";

// The learner CMS's programs: the build's copy first (so prices are in the
// HTML), then the live list from /api/cart/blocks. The Worker reads the CMS,
// because the CMS API doesn't accept requests from this site's pages. On the
// Vite dev server there is no Worker, so the copy stays.
export function useCourses() {
  const [state, setState] = useState({ blocks: courseSnapshot, banner: null });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cart/blocks")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.blocks?.length) setState({ blocks: data.blocks, banner: data.banner || null });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
