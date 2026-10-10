"use client"
import { useLocale } from "next-intl";
import {  startTransition, useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageToggle(){
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const [isPending, setTransition] = useTransition()

    function changeLanguage(nextLocale: string){
        startTransition(()=>{
            router.replace(pathname, {locale: nextLocale})
        })
    }

    return (
        <select
            value={locale}
            onChange={(event)=>{changeLanguage(event.target.value)}}
            disabled={isPending}
            className="flex flex-col items-center justify-center text-md bg-secondary"
        >
            <option value="no">NO</option>
            <option value="en">EN</option>
        </select>
    )
}
