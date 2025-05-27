import { Account, Client, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1");
client.setProject("68347e9a001a5950451b");

const account = new Account(client);
const database = new Databases(client);

export { account, client, database };
