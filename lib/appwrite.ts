import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.foodie.ordering",
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "687cb6110005e036ee88",
    userCollectionId: "687cb974003e6e0d0071"
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectID)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e: any) {
        throw new Error(e.message || "Sign in failed");
    }
};


export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password);
        if (!newAccount) throw new Error("Account creation failed");

       await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountID: newAccount.$id,
                avatar: avatarUrl
            }
        );
    } catch (e: any) {
        throw new Error(e.message || "User creation failed");
    }
};

export const getCurrentUser = async () => {
try {
const currentAccount = await account.get()
    if(!currentAccount) throw Error("Account not found");

    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountID', currentAccount.$id)]
    )

    if(!currentUser) throw new Error("Account not found");

    return currentUser.documents[0];

}catch(e){
    console.log(e);
    throw new Error(e as string);
}
}

/**
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import { CreateUserParams, SignInParams } from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.foodie.ordering",
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "687cb6110005e036ee88",
    userCollectionId: "687cb974003e6e0d0071"
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectID)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

// ✅ Create user without duplicate session creation
export const user = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password);
        if (!newAccount) throw new Error("Account creation failed");

        // ❌ Removed signIn() to avoid session conflict
        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountID: newAccount.$id,
                avatar: avatarUrl
            }
        );
    } catch (e: any) {
        throw new Error(e.message || "User creation failed");
    }
};

// ✅ Used only during login (no need to touch this)
export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e: any) {
        throw new Error(e.message || "Sign in failed");
    }
};
**/