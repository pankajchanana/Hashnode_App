import {Account,Client,Databases,Storage} from 'appwrite'

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6799cfa2002acf1ad11a");

export const account = new Account(client)

export const databases = new Databases(client,"6799d028002bbed3a90f")

export const  storage = new Storage(client)
