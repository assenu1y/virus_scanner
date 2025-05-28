"use client"
import {Card, Flex} from "antd";
import FileInfo from "@/app/[locale]/(ui)/file/[id]/FileInfo";
import {Stats} from "@/app/[locale]/(ui)/file/[id]/Stats";
import {Antiviruses} from "@/app/[locale]/(ui)/file/[id]/Antiviruses";
import {ReactNode, useState} from "react";
import {useTranslations} from "next-intl";


export default function FileAnalysis({analysis}: { analysis: AnalyzeResult }) {
    const t = useTranslations()
    const [activeTabKey, setActiveTabKey] = useState<string>('file_info');


    const tabList = [
        {
            key: 'file_info',
            tab: 'file_info',
            label: t('file_info.file_info'),
        },
        {
            key: 'stats',
            tab: 'Stats',
            label: t('stats.stats'),
        },
        {
            key: 'antiviruses',
            tab: 'Antiviruses',
            label: t('antiviruses.antiviruses')
        },
    ]


    const contentList: Record<string, ReactNode> = {
        file_info: <FileInfo file_info={analysis?.meta?.file_info as unknown as FileInfo}/>,
        stats: <Stats stats={analysis?.data?.attributes?.stats as unknown as Stats}/>,
        antiviruses: <Antiviruses vendors={analysis?.data?.attributes?.results as unknown as AntivirusVendors}/>,
    }
    // console.log({analysis})
    return (
        <Card
            style={{width: '100%'}}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => setActiveTabKey(key)}
            tabProps={{
                size: 'middle',
            }}
        >
            {contentList[activeTabKey]}
        </Card>


    )
}
