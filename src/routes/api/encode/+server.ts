import concat from "concat-stream";
import GIFEncoder from "gif-encoder";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = ({ request }) => {
  console.log(request.body);

  return new Response("hello");
};

function pixelsToGIF(pixels: ArrayLike<number>, width: number, height: number) {
  return new Promise((resolve, reject) => {
    const gif = new GIFEncoder(width, height);
    gif.pipe(concat(resolve));
    gif.writeHeader();
    gif.addFrame(pixels);
    gif.finish();
    gif.on("error", reject);
  });
}
