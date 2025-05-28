"use client"
import {useTranslations} from "next-intl";
import {Table, Tag} from "antd";

function convertDate(wrongDate: string): string {
    return `${wrongDate.slice(6, 8)}.${wrongDate.slice(4, 6)}.${wrongDate.slice(0, 4)}`
}

export function Antiviruses({vendors}: { vendors: AntivirusVendors }) {

    const t = useTranslations("antiviruses");
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: t("engine_name"),
            dataIndex: 'engine_name',
            key: 'engine_name',
        },
        {
            title: t("engine_version"),
            dataIndex: 'engine_version',
            key: 'engine_version',
        },
        {
            title: t("engine_update"),
            dataIndex: 'engine_update',
            key: 'engine_update',
            render: (date: string) => convertDate(date)
        },
        {
            title: t("category"),
            dataIndex: 'category',
            key: 'category',
            render: (category: string) => {
                switch (category) {
                    case "failure":
                        return <Tag color="red">{t(category)}</Tag>
                    case "timeout":
                        return <Tag color="orange">{t(category)}</Tag>
                    case "confirmed-timeout":
                        return <Tag color="orange">{t(category)}</Tag>
                    case "type-unsupported":
                        return <Tag color="orange">{t(category)}</Tag>
                    default:
                        return <Tag color="green">{t(category)}</Tag>
                }
            }
        },
        {
            title: t("method"),
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: t("result"),
            dataIndex: 'result',
            key: 'result',
        },
    ];
    const dataSource = (Object.keys(vendors) as (keyof AntivirusVendors)[]).map((key, index) => ({
        key: key,
        index: index + 1,
        method: vendors[key].method,
        engine_name: vendors[key].engine_name,
        engine_version: vendors[key].engine_version,
        engine_update: vendors[key].engine_update,
        category: vendors[key].category,
        result: vendors[key].result
    }))

    return (
        <Table
            title={() => <h3>{t("antiviruses")}</h3>}
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
            style={{
                overflowX: 'auto',
            }}
        />
    )
}
