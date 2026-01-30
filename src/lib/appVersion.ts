import pkg from "../../package.json";

const pkgVersion = pkg?.version ?? "0.0.0";
const rawVersion = import.meta.env.VITE_APP_VERSION ?? pkgVersion;

export const APP_VERSION = rawVersion.startsWith("v") ? rawVersion : `v${rawVersion}`;
