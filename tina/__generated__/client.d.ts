import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '83c11d9123ec32b4bb929b7b1c57c404cfd8db32', queries,  });
export default client;
  