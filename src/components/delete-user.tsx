"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn-ui/alert-dialog"
import { Button } from '@/components/shadcn-ui/button'
import { deleteUser } from '@/server/user.action'
import { Loader, Trash } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteUserProps = {
    userId: number
}

export default function DeleteUser({ userId }: DeleteUserProps) {

    const [isPending, startTransition] = useTransition()

    async function handleDelete() {
        startTransition(async () => {
            const { success, message } = await deleteUser(userId)
            if (success) {
                console.log(message)
                toast.success(message)
            } else {
                console.error(message)
                toast.error(message)
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="icon"
                >
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Êtes-vous sûr de vouloir supprimer cet utilisateur&nbsp;?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="cursor-pointer"
                        >
                            {isPending ? <Loader /> : <Trash />}
                            <span>Supprimer l'utilisateur</span>
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
