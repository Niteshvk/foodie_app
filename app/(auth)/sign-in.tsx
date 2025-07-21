import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
 import CustomButton from "@/components/CustomButton";
 import React, {useState} from "react";
 import {text} from "node:stream/consumers";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

 const SignIn = () => {
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [form, setForm] = useState({ email: '', password: '' });

     const submit = async () => {
         const { email, password }= form
         if(!email || !password) {
              Alert.alert('error', 'please enter a valid email address.');

         }
 setIsSubmitting(true);

         try {
             await signIn({ email, password});

             router.replace('/');
         } catch (error:any){
             Alert.alert('error', error.message);
             Sentry.captureEvent(error);
         } finally {
             setIsSubmitting(false);
         }
     }

     return (
         <View className="gap-10 bg-white rounded-lg p-5 mt-5">
             <CustomInput
                 placeholder="Enter your email"
                 value={form.email}
                 onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                 keyboardType="email-address"
                 label='Email'
            />
             <CustomInput
                 placeholder="Enter your Password"
                 value={form.password}
                 onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                 label='Password'
                 secureTextEntry={true}
             />
             <CustomButton
                 title = 'Sign In'
                 isLoading={isSubmitting}
                 onPress={submit}
             />

            <View className="flex justify-center mt-5 flex-row gap-2" >
                 <Text className="base-regular text-gray-100">
                     Don't have an account? !
               </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign Up
                </Link>

            </View>
         </View>
     )
 }
 export default SignIn