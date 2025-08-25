"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
    createUserSchema,
    updateUserSchema
} from "@/schema/user.schema";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return {
            success: true,
            message: "Successfully retrieved users",
            data: users
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message,
            data: []
        }
    }
}

export async function createUser(data: unknown) {
    try {

        const parsedData = createUserSchema.parse(data);

        await prisma.user.create({ data: parsedData });
        revalidatePath("/");

        return {
            success: true,
            message: "Successfully created user",
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message,
        }
    }
}

    export async function updateUser(id: number, data: unknown) {
        try {
            const parsedData = updateUserSchema.parse(data);
            await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    email: parsedData.email,
                    firstName: parsedData.firstName,
                    lastName: parsedData.lastName,
                    age: parsedData.age
                }
            });

        revalidatePath("/");

        return {
            success: true,
            message: "Successfully updated user",
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message,
        }
    }
}

export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({
            where: { id }
        });

        revalidatePath("/");

        return {
            success: true,
            message: "Successfully deleted user",
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message,
        }
    }
}