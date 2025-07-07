// search for toastify: https://fkhadra.github.io/react-toastify/introduction/
// npm install uuid

import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [showPass, setShowPass] = useState(false)

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    const getpasswords = async() => {
        let req = await fetch("/api/get-passwords")
        let passwords = await req.json()
        setpasswordArray(passwords)
    }
    useEffect(() => {
        getpasswords()
    }, [])

    const showPassword = () => {
        setShowPass(prev => !prev)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value }) // ""...form"  spreads the current state — meaning it copies all the existing fields in the form object so they aren't lost when updating just one field.
    }

    const savePassword = async() => {
        if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
            alert("All fields are required")
            return
        }

        // if any such id exists in db, then delete it. (for edit functionality)
        await fetch("/api/delete-password", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id:form.id})
        })

        await fetch("/api/save-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...form, id: uuidv4() })
        })
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        setform({ site: "", username: "", password: "" })
        toast.success('Password Saved!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const deletePassword = async(id) => {
        let c = confirm("Are you sure you want to delete this password?")
        if (c) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id)
            setpasswordArray(updatedPasswords)
            let res=await fetch("/api/delete-password", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            toast.success('Password Successfully Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        }
    }

    const editPassword = (id) => {
        setform({...passwordArray.find(item => item.id === id),id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        toast('Edit mode activated.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    return (
        <>
            {/* toast */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

            <div className="fixed inset-0 -z-10 w-full min-h-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#b7f5c3,transparent)]"></div>
            </div>
            {/* <div className="sm:container mx-auto bg-[rgba(195,212,197,0.5)] px-40 text-center mt-8 rounded-lg"> */}
            <div className="overflow-x-auto container mx-auto bg-[rgba(195,212,197,0.5)] text-center mt-8 rounded-lg px--5 sm:px-18 md:px-20 lg:px-30 xl:px-40">
                <h1 className='text-3xl font-bold pt-4 pb-2'> <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-xl text-green-900'>Your own Password Manager</p>
                <div className='text-white flex flex-col p-4 gap-5'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='truncate rounded-full bg-white border border-green-800 text-black p-5 py-1.5' type="text" name='site' id='' />
                    {/* truncate: This class ensures that the text will not overflow its container and will be cut off with an ellipsis if it exceeds the width of the input field. */}
                    <div className='flex w-full gap-1 sm:gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='truncate rounded-full bg-white border border-green-800 text-black p-5 py-1.5 w-full' type="text" name='username' />
                        <div className="relative flex items-center w-full">
                            <input value={form.password} onChange={handleChange} autoComplete="off" placeholder='Enter Password' className='pr-10 rounded-full bg-white border border-green-800 text-black p-5 py-1.5 w-full truncate' type={showPass ? "text" : "password"} name='password' />
                            <span className='absolute cursor-pointer right-3 text-black' onClick={showPassword}>
                                <img width={20} src={showPass ? "/eye.svg" : "/eye_cross.svg"} alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex gap-2 justify-center border-1 border-black items-center mx-auto transition-all duration-400 ease-in-out bg-green-500 rounded-full p-1.5 px-5 hover:bg-green-400 hover:text-black'><lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>Add Password</button>
                </div>
            </div>
            <div className="container relative mx-auto mt-5 mb-5">
                <div className="password_container bg-[rgba(195,212,197,0.5)] pt-16 pb-5 px-1 sm:px-18 md:px-20 lg:px-30 xl:px-40 text-center rounded-lg overflow-x-auto">
                    {/* <h2 className="text-black text-xl font-semibold absolute left-40 py-4 top-1">Your Passwords</h2> */}
                    {passwordArray.length === 0 && <div className='py-3 pb-19'>No Passwords To Show</div>}
                    {passwordArray.length != 0 &&
                        <>
                            <h2 className="text-black text-xl font-semibold absolute md-40 py-4 top-1">Your Passwords</h2>
                            <table className="table-auto w-full rounded-md overflow-hidden">
                                <thead className=' bg-green-800 text-white'>
                                    <tr>
                                        <th className="py-2 w-[50%]">Site</th>
                                        <th className="py-2 w-[20%]">Username</th>
                                        <th className="py-2 w-[20%]">Password</th>
                                        <th className="py-2 w-[10%]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => {  // key: When you render a list using .map(), React needs a way to track each element uniquely between renders (especially when items are added, removed, or reordered).key gives React a unique identity for each item, so it knows which <tr> corresponds to which item in your data.
                                        return <tr key={index}>
                                            <td className="w-85 p-2 border border-white text-blue-600">
                                                <div className="flex items-center justify-center gap-2 break-words flex-wrap text-center">
                                                    <a href={item.site} target="_blank" className="break-all">{item.site}</a>
                                                    <div className="w-5 h-5 cursor-pointer shrink-0" onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "100%", height: "100%" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="w-85 p-2 border border-white">
                                                <div className="flex items-center justify-center gap-2 break-words flex-wrap text-center">{item.username}
                                                    <div className="w-5 h-5 cursor-pointer shrink-0" onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "100%", height: "100%" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="w-85 p-2 border border-white">
                                                <div className="flex items-center justify-center gap-2 break-words flex-wrap text-center">{item.password}
                                                    <div className="w-5 h-5 cursor-pointer shrink-0" onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "100%", height: "100%" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="w-85 p-2 border border-white">
                                                <span className='cursor-pointer mx-1.5' onClick={() => editPassword(item.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>

                                                <span className='cursor-pointer mx-1.5' onClick={() => deletePassword(item.id)}><lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    colors="primary:#e83a30"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon></span>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table></>}
                </div>
            </div>
        </>
    )
}

export default manager
