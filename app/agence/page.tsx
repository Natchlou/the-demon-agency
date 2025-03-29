import { SiteHeader } from '@/components/site-header'
import React from 'react'

export default function AgencePage() {
    return (
        <>
            <SiteHeader title={'Horaire de l\'agence'} />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className='p-4 mx-auto'>
                        <h1 className='text-4xl'>Horaire de l&apos;agence</h1>
                        <ul className="w-full max-w-md divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white p-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 mt-4">
                            <li className="flex justify-between py-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Lundi</span>
                                <span className="text-gray-600 dark:text-gray-400">10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Mardi</span>
                                <span className="text-gray-600 dark:text-gray-400">10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Mercredi</span>
                                <span className="text-gray-600 dark:text-gray-400">10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Jeudi</span>
                                <span className="text-gray-600 dark:text-gray-400">10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Vendredi</span>
                                <span className="text-gray-600 dark:text-gray-400">10:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between py-2">
                                <span className="font-medium">Samedi</span>
                                <span className="text-gray-600 dark:text-gray-400">13:00 - 20:00</span>
                            </li>
                            <li className="flex justify-between py-2 text-red-500 dark:text-red-400">
                                <span className="font-medium">Dimanche</span>
                                <span>Fermé</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
