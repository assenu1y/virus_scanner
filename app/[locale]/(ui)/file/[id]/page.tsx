import FileAnalysis from "@/app/[locale]/(ui)/file/[id]/FileAnalysis";
import {unstable_setRequestLocale} from "next-intl/server";

export default async function Page({params}: { params: { id: string | number , locale: string} }) {
    unstable_setRequestLocale(params.locale);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/virustotal/${params.id}`)
    const analyzeResult: AnalyzeResult = await response.json() as unknown as AnalyzeResult
    return (
        <FileAnalysis analysis={analyzeResult}/>
    );
}
