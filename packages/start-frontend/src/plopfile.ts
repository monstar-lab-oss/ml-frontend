import type { NodePlopAPI } from "node-plop";

module.exports = function (plop: NodePlopAPI) {
  plop.setHelper("reverseEach", (ctx, { fn }) =>
    ctx.reverse().map(fn).join("")
  );
};
