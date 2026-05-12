import { parseBootEnv, type Env } from "./env.schema";

export function loadValidatedEnv(): Env {
  try {
    return parseBootEnv();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[lovepages-api][boot] Variáveis de ambiente inválidas:");
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
    throw error;
  }
}
