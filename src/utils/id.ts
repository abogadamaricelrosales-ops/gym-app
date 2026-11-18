import * as Crypto from "expo-crypto";

/** UUID v4 generado localmente. */
export const uid = (): string => Crypto.randomUUID();
