import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog"
import { Button } from "./shadcn-ui/button"

import { Pencil } from "lucide-react"

import DeleteUser from "@/components/delete-user"
import { UserForm } from "@/components/user-form"

import { getUsers } from "@/server/user.action"

import { User } from "@prisma/client"

export default async function UserTable() {

    const { data: users } = await getUsers()

    return (
        <Table className="border">
            <TableHeader className="bg-muted">
                <TableRow>
                    <TableHead className="font-bold">ID</TableHead>
                    <TableHead className="font-bold">LastName</TableHead>
                    <TableHead className="font-bold">FirstName</TableHead>
                    <TableHead className="font-bold">Email</TableHead>
                    <TableHead className="font-bold">Age</TableHead>
                    <TableHead className="font-bold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            No users found.
                        </TableCell>
                    </TableRow>
                )}
                {users.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell className="space-x-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Pencil />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit User</DialogTitle>
                                        <UserForm user={user} />
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <DeleteUser userId={user.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
