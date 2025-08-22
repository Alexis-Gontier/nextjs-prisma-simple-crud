import { Button } from '@/components/shadcn-ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { Plus } from 'lucide-react'
import UserTable from '@/components/user-table'
import { UserForm } from '@/components/user-form'

export default function HomePage() {
  return (
    <div className="pt-20 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Users</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer"
            >
              <Plus />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Add a new user to the database.
              </DialogDescription>

              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <UserTable />
    </div>
  )
}
