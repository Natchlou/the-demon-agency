import { Input } from '@/components/ui/input'
import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    return (
        <div className='container mx-auto px-4 py-8 light:bg-white'>
            <form className='max-w-sm mx-auto dark:text-gray-300 light:bg-white light:text-gray-900'>
                <div className='mb-4'>
                    <Label htmlFor="email" className='block text-sm font-medium dark:text-gray-400 light:text-gray-700'>Votre adresse mail</Label>
                    <Input id="email" name="email" type="email" required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-2 sm:text-sm dark:text-gray-300 light:bg-gray-100 light:text-gray-900' />
                </div>
                <div className='mb-4'>
                    <Label htmlFor="password" className='block text-sm font-medium dark:text-gray-400 light:text-gray-700'>Mot de passe</Label>
                    <Input id="password" name="password" type="password" required className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-2 sm:text-sm dark:text-gray-300 light:bg-gray-100 light:text-gray-900' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Button formAction={login} className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 light:bg-blue-500 light:hover:bg-blue-700'>Se connecter</Button>
                    <Button formAction={signup} className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700 light:bg-green-500 light:hover:bg-green-700'>S'inscrire</Button>
                </div>
            </form>
        </div>
    )
}