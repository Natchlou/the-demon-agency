import { Input } from '@/components/ui/input'
import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    return (
        <div className='container m-auto mx-auto'>
            <form>
                <Label htmlFor="email">Your email address</Label>
                <Input id="email" name="email" type="email" required />
                <Label htmlFor="password">Your password</Label>
                <Input id="password" name="password" type="password" required />
                <Button formAction={login}>Log in</Button>
                <Button formAction={signup}>Sign up</Button>
            </form>
        </div>
    )
}