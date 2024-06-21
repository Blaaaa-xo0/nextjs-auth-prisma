"use client"
import { useForm } from "react-hook-form"

function RegisterPage() {

    const { register, handleSubmit, setError ,formState: { errors } } = useForm()

    const onSubmit = handleSubmit(async (data) => {

        //si las contraseñas NO coinciden
        if (data.password != data.confirmPassword) {

            setError("confirmPassword", {
                type: "manual",
                message: "Las contraseñas no coinciden"
            })

        } else { // si coinciden las contraseñas

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const resJSON = await res.json()
            console.log(resJSON)
        }
    })

    return (
        <div className="container mx-auto mt-12 max-w-xl rounded-md shadow-lg">
            <div className="p-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Create an account
                </h1>
            </div>

            <form onSubmit={onSubmit}>
                <div className="px-6">
                    <label htmlFor="username" className="block mb-2 text-gray-900 font-medium">Username</label>
                    <input
                        {...register("username", {
                            required: {
                                value: true,
                                message: 'El username es requerido'
                            }
                        })}
                        className="p-3 rounded block mb-2 bg-gray-50 border border-gray-300 text-gray-900 w-full"
                        type="text"
                        placeholder="JonhDoe" />
                    {
                        errors.username && (
                            <span className="mt-1 mb-2 text-sm text-red-600 dark:text-red-400">{errors.username.message}</span>
                        )
                    }
                </div>
                <div className="px-6">
                    <label htmlFor="email" className="block mb-2 text-gray-900 font-medium">Email</label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'El email es requerido'
                            }
                        })}
                        className="p-3 rounded block mb-2 bg-gray-50 border border-gray-300 text-gray-900 w-full"
                        type="email"
                        placeholder="john@gmail.com" />
                    {
                        errors.email && (
                            <span className="mt-1 mb-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</span>
                        )
                    }
                </div>
                <div className="px-6">
                    <label htmlFor="password" className="block mb-2 text-gray-900 font-medium">Password</label>
                    <input
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'La password es requerido'
                            }
                        })}
                        className="p-3 rounded block mb-2 bg-gray-50 border border-gray-300 text-gray-900 w-full"
                        type="password"
                        placeholder="******" />
                    {
                        errors.password && (
                            <span className="mt-1 mb-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</span>
                        )
                    }
                </div>
                <div className="px-6 mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-gray-900 font-medium">Confirm Password</label>
                    <input
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: 'El campo confirmar es requerido'
                            }
                        })}
                        className="p-3 rounded block mb-2 bg-gray-50 border border-gray-300 text-gray-900 w-full"
                        type="password"
                        placeholder="******" />
                    {
                        errors.confirmPassword && (
                            <span className="mt-1 mb-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</span>
                        )
                    }
                </div>

                <div className="flex justify-center items-center">
                    <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage