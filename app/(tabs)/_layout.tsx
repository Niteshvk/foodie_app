import {Redirect, Slot} from "expo-router";

export default function _Layout() {
    const isAuthenticated = false;

    if(!Authenticated) return <Redirect href="/sign-in" />
    return <Slot />  // slot component - it renders rest of the contents as it is, basically it'll render the contents of the other pages that we have
}
