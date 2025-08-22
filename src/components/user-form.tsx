"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    createUserSchema,
    CreateUserInput,
    updateUserSchema,
    UpdateUserInput
} from "@/schema/user.schema"

import { Button } from "@/components/shadcn-ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { useTransition } from "react"
import {
    createUser,
    updateUser
} from "@/server/user.action"
import { User } from "@prisma/client"
import { toast } from "sonner"

type UserFormProps = {
    user?: User
}

export function UserForm({ user }: UserFormProps) {
    const [isPending, startTransition] = useTransition()

    const form = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            age: user?.age || 0
        }
    })

    async function onSubmit(values: CreateUserInput) {
        startTransition(async () => {
            if (!user) {
                const { success, message } = await createUser(values)
                if (success) {
                    console.log(message)
                    toast.success(message)
                    form.reset()
                } else {
                    console.log(message)
                    toast.error(message)
                }
            } else {
                const { success, message } = await updateUser({ id: user.id, ...values })
                if (success) {
                    console.log(message)
                    toast.success(message)
                    form.reset()
                } else {
                    console.log(message)
                    toast.error(message)
                }
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Age"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full cursor-pointer"
                >
                    {isPending ? "Creating..." : "Create User"}
                </Button>
            </form>
        </Form>
    )
}
