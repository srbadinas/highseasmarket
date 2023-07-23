'use client';

import { useState } from "react"
import Link from "next/link"
import Card from "@components/Card"
import InputLabel from "@components/InputLabel"
import InputText from "@components/InputText"
import Switch from "@components/Switch"
import Button from "@components/Button"
import Alert from "@components/Alert"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import fieldChange from "@utils/fieldChange";

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const onHandleChange = (e) => {
    fieldChange(e, credentials, setCredentials);
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault(e);
    setProcessing(true);

    try {

      let email = credentials.email;
      let password = credentials.password;

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      if (!res.ok) {
        throw new Error(res.error);
      }

      if (res.error) {
        throw new Error(res.error);
      }

      router.push('/dashboard');

    } catch (err) {
      setMessage({
        type: 'error',
        content: err.message,
      });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Card className="w-[80%] min-h-[60vh] flex justify-between !p-0 md:w-[576px]">
      <div className="flex flex-col w-full h-[515px] justify-center items-center p-4">
        <h3 className="text-center text-2xl font-semibold mb-1">Sign-In</h3>
        <span className="text-center text-sm mb-12">
          No account? <Link href="/register" className="text-default-1">Create one here</Link>
        </span>
        <form className="w-[80%] mb-8" method="POST" onSubmit={(e) => onHandleSubmit(e)}>
          {
            message ? <Alert type={message.type} message={message.content} /> : ''
          }
          <div className="flex flex-col mb-4">
            <InputLabel forInput="email" required>Email</InputLabel>
            <InputText type="email" name="email" value={credentials.email} required processing={processing} handleChange={onHandleChange} />
          </div>
          <div className="flex flex-col mb-4">
            <InputLabel forInput="password" required>Password</InputLabel>
            <InputText type="password" name="password" value={credentials.password} required processing={processing} handleChange={onHandleChange} />
          </div>
          <div className="flex flex-col my-4">
            <Switch name="remember" value={credentials.remember} text="Remember me" handleChange={onHandleChange} />
          </div>
          <Button className="w-full" processing={processing}>Login</Button>
        </form>
      </div>
      <div className="w-full bg-neutral-100 text-center py-4 text-sm border-t border-gray-300 rounded-b">
        <Link href="/forgotpassword" className="text-default-1">Forgot Password?</Link>
      </div>
    </Card>
  )
}

export default Login