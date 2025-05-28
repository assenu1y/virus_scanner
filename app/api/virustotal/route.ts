import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const response = await fetch("https://www.virustotal.com/api/v3/files", {
            method: "POST",
            headers: {
                "x-apikey": process.env.VIRUSTOTAL_API_KEY || "",
            },
            body: formData,
        });

        const data = await response.json();
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
