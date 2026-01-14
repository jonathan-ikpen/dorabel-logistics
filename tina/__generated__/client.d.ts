import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '58172550700fb4a23bc81dc4a519a8124f43c608', queries,  });
export default client;
  