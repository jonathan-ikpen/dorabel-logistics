import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'fa45e93400fb5a236b5b125c53a06b8d743426c4', queries,  });
export default client;
  