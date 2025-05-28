import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // Extract the analysis ID from the route parameters
    const { id } = params;

    try {
        // Send a GET request to the VirusTotal API to fetch the analysis result
        const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, {
            method: "GET",
            headers: {
                "x-apikey": process.env.VIRUSTOTAL_API_KEY || "",
            },
        });
        // Parse the response
        const result = await response.json();

        return NextResponse.json(result, { status: response.status });
    } catch (error) {
        console.error("Error fetching analysis result:", error);
        return NextResponse.json({ message: "Error fetching analysis result" }, { status: 500 });
    }
}
