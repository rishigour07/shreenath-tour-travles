let workerPromise;

function loadWorker() {
  workerPromise ??= import("../dist/server/index.js").then(
    (module) => module.default,
  );
  return workerPromise;
}

async function render(request) {
  if (new URL(request.url).pathname === "/_vinext/image") {
    return new Response("Image optimization is unavailable", { status: 404 });
  }

  const worker = await loadWorker();
  const assets = {
    fetch(assetRequest) {
      return fetch(assetRequest);
    },
  };

  return worker.fetch(request, { ASSETS: assets });
}

export const GET = render;
export const HEAD = render;
export const POST = render;
export const PUT = render;
export const PATCH = render;
export const DELETE = render;
export const OPTIONS = render;
