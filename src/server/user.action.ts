"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function createUser({ email, firstName, lastName, age }: { email: string; firstName: string; lastName: string; age: number }) {
    try {
        await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                age
            }
        });
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

export async function updateUser({ id, email, firstName, lastName, age }: { id: number; email: string; firstName: string; lastName: string; age: number }) {
    try {
        await prisma.user.update({
            where: { id },
            data: {
                email,
                firstName,
                lastName,
                age
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