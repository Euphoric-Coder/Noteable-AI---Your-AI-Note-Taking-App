import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfURL =
//   "https://enduring-hornet-413.convex.cloud/api/storage/e3b005b4-e685-4ee5-92e4-bc87a58b7fa6";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pdfURL = searchParams.get("pdfURL");

  const response = await fetch(pdfURL);
  const blob = await response.blob();

  // Load the PDF
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  let pdfText = "";
  docs.forEach((doc) => {
    pdfText += doc.pageContent;
  });

  // Split Text in Small Chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const texts = await textSplitter.createDocuments(pdfText);

  let docOutput = [];
  texts.forEach((text) => {
    docOutput.push(text.pageContent);
  });

  return NextResponse.json({ result: docOutput });
}
