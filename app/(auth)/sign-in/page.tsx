'use client'
import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import { signInWithEmail } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SignIn = () => {
  const router =useRouter();
  const {register,handleSubmit,control,formState:{errors,isSubmitting}} = useForm<SignInFormData>({
    defaultValues:{
    email:"",
    password:""
  },
  mode:"onBlur"
  })

  const onSubmit = async(data:SignInFormData)=>{
      try {
        console.log(data)
       const result =await signInWithEmail(data);
       if(result.success){
         router.push('/');
         toast.success('Sign In Successfully')
        }
      } catch (error) {
        console.error(error);
        toast.error('SignIn Failed',{
          description:error instanceof Error ? error.message : 'Failed to Sign In Account'
        })
      }
  }
  return (
    <>
       <h1 className="form-title">Welcome Back</h1>

       <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

        <InputField
          name="email"
          label="Email"
          type='email'
          placeholder="Enter you email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email address is required",
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "password is required", minLength: 8 }}
        />
           <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>

        <FooterLink text="Create an account" linkText="Sign Up" href="/sign-up" />

       </form>
    </>
  )
}

export default SignIn