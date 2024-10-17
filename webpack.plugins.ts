import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path"; // Import path module

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  ...["img"].map((asset) => {
    return new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "src",
            "OverviewUI",
            "electron",
            "assets",
            asset
          ),
          to: path.resolve(__dirname, ".webpack/renderer", asset),
        },
      ],
    });
  }),
];
