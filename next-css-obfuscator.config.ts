import { Options } from "next-css-obfuscator";

module.exports = {
    enable: true,
    mode: "random",
    refreshClassConversionJson: false,
    allowExtensions: [".jsx", ".tsx", ".js", ".ts", ".html", ".rsc"],
} as Options;