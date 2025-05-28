"use client"
import {useTranslations} from "next-intl";
import {Table} from "antd";

export function Stats({stats}: { stats: Stats }) {

    const t = useTranslations("stats");
    const columns = [
        {
            title: t("category"),
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: t("value"),
            dataIndex: 'value',
            key: 'value',
        },
    ];
    const dataSource = (Object.keys(stats) as (keyof Stats)[]).map(key => ({
        key: key,
        category: t(key),
        value: stats[key]
    }))

    return (
        <Table
            title={() => <h3>{t("stats")}</h3>}
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
        />
    )
}
