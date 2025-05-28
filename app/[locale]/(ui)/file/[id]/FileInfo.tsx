"use client"
import {Card, Table} from "antd";
import {useTranslations} from "next-intl";

export default function FileInfo({file_info}: { file_info: FileInfo }) {
    const t = useTranslations("file_info");
    const columns = [
        {
            title: t("property"),
            dataIndex: 'property',
            key: 'property',
        },
        {
            title: t("value"),
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const dataSource = [
        {
            key: 'md5',
            property: 'MD5',
            value: file_info?.md5,
        },
        {
            key: 'sha1',
            property: 'SHA1',
            value: file_info?.sha1,
        },
        {
            key: 'sha256',
            property: 'SHA256',
            value: file_info?.sha256,
        },
        {
            key: 'size',
            property: t('size'),
            value: `${Math.round((file_info?.size || 0) / 1024 / 10.24) / 100} ${t("MB")} (${file_info?.size || 0} ${t("bytes")})`,
        },
    ]

    return (
        <

        >
            <Table
                title={() => <h3>{t("file_info")}</h3>}
                dataSource={dataSource}
                columns={columns}
                bordered
                pagination={false}
                style={{
                    overflowX: 'auto',
                }}
            />

        </>
    )
}
