"use client"

import {useTranslations} from 'next-intl';
import {Inter} from "next/font/google";
import React from "react";
import {Flex, Layout, Select, theme} from 'antd';
import Image from 'next/image'
import logo from "/assets/virus_scanner.webp"
import {usePathname, useRouter} from "@/navigation";


const {Header, Footer, Content} = Layout;
const inter = Inter({subsets: ["latin"]});


export default function UILayout({
    children,
    params: {locale}
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const {token} = theme.useToken();
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();


    return (
        <Layout style={{
            borderRadius: 8,
            overflow: 'hidden',
            width: '100vw',
            maxWidth: '100vw',
            height: '100vh',
            maxHeight: '100vh'
        }}
        >
            <Header style={{
                textAlign: 'center',
                color: token.colorText,
                height: 64,
                padding: 0,
                lineHeight: '64px',
                backgroundColor: token.colorBgBlur,
            }}>
                <Flex
                    justify="space-between"
                    style={{
                        height: 64,
                    }}
                >
                    <Flex
                        justify="center"
                        style={{
                            minWidth: 64,
                        }}
                    >
                        <Image
                            src={logo}
                            alt="Next.js"
                            height={64}
                            width={64}
                            priority
                        >

                        </Image>
                    </Flex>
                    <Flex
                        className="font-bold text-3xl"
                        justify="center"
                        align="center"
                    >
                        Virus Scanner
                    </Flex>
                    <Flex
                        justify="center"
                        align="center">
                        <Select
                            options={[
                                {title: "Қазақша", value: "kk", label: t("kk")},
                                {title: "Русский", value: "ru", label: t("ru")},
                                {title: "Русский", value: "en", label: t("en")},
                            ]}
                            defaultValue={[locale]}
                            onChange={(locales,option) => {
                                const selectedOption = option as { title: string; value: string; label: string }; // Type assertion here
                                router.replace(pathname, { locale: selectedOption.value });
                            }}
                        >
                        </Select>
                    </Flex>
                </Flex>
            </Header>
            <Content style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: token.colorText,
                backgroundColor: token.colorBgContainer,
                overflowY: "auto",
            }}>{children}</Content>
            <Footer style={{
                textAlign: 'center',
                color: token.colorText,
                backgroundColor: token.colorBgBlur,
            }}> {t("footer", {year: new Date().getFullYear()})}</Footer>
        </Layout>
    );
}
