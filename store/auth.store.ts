/**
import { create } from 'zustand'
import {User} from "@/type";
import {getCurrentUser} from "@/lib/appwrite";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setAuthenticated:(value:boolean) => void;
    setUser: (user: User | null) => void;
    setLoading:(value: boolean) => void;

    fetchAuthenticated():Promise<void>;

}

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setAuthenticated:( value) => set({isAuthenticated: value}),
    setUser: ( user) => set({user}),
    setLoading:( value) => set({isLoading:value}),

    fetchAuthenticated: async ()=> {
       set({isLoading:true});

       try{
            const user = await getCurrentUser();
            if(user) set({isAuthenticated:true, user: user as User});
            else set({isAuthenticated:false, user: null});
       }catch(e){
           console.log(' fetchAuthenticatedUser error ', e);
           set({isAuthenticated: false, user: null});
       }finally {
           set({isLoading:false});
       }
    }
}));

export default useAuthStore;
 **/
import { create } from 'zustand';
import { User } from "@/type";
import { getCurrentUser } from "@/lib/appwrite";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (value: boolean) => void;

    fetchAuthenticated: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    fetchAuthenticated: async () => {
        set({ isLoading: true });

        try {
            const user = await getCurrentUser();

            if (user) {
                set({ isAuthenticated: true, user: user as User });
            } else {
                set({ isAuthenticated: false, user: null });
            }
        } catch (e) {
            console.log('fetchAuthenticated error:', e);
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useAuthStore;
