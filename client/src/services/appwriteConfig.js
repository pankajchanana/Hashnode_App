import {Account,Client,Databases,Storage} from 'appwrite'

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("646f96814ce0bd792d15");

export const account = new Account(client)

export const databases = new Databases(client,"646f96a60d5767f59620")

export const  storage = new Storage(client)