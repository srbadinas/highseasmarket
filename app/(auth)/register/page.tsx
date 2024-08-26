'use client';

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Card from "@/components/Card"
import InputLabel from "@/components/InputLabel";
import InputText from "@/components/InputText";
import encryptPassword from "@/utils/encryptPassword";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { SweetAlert } from "@/lib/SweetAlert";
import { Message } from "@/types/Message";
import { Plus, X } from "@phosphor-icons/react";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [licenses, setLicenses] = useState<string[]>([]);

  const [license, setLicense] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const addLicense = () => {
    let checkLicenseValue = license.trim();

    if (!checkLicenseValue) {
      return false;
    }

    if (licenses.includes(license)) {
      setLicense('');
      return false;
    }

    setLicenses(prev => [...prev, license]);
    setLicense('');
  }

  const deleteLicense = (selectedLicense: string) => {
    setLicenses(prev => [...prev].filter(item => item !== selectedLicense));
  }

  const onHandleLicenseInputKeydown = (evt: KeyboardEvent) => {
    if (evt.keyCode == 13) {
      evt.preventDefault();
      addLicense();
    }
  };

  const onHandleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        content: 'Password and Confirm Password do not match. Please make sure you enter the same password in both fields.',
      });
      return false;
    };

    if (licenses.length == 0) {
      setMessage({
        type: 'error',
        content: 'Add at least 1 license.',
      });
      return false;
    };

    setProcessing(true);

    try {

      let data = {
        email,
        password_hash: await encryptPassword(password),
        firstname,
        lastname,
        address,
        city,
        state,
        zip_code: zipCode,
        company,
        licenses
      }

      setPassword("");
      setConfirmPassword("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error(res.statusText);

      SweetAlert({
        title: "Success!",
        text: "You can now log in using your credentials!",
        icon: "success",
        confirmButtonText: "Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });

    } catch (err) {
      var errorMessage = 'An unknown error occurred';

      if (err instanceof Error) {
        errorMessage = err.message
      };

      setMessage({
        type: 'error',
        content: errorMessage
      });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <Card className="w-[80%] min-h-[60vh] !p-0 md:w-[576px]">
      <div className="flex flex-col w-full h-full justify-center items-center px-4 py-12">
        <h3 className="text-center text-2xl font-semibold mb-1">Create an Account</h3>
        <span className="text-center text-sm mb-12">
          Have an account? <Link href="/login" className="text-default-1">Sign in</Link>
        </span>
        <form className="w-[80%]" method="post" onSubmit={(e) => onHandleSubmit(e)}>
          {
            message ? <Alert type={message.type} message={message.content} /> : ''
          }
          <div className="mb-4">
            <InputLabel forInput="email" required>Email</InputLabel>
            <InputText type="email" name="email" value={email} required processing={processing} onValueChange={setEmail} />
          </div>
          <div className="mb-4">
            <InputLabel forInput="password" required>Password</InputLabel>
            <InputText type="password" name="password" value={password} required processing={processing} onValueChange={setPassword} />
          </div>
          <div className="mb-4">
            <InputLabel forInput="confirm_password" required>Confirm Password</InputLabel>
            <InputText type="password" name="confirm_password" value={confirmPassword} required processing={processing} onValueChange={setConfirmPassword} />
          </div>
          <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
            <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
              <InputLabel forInput="firstname" required>Firstname</InputLabel>
              <InputText name="firstname" value={firstname} required processing={processing} onValueChange={setFirstname} />
            </div>
            <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
              <InputLabel forInput="lastname" required>Lastname</InputLabel>
              <InputText name="lastname" value={lastname} required processing={processing} onValueChange={setLastname} />
            </div>
          </div>
          <div className="mb-4">
            <InputLabel forInput="address" required>Address</InputLabel>
            <InputText name="address" value={address} required processing={processing} onValueChange={setAddress} />
          </div>
          <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="city" required>City</InputLabel>
              <InputText name="city" value={city} required processing={processing} onValueChange={setCity} />
            </div>
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="state" required>State</InputLabel>
              <InputText name="state" value={state} required processing={processing} onValueChange={setState} />
            </div>
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="zip_code" required>Zip code</InputLabel>
              <InputText name="zip_code" value={zipCode} required processing={processing} onValueChange={setZipCode} />
            </div>
          </div>
          <div className="mb-4">
            <InputLabel forInput="company" required>Company</InputLabel>
            <InputText name="company" value={company} required processing={processing} onValueChange={setCompany} />
          </div>
          <div className={"flex flex-col " + (licenses.length > 0 ? "mb-6" : "mb-8")}>
            <InputLabel forInput="licenses" required>Licenses</InputLabel>
            <div className="btn-group">
              <InputText name="licenses" value={license} processing={processing} onValueChange={setLicense} onKeyDown={onHandleLicenseInputKeydown} />
              <Button type="button" className="px-4" processing={processing} onClick={addLicense}>
                <Plus size={16} />
              </Button>
            </div>

            {licenses.length > 0 ? (
              <ul className="mt-4 flex flex-wrap">
                {licenses.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 text-sm bg-gray-300 mb-2 mr-2 px-2 py-1 rounded-full"
                    >
                      {item}
                      <span
                        className="flex justify-center items-center rounded-full text-xs w-[18px] h-[18px] ml-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-400"
                        onClick={() => deleteLicense(item)}
                      >
                        <X />
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <Button className="w-full" processing={processing}>Register</Button>
        </form>
      </div>
    </Card>
  )
}

export default Register