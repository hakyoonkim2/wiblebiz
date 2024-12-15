import { setupWorker } from "msw/browser";
import { mswHandlers } from "./MswHandlers";

export const worker = setupWorker(...mswHandlers);
