"use client"
import Image from "next/image";
import {Flex, theme, Typography, Upload} from "antd";
import {UploadRequestOption} from "rc-upload/lib/interface";
import {useLocale, useTranslations} from "next-intl";
import logo from "/assets/virus_scanner.webp"
import {useRouter} from "@/navigation";

const {Paragraph} = Typography

export default function Home({params}: { params: { locale: string } }) {
    const {token} = theme.useToken();
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations();
    const handleUpload = async (options: UploadRequestOption<any>) => {
        const {onSuccess, onError, file, onProgress} = options;
        let formData = new FormData()
        formData.append("file", file)
        onProgress && onProgress({percent: 0})
        try {
            const response = await fetch("/api/virustotal", {
                method: "POST",
                body: formData
            })
            onProgress && onProgress({percent: 70})
            const {data} = await response.json()
            onProgress && onProgress({percent: 100})
            onSuccess && onSuccess({data})
            console.log({data})
            router.push(`/file/${data?.id}`, {locale: locale})
        } catch (error) {
            onProgress && onProgress({percent: 100})
            if (error instanceof Error) { // Checking if error is an instance of Error
                onError && onError({
                    status: 200,
                    method: "POST",
                    type: "error",
                    name: error.name, // Now TypeScript knows `name` and `message` exist
                    message: error.message
                });
            } else {
                // Handle cases where the thrown error might not be an Error instance
                onError && onError({
                    status: 200,
                    method: "POST",
                    type: "error",
                    name: "UnknownError",
                    message: "An unknown error occurred"
                });
            }
        }
    }

    return (
        <Flex
            vertical
            justify="center"
            align="center"
            gap={16}
            style={{
                backgroundColor: token.colorBgContainer,
                width: "100%",
                margin: "auto",
                padding: token.padding
            }}
        >
            <Image
                src={logo}
                alt="Next.js Logo"
                height={180}
            />

            <Paragraph
                style={{
                    maxWidth: "80%",
                }}
            >
                {t("mainText")}
            </Paragraph>

            <Upload
                style={{
                    backgroundColor: token.colorBgContainer,
                    width: "100%"
                }}
                type="drag"
                accept=".apk,.aab,.exe,.ipa"
                maxCount={1}
                customRequest={handleUpload}
            >
                {t("upload")}
            </Upload>
        </Flex>
    );
}
