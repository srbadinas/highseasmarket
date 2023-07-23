'use client';

import { useState } from "react";
import Alert from "@components/Alert";
import Button from "@components/Button";
import Card from "@components/Card"
import InputLabel from "@components/InputLabel";
import InputText from "@components/InputText";
import encryptPassword from "@utils/encryptPassword";
import Link from "next/link"
import { useRouter } from "next/navigation";
import SweetAlert from "@lib/SweetAlert";
import fieldChange from "@utils/fieldChange";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirm_password: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    company: '',
    licenses: [],
  });

  const [license, setLicense] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const onHandleChange = (e) => {
    fieldChange(e, user, setUser);
  }

  const addLicense = (e) => {
    let checkLicenseValue = license.trim();

    if (!checkLicenseValue) {
      return false;
    }

    let data = user;

    if (data.licenses.includes(license)) {
      setLicense("");
      return false;
    }

    data.licenses.push(license);
    setUser({ ...data });
    setLicense('');
  }

  const deleteLicense = (selectedLicense) => {
    let data = user;
    data.licenses = data.licenses.filter(
      (item) => item !== selectedLicense
    );
    setUser({ ...data });
  }

  const onHandleLicenseInputKeydown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      addLicense();
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      setMessage({
        type: 'error',
        content: 'Password and Confirm Password do not match. Please make sure you enter the same password in both fields.',
      });
      return false;
    };

    if (user.licenses.length == 0) {
      setMessage({
        type: 'error',
        content: 'Add at least 1 license.',
      });
      return false;
    };

    setProcessing(true);

    try {

      let data = {
        ...user,
      }

      data.password_hash = await encryptPassword(user.password);
      data.licenses = [...user.licenses],

        delete data.password;
      delete data.confirm_password;

      const res = await fetch('/api/auth/register', {
        method: 'post',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

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
      setMessage({
        type: 'error',
        content: err.message,
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
            <InputText type="email" name="email" value={user.email} required processing={processing} handleChange={(e) => onHandleChange(e)} />
          </div>
          <div className="mb-4">
            <InputLabel forInput="password" required>Password</InputLabel>
            <InputText type="password" name="password" value={user.password} required processing={processing} handleChange={(e) => onHandleChange(e)} />
          </div>
          <div className="mb-4">
            <InputLabel forInput="confirm_password" required>Confirm Password</InputLabel>
            <InputText type="password" name="confirm_password" value={user.confirm_password} required processing={processing} handleChange={(e) => onHandleChange(e)} />
          </div>
          <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
            <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
              <InputLabel forInput="firstname" required>Firstname</InputLabel>
              <InputText name="firstname" value={user.firstname} required processing={processing} handleChange={(e) => onHandleChange(e)} />
            </div>
            <div className="w-full mb-4 sm:w-1/2 sm:mb-0">
              <InputLabel forInput="lastname" required>Lastname</InputLabel>
              <InputText name="lastname" value={user.lastname} required processing={processing} handleChange={(e) => onHandleChange(e)} />
            </div>
          </div>
          <div className="mb-4">
            <InputLabel forInput="address" required>Address</InputLabel>
            <InputText name="address" value={user.address} required processing={processing} handleChange={(e) => onHandleChange(e)} />
          </div>
          <div className="flex flex-col gap-x-0 sm:flex-row sm:gap-x-4 sm:mb-4">
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="city" required>City</InputLabel>
              <InputText name="city" value={user.city} required processing={processing} handleChange={(e) => onHandleChange(e)} />
            </div>
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="state" required>State</InputLabel>
              <InputText name="state" value={user.state} required processing={processing} handleChange={(e) => onHandleChange(e)} />
            </div>
            <div className="w-full mb-4 sm:w-[33.3%] sm:mb-0">
              <InputLabel forInput="zip_code" required>Zip code</InputLabel>
              <InputText name="zip_code" value={user.zip_code} required processing={processing} handleChange={(e) => onHandleChange(e)} />
            </div>
          </div>
          <div className="mb-4">
            <InputLabel forInput="company" required>Company</InputLabel>
            <InputText name="company" value={user.company} required processing={processing} handleChange={(e) => onHandleChange(e)} />
          </div>
          <div className={"flex flex-col " + (user.licenses.length > 0 ? "mb-6" : "mb-8")}>
            <InputLabel forInput="licenses" required>Licenses</InputLabel>
            <div className="btn-group">
              <InputText name="licenses" value={license} processing={processing} handleChange={(e) => setLicense(e.target.value)} handleKeyDown={onHandleLicenseInputKeydown} />
              <Button type="button" className="px-4" processing={processing} onClick={(e) => addLicense(e)}>
                <i className="fas fa-plus"></i>
              </Button>
            </div>

            {user.licenses.length > 0 ? (
              <ul className="mt-4 flex flex-wrap">
                {user.licenses.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 text-sm bg-gray-200 mb-2 mr-2 px-2 py-1 rounded-full"
                    >
                      {item}
                      <span
                        className="flex justify-center items-center rounded-full text-xs w-[18px] h-[18px] ml-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300"
                        onClick={() => deleteLicense(item)}
                      >
                        <i className="fas fa-times"></i>
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